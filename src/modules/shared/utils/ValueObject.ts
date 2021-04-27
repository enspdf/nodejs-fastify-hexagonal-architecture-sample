import R from 'ramda'

export const valueObjectCatcher = <T>(_class: new (value: unknown) => T) => (
    key: string
): ((value: unknown) => T | { errors: Record<string, string> }) =>
    R.tryCatch(
        R.construct(_class),
        R.pipe(R.unary(R.prop)('message'), R.assocPath(['errors', key], R.__, { errors: {} }))
    )
