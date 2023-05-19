import { 
  Controller, 
  NotFoundException, 
  Get,
  Put,
  Delete, 
  Param
} from '@nestjs/common';
import { UserService } from "./user.service"

@Controller('/api/user')
export class UserController {
  userService: UserService;

  constructor(){
    this.userService = new UserService();
  }

  // DOING  Get into route
  @Get("/info/:id")
  infoUser(@Param("id") id: number): string{
    return this.userService.info(id);
  }

  // TODO   Modify user route
  // - Throw exception if the user didn't existed
  @Put("/edit")
  editUser(){}

  // TODO   Delete user account
  // - Throw exception if the user didn't existed
  @Delete("/delete")
  deleteUser(){}
}
