import R from 'ramda'
import { ValueObject } from '../../domain/ValueObject'
import { valueObjectCatcher } from '../../utils/ValueObject'

import { User, UserInputOptions, UserEntityOptions } from '../domain/User'
import { UserId } from '../domain/value-objects/UserId'

export type CreateUser = (userOptions: UserEntityOptions) => Promise<User | null>

const userIdCatcher = valueObjectCatcher(UserId)('id')

export async function createUserUseCase(
    createUser: CreateUser,
    userOptions: Partial<UserInputOptions>
): Promise<User | { errors: Record<string, string> }> {
    const id = userIdCatcher(userOptions.id)

    if (!(id instanceof ValueObject)) {
        return id
    }

    const user = await createUser({ id })

    return user ?? { errors: {} }
}

export function createUserUseCaseFactory(
    createUser: CreateUser
): (userOptions: Partial<UserInputOptions>) => ReturnType<typeof createUserUseCase> {
    return async (userOptions: Partial<UserInputOptions>): ReturnType<typeof createUserUseCase> => {
        return createUserUseCase(createUser, userOptions)
    }
}
