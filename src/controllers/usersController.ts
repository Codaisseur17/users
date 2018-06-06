import { JsonController, Get, Post, Param, Body, HttpCode } from 'routing-controllers'
import User from '../entities/users'

@JsonController()
export default class UsersController {
    
    @Get('/users/:id')
    async user(
        @Param('id') id: number
    ) {
        return User.findOne(id)
    }

    @Post('/users')
    @HttpCode(201)
    addUser(
        @Body() newUser: User
    ) {
        return newUser.save()
    }

}