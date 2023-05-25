import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { Response } from 'express';
import { PrismaService } from './../prisma/prisma.service';
import { UserService } from './../user/user.service';
import { UserDto } from './../user/dto/user.dto';
import { JwtService } from '@nestjs/jwt';

const FAKE_EMAIL = 'fake.user@host.fk';
const FAKE_USERNAME = 'fkuserNM';
const FAKE_PASSWORD = 'Str0ngP4SSw0rD';
const FAKE_FIRSTNAME = 'user';
const FAKE_LASTNAME = 'fake';

describe('AuthService', () => {
  let service: AuthService;

  const userSignUpReq: SignUpDto = {
    email: FAKE_EMAIL,
    userName: FAKE_USERNAME,
    password: FAKE_PASSWORD,
    firstName: FAKE_FIRSTNAME,
    lastName: FAKE_LASTNAME,
  };
  const userSignInReq: SignInDto = {
    email: FAKE_EMAIL,
    userName: FAKE_USERNAME,
    password: FAKE_PASSWORD,
  };

  const mockResponse: Partial<Response> = {
    send: jest.fn().mockImplementation(),
    status: jest.fn().mockImplementation(),
    json: jest.fn().mockImplementation(),
    cookie: jest.fn().mockImplementation(),
    clearCookie: jest.fn().mockImplementation(),
  };

  beforeEach(async () => {
    const usersDB: UserDto[] = [];
    const mockUserService = {
      find: (args: { email: string; userName: string }) => {
        const filteredUsers = usersDB.filter(
          (user) =>
            user.email === args.email || user.userName === args.userName,
        );
        return Promise.resolve(filteredUsers);
      },
      create: (args: UserDto) => {
        const user = {
          id: Math.floor(Math.random() * 999999),
          email: args.email,
          firstName: args.firstName,
          lastName: args.lastName,
          userName: args.userName,
          hashedPassword: args.hashedPassword,
        } as UserDto;
        usersDB.push(user);
        return Promise.resolve(user);
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, JwtService, UserService, PrismaService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('sign-in(username,email): client should be able to login when correct information is given', async () => {
    await service.signUp(userSignUpReq, mockResponse as Response);
    const res = await service.signIn(userSignInReq, mockResponse as Response);
    expect(res).toEqual(mockResponse.json());
  });

  it('sign-in(username): client should be able to login when only username is given and the password is correct', async () => {
    userSignInReq.email = null;
    userSignInReq.userName = FAKE_USERNAME;
    await service.signUp(userSignUpReq, mockResponse as Response);
    const res = await service.signIn(userSignInReq, mockResponse as Response);
    expect(res).toEqual(mockResponse.json());
  });

  it('sign-in(email): client should be able to login when only email is given and the password is correct', async () => {
    userSignInReq.email = FAKE_EMAIL;
    userSignInReq.userName = null;
    await service.signUp(userSignUpReq, mockResponse as Response);
    const res = await service.signIn(userSignInReq, mockResponse as Response);
    expect(res).toEqual(mockResponse.json());
  });

  it("client shouldn't be able to sign-in when neither email or username is given", async () => {
    await service.signUp(userSignUpReq, mockResponse as Response);
    userSignInReq.userName = null;
    userSignInReq.email = null;
    expect(
      service.signIn(userSignInReq, mockResponse as Response),
    ).rejects.toThrowError();
  });

  it("client should be able to sign-out and cancel it's session", async () => {
    userSignInReq.email = FAKE_EMAIL;
    userSignInReq.userName = FAKE_USERNAME;
    const signUpRes = await service.signUp(
      userSignUpReq,
      mockResponse as Response,
    );
    expect(signUpRes).toEqual(mockResponse.json());
    const signInRes = await service.signIn(
      userSignInReq,
      mockResponse as Response,
    );
    expect(signInRes).toEqual(mockResponse.json());
    const signOutRes = await service.signOut(mockResponse as Response);
    expect(signOutRes).toEqual(mockResponse.json());
  });
});
