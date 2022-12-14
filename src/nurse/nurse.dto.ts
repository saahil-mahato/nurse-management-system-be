import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

import { Timestamp, timestamp } from 'rxjs';

import { CreateUserDto } from 'src/user/user.dto';

export class NurseDto extends CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true })
  department: string;

  @IsNotEmpty()
  @ApiProperty({ type: Boolean, required: true })
  isRoundingManager: boolean;

  @IsNotEmpty()
  @ApiProperty({ type: timestamp, required: true })
  dutyStartTime: Timestamp<number>;

  @IsNotEmpty()
  @ApiProperty({ type: timestamp, required: true })
  dutyEndTime: Timestamp<number>;

  @IsNotEmpty()
  @ApiProperty({ type: Array<string>, required: true })
  workingDays: Array<string>;
}
