import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { EditUserSchema, StoreUserSchema } from '../../Validator/User/index'

export default class UsersController {
  public async index({}: HttpContextContract) {
    const users = await User.all()

    return users
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const userValid = await request.validate({ schema: StoreUserSchema })

      if (userValid) {
        const user = await User.create(userValid)

        return { message: 'User Created ✅', data: user }
      }
    } catch (error) {
      return response.badRequest(error.messages)
    }
  }

  public async show({ params }: HttpContextContract) {
    const user = await User.findBy('id', params.id)
    if (!user) throw new Error('User not found or not available.')
    return { message: 'User founded 🔘 ', data: user }
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      const userValid = await request.validate({ schema: EditUserSchema })

      if (userValid) {
        const user = await User.findOrFail(params.id)

        user.merge(userValid)
        await user.save()

        return { message: 'User updated ✅', data: user }
      }
    } catch (error) {
      return response.badRequest(error.messages)
    }
  }

  public async destroy({ params }: HttpContextContract) {
    const user = await User.findBy('id', params.id)
    if (!user) throw new Error('User not found or not available.')

    await user.delete()

    return { message: 'User deleted ❌', id: params.id }
  }
}
