import { IsString } from "class-validator";
import { JsonController, Post, Body, BadRequestError } from "routing-controllers";
import User from "../entities/users";


class AuthLogin {

    @IsString()
    email: string

    @IsString()
    password: string

}

@JsonController()
export default class LoginController {

    @Post('/logins')
    async authenticate(
        @Body() { email, password }: AuthLogin
    ) {
        const loginUser = await User.findOne({ where: { email } })
        if (!loginUser) throw new BadRequestError('Cannot find a user with this email address')
        if (!await loginUser.validatePassword(password)) throw new BadRequestError('Incorrect password')
        return {loginUser}
    }
}