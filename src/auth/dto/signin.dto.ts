import { ApiProperty } from '@nestjs/swagger'

// Other dependencies
import { IsEmail, IsNotEmpty, NotContains, Length } from 'class-validator'

export class SignInDto {
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
    userName: string

    @ApiProperty({
        required: true,
        example: true
    })

    @ApiProperty({
        required: true,
        example: 'User@123',
    })
    @IsNotEmpty()
    @NotContains(' ')
    @Length(8, 100)
    password: string
}
