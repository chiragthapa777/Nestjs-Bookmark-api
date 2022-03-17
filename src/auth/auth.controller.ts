import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';//for validating client side data

//auth is the prefix route(optaional but handly)
@Controller('auth')
export class AuthController {
    //instantizinfg the auth service
    constructor(private authService:AuthService){}

    //making the end points
    //auth/signup
    @Post('signup')
    signup(@Body() dto:AuthDto){
        //validating the client data
        console.log(dto)
        return this.authService.signup(dto)
    }
    //auth/signin
    @Post('signin')
    signin(@Body() dto:AuthDto){
        return this.authService.login(dto)
    }

}
