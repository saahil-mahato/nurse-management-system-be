import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

import { CreateUserDto } from 'src/user/user.dto';

export class SignupDto {
  @IsNotEmpty()
  @ApiProperty({ type: CreateUserDto })
  userDetails: CreateUserDto;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  username: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  password: string;
}

export class SigninDto {
  @IsNotEmpty()
  @ApiProperty({ type: String })
  username: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  password: string;
}
