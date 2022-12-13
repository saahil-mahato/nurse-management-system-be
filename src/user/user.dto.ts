import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true })
  firstName: string;

  @ApiProperty({ type: String, required: true })
  middleName: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, required: true })
  lastName: string;

  @IsNotEmpty()
  @ApiProperty({ type: Number, required: true })
  age: number;

  @IsNotEmpty()
  @ApiProperty({ type: String, required: true })
  gender: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, required: true })
  address: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ type: String, required: true })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, required: true })
  contactNumber: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, required: true })
  designation: string;
}
