import { ApiProperty } from '@nestjs/swagger';

import { CreateUserDto } from 'src/user/user.dto';

export class SignupDto {
  @ApiProperty({ type: CreateUserDto })
  userDetails: CreateUserDto;

  @ApiProperty({ type: String })
  username: string;

  @ApiProperty({ type: String })
  password: string;
}

export class SigninDto {
  @ApiProperty({ type: String })
  username: string;

  @ApiProperty({ type: String })
  password: string;
}
