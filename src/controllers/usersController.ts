import { JsonController, Get, Post, Param, Body, HttpCode, NotFoundError } from 'routing-controllers'
import User from '../entities/users'

@JsonController()
export default class UsersController {
    
    @Get('/users')
    async getAllUsers()
    {
        const oneUser = await User.find()
        if (!oneUser) throw new NotFoundError('Cannot find users table')
        return { oneUser }
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
        const {password, ...x} = newUser
        const userEntity = User.create(x)
        await userEntity.hashPassword(password)
        return userEntity.save()
    }

}