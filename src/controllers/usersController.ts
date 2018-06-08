import { JsonController, Get, Post, Param, Body, HttpCode, NotFoundError, BadRequestError } from 'routing-controllers'
import User from '../entities/users'

@JsonController()
export default class UsersController {
    
    @Get('/users')
    async getAllUsers()
    {
        const allUsers = await User.find()
        if (!allUsers) throw new NotFoundError('Cannot find users table')
        return { allUsers }
    }

    @Get('/users/:id')
    async getUser(
        @Param('id') id: number
    ) {
        const user = await User.findOne(id)
        return {user}
    }

    @Post('/users')
    @HttpCode(201)
    async addUser(
        @Body() newUser: User
    ) {
        const allUsers = await User.find()
        const {password, ...x} = newUser
        const userEntity = User.create(x)
        await userEntity.hashPassword(password)
        allUsers.map((user) => {
            if (user.email === userEntity.email) throw new BadRequestError('There is already a user account with this email! Please head to the login page.')
        })
        return userEntity.save()
    }

}