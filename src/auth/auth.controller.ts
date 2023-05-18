import { Controller, Post, Get } from '@nestjs/common';

@Controller('/api/auth')
export class AuthController {
  // TODO  Sign up account
  @Post("signup")
  signUpAuth(){}
  // TODO  Sign up account
  @Post("signin")
  signInAuth(){}
  // TODO  Sign up account
  @Post("resetpass")
  resetPassAuth(){}
  // TODO  Sign up account
  @Get("signout")
  signOutAuth(){}
}
