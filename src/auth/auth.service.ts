import { Injectable } from '@nestjs/common';
import { PrismaService } from "prisma/prisma.service"

@Injectable()
export class AuthService {

  constructor(private prisma: PrismaService) { }

  // DOING  SignIn
  // - 1. Does a user with this email exist?
  //    - If not, respond with an error
  // - 2. Compare the password of the stored user and the supplied password
  //    - If passwords aren't the same, respond error.
  // - 3. User is now considered to be logged in so send them a JWT in a cookie. 
  // @RateLimit({
  //     points: 5,
  //     duration: 300,
  //     errorMessage: 'You have reached the limit of login requests. You have to wait 5 minutes before trying again.'
  // })
  async signIn() { }


  // DOING  SignUp
  // - 1. Does a user with this email exist?
  //    - If there is, respond with an error and suggest them to sign-in.
  // - 2. Is the given passwords match with our security policies?
  //    - If passwords aren't the same, respond error.
  // - 3. User is now considered to be logged in so send them a JWT in a cookie. 
  async signUp() { }

  // TODO  SignOut
  // - 1. Take the user authentication token from its request.
  // - 2. Cancel his permission and session.
  async signOut() { }
  async resetPass() { }
}
