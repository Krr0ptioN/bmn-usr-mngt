import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  // TODO  Return info
  info(id: number): string{
    return "working"
  }
  edit(){}
  delete(){}
}
