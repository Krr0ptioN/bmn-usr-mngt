import {
  Controller,
  NotFoundException,
  Session,
  Get,
  Put,
  Delete,
  Param,
  UseGuards
} from '@nestjs/common';
import { UserService } from "./user.service"
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('/api/user')
export class UserController {
  constructor(private userService: UserService) { }

  @Get("/amilogged")
  @UseGuards(AuthGuard)
  amILogged(@Session() session: any) {
    return session.userId;
  }

  @Get("/info/:id")
  infoUser(@Param("id") id: number): string {
    return this.userService.info(id);
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
