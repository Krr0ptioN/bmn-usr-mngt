import {
  Controller,
  Session,
  Get,
  Put,
  Delete,
  UseGuards
} from '@nestjs/common';
import { UserService } from "./../user/user.service"
import { AuthGuard } from './../guards/auth.guard';

@Controller('/api/user')
export class UserController {
  constructor(private userService: UserService) { }

  @Get("/amilogged")
  @UseGuards(AuthGuard)
  amILogged(@Session() session: any) {
    return session.userId;
  }

  // TODO   Modify user route
  // - Throw exception if the user didn't existed
  @Put("/edit")
  editUser() { }

  // TODO   Delete user account
  // - Throw exception if the user didn't existed
  @Delete("/delete")
  deleteUser() { }
}
