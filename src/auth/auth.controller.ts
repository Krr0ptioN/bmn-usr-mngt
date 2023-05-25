import { Body, Response, Controller, Post, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  signUp(@Body() dto: SignUpDto, @Response() res: any) {
    return this.authService.signUp(dto, res);
  }

  @Post('signin')
  signIn(@Body() dto: SignInDto, @Response() res: any) {
    return this.authService.signIn(dto, res);
  }

  @Post('resetpass')
  resetPass() {
    return this.authService.resetPass();
  }

  @Get('signout')
  signOut(@Response() res: any) {
    return this.authService.signOut(res);
  }
}
