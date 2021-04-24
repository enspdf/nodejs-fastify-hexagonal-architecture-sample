import { User, UserInputOptions, UserEntityOptions } from '../domain/User'
import { UserId } from '../domain/value-objects/UserId'

export type CreateUser = (userOptions: UserEntityOptions) => Promise<User | null>

export async function createUserUseCase(
    createUser: CreateUser,
    userOptions: Partial<UserInputOptions>
): Promise<User | { errors: Record<string, string> }> {
    const id = new UserId(userOptions.id)

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
