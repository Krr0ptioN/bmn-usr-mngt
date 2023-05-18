import { ApiProperty } from '@nestjs/swagger'

// Other dependencies
import { IsEmail, IsNotEmpty, IsOptional, IsBoolean, NotContains, Length } from 'class-validator'

export class LoginDto {
    @ApiProperty({
        required: false,
        example: 'demo@host.com',
    })
    @IsEmail()
    email: string

    @ApiProperty({
        required: false,
        example: 'user123',
    })
    username: string

    @ApiProperty({
        required: true,
        example: true
    })
    @IsBoolean()
    rememberMe: boolean

    @ApiProperty({
        required: true,
        example: 'User@123',
    })
    @IsNotEmpty()
    @NotContains(' ')
    @Length(8, 100)
    password: string
}
