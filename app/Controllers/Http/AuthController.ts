import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async login({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    try {
      const token = await auth.use('api').attempt(email, password, { expiresIn: '30 mins' })

      return token
    } catch {
      return response.unauthorized('Invalid credentials')
    }
  }
  public async validate({ auth, response }: HttpContextContract) {
    try {
      await auth.use('api').authenticate()

      return `You are logged in as ${auth.user!.email}`
    } catch (error) {
      return response.unauthorized('Invalid credentials')
    }
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.use('api').revoke()

    return { message: 'Logout successfully ✅' }
  }
}
