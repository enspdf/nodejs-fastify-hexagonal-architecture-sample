import { FastifyReply, FastifyRequest } from 'fastify'
import { v4 } from 'uuid'

import { putUserControllerFactory } from '@/modules/shared/user/infrastructure/controllers/PutUserController'
import { InvalidUserId, UserId } from '@/modules/shared/user/domain/value-objects/UserId'
import { resolveBody } from '@/tests/shared/utils/Controller'

let putUserController: ReturnType<typeof putUserControllerFactory>
const replyStatusSpy = jest.fn()
const createUserSpy = jest.fn()

beforeEach(() => {
    putUserController = putUserControllerFactory(createUserSpy)
})

export async function callPutUserController(body: unknown): ReturnType<typeof putUserController> {
    return putUserController(
        {
            body: resolveBody(body)
        } as FastifyRequest,
        ({
            status: replyStatusSpy
        } as unknown) as FastifyReply
    )
}

it('"replyStatusSpy" should be called, "null" body', async () => {
    await callPutUserController(null)
    expect(replyStatusSpy).toBeCalledTimes(1)
})

it('"replyStatusSpy" should be called, "null" id', async () => {
    await callPutUserController({ id: null })
    expect(replyStatusSpy).toBeCalledTimes(1)
})

it('"replyStatusSpy" should be called with status code "400"', async () => {
    await callPutUserController({ id: 'asdasjkhjkafas' })
    expect(replyStatusSpy).toBeCalledWith(400)
})

it('"createUserSpy" should not be called', async () => {
    await callPutUserController({ id: {} })
    expect(createUserSpy).not.toBeCalled()
})

it('"createUserSpy" should contain errors', async () => {
    const result = await callPutUserController({ id: [] })
    expect(result).toHaveProperty(['errors'])
})

it('"createUserSpy" should contain id errors', async () => {
    const result = await callPutUserController({ id: [] })
    expect(result).toHaveProperty(['errors', 'id'])
})

it('"createUserSpy" should contain InvalidUserId', async () => {
    const result = await callPutUserController({ id: [] })
    expect(result).toStrictEqual({
        errors: {
            id: new InvalidUserId().message
        }
    })
})
