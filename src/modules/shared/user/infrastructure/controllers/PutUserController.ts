import { FastifyReply, FastifyRequest } from 'fastify'

import { CreateUser, createUserUseCaseFactory } from '../../application/CreateUserUseCase'
import { requestBodyParser } from '../fastify/RequestBodyParser'

export async function putUserController(
    createUser: CreateUser,
    {
        request,
        reply
    }: {
        request: FastifyRequest
        reply: FastifyReply
    }
): Promise<void> {
    const createUserUseCase = createUserUseCaseFactory(createUser)
    await createUserUseCase(request.json ?? {})

    reply.status(204)
}

export function putUserControllerFactory(
    createUser: CreateUser
): (request: FastifyRequest, reply: FastifyReply) => ReturnType<typeof putUserController> {
    return async (
        request: FastifyRequest,
        reply: FastifyReply
    ): ReturnType<typeof putUserController> => {
        request.json = requestBodyParser(request.body)

        return putUserController(createUser, {
            request,
            reply
        })
    }
}
