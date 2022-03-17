import { IsEmail, IsNotEmpty, IsString } from "class-validator";
//to validate in main.ts use validatorpipe as well with whitelist true

export class AuthDto{
    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsString()
    @IsNotEmpty()
    password:string;
}