import {
  Get,
  Put,
  Body,
  Post,
  Param,
  Delete,
  UseGuards,
  Controller,
} from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';

import { Nurse } from './nurse.schema';
import { NurseDto } from './nurse.dto';
import { NurseService } from './nurse.service';

@Controller('nurses')
export class NurseController {
  constructor(private nurseService: NurseService) {}

  /**
   * Endpoint to get all nurses.
   *
   * @returns {Promise<Array<Nurse>>}
   */
  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getAll(): Promise<Array<Nurse>> {
    return this.nurseService.getAllNurses();
  }

  /**
   * Endpoint to add a new nurse.
   *
   * @param {nurseDto} nurseDto - the nurse details
   * @returns {Promise<Nurse>}
   */
  @UseGuards(JwtAuthGuard)
  @Post('/')
  async create(@Body() nurseDto: NurseDto): Promise<Nurse> {
    return this.nurseService.addNewNurse(nurseDto);
  }

  /**
   * Endpoint to update a nurse.
   *
   * @param {nurseDto} nurseDto - the nurse details
   * @returns {Promise<Nurse>}
   */
  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() nurseDto: NurseDto,
  ): Promise<Nurse> {
    return this.nurseService.updateNurse(id, nurseDto);
  }

  /**
   * Endpoint to delete a nurse.
   *
   */
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    return this.nurseService.deleteNurse(id);
  }
}
