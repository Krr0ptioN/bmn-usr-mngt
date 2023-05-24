import {
  Injectable,
  Inject,
  forwardRef,
  BadRequestException,
  ForbiddenException,
  UnauthorizedException,
  BadGatewayException,
} from '@nestjs/common';
import { UserService } from './../user/user.service';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';

const JWT_SECRET = process.env.JWT_SECRET;

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => JwtService)) private jwt: JwtService,
    @Inject(forwardRef(() => UserService)) private userService: UserService,
  ) { }

  private async hashPassword(password: string) {
    const salt = 10;
    return await bcrypt.hash(password, salt);
  }

  async signToken(args: { userId: number; email: string }) {
    const payload = {
      id: args.userId,
      email: args.email,
    };

    const token = await this.jwt.signAsync(payload, {
      secret: JWT_SECRET,
    });

    return token;
  }

  async signIn(dto: SignInDto, res: Response) {
    const { email, password, userName } = dto;
    if (!userName && !email) {
      throw new Error('Either username or email must be provided.');
    }

    let foundUser = await this.userService.find({ email, userName });
    foundUser = foundUser[0];

    // TODO Test for wrong credentials
    if (!foundUser) {
      throw new BadRequestException('Wrong credentials');
    }

    const passwordMatch = await bcrypt.compare(
      password,
      foundUser.hashedPassword,
    );
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid password.');
    }

    const token = await this.signToken({
      userId: foundUser.id,
      email: foundUser.email,
    });

    if (!token) {
      throw new ForbiddenException('Could not signin');
    }
    res.cookie('token', token, {});

    return res.send({ message: 'Logged in succefully' });
  }

  async signUp(dto: SignUpDto, res: Response) {
    const { email, password, userName, firstName, lastName } = dto;

    const hashedPassword = await this.hashPassword(password);
    const createdUser = await this.userService.create({
      userName: userName,
      firstName: firstName,
      lastName: lastName,
      hashedPassword: hashedPassword,
      email: email,
    });

    if (!createdUser) {
      throw new BadGatewayException('Could not create account');
    }
    return res.send({ message: 'User created succefully' });
  }

  async signOut(res: Response) {
    res.clearCookie('token');
    return res.json({ message: 'Logged out succefully' });
  }

  // TODO Implement validation and email verification process
  // TODO Test the feature
  async resetPass() { }
}
