import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';

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
  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() nurseDto: NurseDto,
  ): Promise<Nurse> {
    return this.nurseService.updateNurse(id, nurseDto);
  }
}
