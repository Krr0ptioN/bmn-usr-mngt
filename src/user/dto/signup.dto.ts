import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, NotContains, Length, Matches } from 'class-validator'

export class CreateAccountDto {
    @ApiProperty({
        required: true,
        example: 'User',
    })
    @Matches(/^(?!\s*$).+/, {
        message: 'Name can not be empty or whitespace'
    })
    @Length(3, 50)
    fullName: string

    @ApiProperty({
        required: true,
        example: 'demo@host.com',
    })
    @Matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, {
        message: 'Email must be a type of email'
    })
    email: string

    @ApiProperty({
        required: true,
        example: 'user123',
    })
    @IsNotEmpty()
    @Matches(/^[a-z0-9_.-]{3,17}$/, {
        message: "Only username that contain lowercase letters, numbers, '_', '-' and '.' with min 3 max 17 length"
    })
    username: string

    @ApiProperty({
        required: true,
        example: 'User@123',
    })
    @IsNotEmpty()
    @NotContains(' ')
    @Length(8, 100)
    password: string
}
