import { Entity } from '../../domain/Entity'
import { UserId } from './value-objects/UserId'

export interface UserEntityOptions {
    id: UserId
}

export interface UserOptions {
    id: string
}

export interface UserInputOptions extends Record<string, unknown> {
    id: unknown
}

export class User extends Entity implements UserOptions {
    private readonly _id: UserId

    constructor(userOptions: UserEntityOptions) {
        super()

        this._id = userOptions.id
    }

    public get id(): string {
        return this._id.value
    }
}
