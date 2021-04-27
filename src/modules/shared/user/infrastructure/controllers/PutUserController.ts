import { FastifyReply, FastifyRequest } from 'fastify'

import { CreateUser, createUserUseCaseFactory } from '../../application/CreateUserUseCase'
import { User } from '../../domain/User'
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
): Promise<void | { errors: Record<string, string> }> {
    const createUserUseCase = createUserUseCaseFactory(createUser)
    const result = await createUserUseCase(request.json ?? {})

    if (!(result instanceof User)) {
        reply.status(400)
        return reply
    }

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
