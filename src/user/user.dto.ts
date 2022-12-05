import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ type: String })
  firstName: string;

  @ApiProperty({ type: String })
  middleName: string;

  @ApiProperty({ type: String })
  lastName: string;

  @ApiProperty({ type: Number })
  age: number;

  @ApiProperty({ type: String })
  gender: string;

  @ApiProperty({ type: String })
  address: string;

  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  contactNumber: string;

  @ApiProperty({ type: String })
  designation: string;
}
