import { FastifyReply, FastifyRequest } from 'fastify'
import { v4 } from 'uuid'

import { putUserControllerFactory } from '@/modules/shared/user/infrastructure/controllers/PutUserController'
import { UserId } from '@/modules/shared/user/domain/value-objects/UserId'

let putUserController: ReturnType<typeof putUserControllerFactory>
const replyStatusSpy = jest.fn()
const createUserSpy = jest.fn()

beforeEach(() => {
    putUserController = putUserControllerFactory(createUserSpy)
})

async function callPutUserController(body: unknown): ReturnType<typeof putUserController> {
    return putUserController(
        {
            body: JSON.stringify(body)
        } as FastifyRequest,
        ({
            status: replyStatusSpy
        } as unknown) as FastifyReply
    )
}

it('"replyStatusSpy" should be called', async () => {
    await callPutUserController({ id: v4() })
    expect(replyStatusSpy).toBeCalledTimes(1)
})

it('"replyStatusSpy" should be called with status code "204"', async () => {
    await callPutUserController({ id: v4() })
    expect(replyStatusSpy).toBeCalledWith(204)
})

it('"createUserSpy" should be called', async () => {
    await callPutUserController({ id: v4() })
    expect(createUserSpy).toBeCalledTimes(1)
})

it('"createUserSpy" should be called with passed body', async () => {
    const body = { id: v4() }
    await callPutUserController(body)
    expect(createUserSpy).toBeCalledWith({
        id: new UserId(body.id)
    })
})
