import { ApiProperty } from '@nestjs/swagger'
import {
    IsNotEmpty,
    NotContains,
    IsEmail,
    Length,
    Matches
} from 'class-validator'

export class SignUpDto {
    @ApiProperty({
        required: true,
        example: 'User',
    })
    @Matches(/^(?!\s*$).+/, {
        message: 'Name can not be empty or whitespace'
    })
    @Length(3, 50)
    firstName: string

    @Matches(/^(?!\s*$).+/, {
        message: 'Name can not be empty or whitespace'
    })
    @Length(3, 50)
    lastName: string

    @ApiProperty({
        required: true,
        example: 'demo@host.com',
    })
    @IsEmail()
    email: string

    @ApiProperty({
        required: true,
        example: 'user123',
    })
    @IsNotEmpty()
    @Matches(/^[a-z0-9_.-]{3,17}$/, {
        message: "Only username that contain lowercase letters, numbers, '_', '-' and '.' with min 3 max 17 length"
    })
    userName: string

    @ApiProperty({
        required: true,
        example: 'User@123',
    })
    @IsNotEmpty()
    @NotContains(' ')
    @Length(8, 100)
    password: string
}
