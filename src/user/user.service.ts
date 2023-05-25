import {
  Injectable,
  forwardRef,
  Inject,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => PrismaService)) private prisma: PrismaService,
  ) { }

  async create(args: UserDto) {
    // If user already exist then throw error
    if (!this.find(args)) {
      return await this.prisma.user.create({
        data: {
          email: args.email,
          hashedPassword: args.hashedPassword,
          firstName: args.firstName,
          lastName: args.lastName,
          userName: args.userName,
        },
      });
    } else {
      throw new BadRequestException('User already exist');
    }
  }

  // TODO Test getUser
  async find(args: { email: string; userName: string }) {
    const valueForCheck = args.email ? args.email : args.userName;
    return await this.prisma.user.findUnique({
      where: { [args.email ? 'email' : 'userName']: valueForCheck },
    });
  }

  // edit() { }
  // delete() { }
}
