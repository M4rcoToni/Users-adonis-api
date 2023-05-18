import { rules, schema } from '@ioc:Adonis/Core/Validator'

export const StoreUserSchema = schema.create({
  name: schema.string({ escape: true, trim: true }, [
    rules.unique({ table: 'users', column: 'name' }),
  ]),
  email: schema.string({ escape: true, trim: true }, [
    rules.email(),
    rules.unique({ table: 'users', column: 'email' }),
  ]),
  password: schema.string({ escape: true, trim: true }, []),
})

export const EditUserSchema = schema.create({
  name: schema.string.optional({ escape: true, trim: true }, [
    rules.unique({ table: 'users', column: 'name' }),
  ]),
  email: schema.string.optional({ escape: true, trim: true }, [
    rules.email(),
    rules.unique({ table: 'users', column: 'email' }),
  ]),
  password: schema.string.optional({ escape: true, trim: true }, []),
})
