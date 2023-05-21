import {
  Injectable,
  Inject, forwardRef,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from "prisma/prisma.service"
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';

const jwtSecret = process.env.JWT_SECRET;

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => JwtService)) private jwt: JwtService,
    @Inject(forwardRef(() => PrismaService)) private prisma: PrismaService) { }

  private async hashPassword(password: string) {
    const salt = 10;
    return await bcrypt.hash(password, salt);
  }

  async comparePasswords(password: string, suppliedPassword: string) {
    return await bcrypt.compare(password, suppliedPassword)
  }

  async signToken(args: { userId: number; email: string }) {
    const payload = {
      id: args.userId,
      email: args.email,
    };

    const token = await this.jwt.signAsync(payload, {
      secret: jwtSecret,
    });

    return token;
  }

  private async userExist(args: { email: string, userName: string }) {
    const valueForCheck = args.email ? args.email : args.userName;
    return await this.prisma.user.findUnique({ where: { [args.email ? 'email' : 'userName']: valueForCheck } });
  }

  async signIn(dto: SignInDto, res: Response) {
    const { email, password, userName, } = dto;
    if (!userName && !email) {
      throw new Error('Either username or email must be provided.');
    }

    const user = await this.userExist({ email, userName });

    if (!user) {
      throw new BadRequestException('Wrong credentials');
    }
    const hashedSupplyPassword = await this.hashPassword(password)
    const passwordMatch = this.comparePasswords(hashedSupplyPassword, user.hashedPassword);

    if (!passwordMatch) {
      throw new Error('Invalid password.');
    }

    const token = await this.signToken({
      userId: user.id,
      email: user.email,
    });

    if (!token) {
      throw new ForbiddenException('Could not signin');
    }
    res.cookie('token', token, {});

    return res.send({ message: 'Logged in succefully' })
  }

  async signUp(dto: SignUpDto, res: Response) {
    const { email, password, userName, firstName, lastName } = dto;
    const user = await this.userExist({ email, userName });
    if (user) {
      throw new BadRequestException('Account already exists');
    }

    const hashedPassword = await this.hashPassword(password);
    const createdUser = await this.prisma.user.create({
      data: {
        email,
        hashedPassword,
        firstName,
        lastName,
        userName,
      },
    });

    if (createdUser) {

    }
    return { message: 'User created succefully' };
  }

  async signOut(res: Response) {
    res.clearCookie('token');
    return res.send({ message: 'Logged out succefully' });
  }
  async resetPass() { }
}
