import {
  Body, Param
  Controller,
  Post, Get
} from '@nestjs/common';
import { AuthService } from "./auth.service"

@Controller('/api/auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  // DOING  Sign up account
  @Post("signup")
  signUp() {
    return this.authService.signUp()
  }
  // TODO  Sign up account
  @Post("signin")
  signIn(@Body) {
    return this.authService.signIn()
  }
  // TODO  Sign up account
  @Post("resetpass")
  resetPass() {
    return this.authService.resetPass()
  }
  // TODO  Sign up account
  @Get("signout")
  signOut() {
    return this.authService.signOut()
  }
}
