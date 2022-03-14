import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

//auth is the prefix route(optaional but handly)
@Controller('auth')
export class AuthController {
    //instantizinfg the auth service
    constructor(private authService:AuthService){}

    //making the end points
    //auth/signup
    @Post('signup')
    signup(){
        //return your response and nest will automatically include the datatype 
        return [{message:"hello world"}]
    }
    //auth/signin
    @Post('signin')
    signin(){
        return "i am signup"
    }

}
