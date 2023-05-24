import { ApiProperty } from '@nestjs/swagger'
import {
  IsNotEmpty,
  NotContains,
  IsEmail,
  Length,
  Matches
} from 'class-validator'

export class UserDto {
  firstName: string
  lastName: string
  email: string
  userName: string
  hashedPassword: string
}
