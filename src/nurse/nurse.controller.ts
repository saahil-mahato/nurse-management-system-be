import { Body, Controller, Get, Post } from '@nestjs/common';

import { Nurse } from './nurse.schema';
import { CreateNurseDto } from './nurse.dto';
import { NurseService } from './nurse.service';

@Controller('nurses')
export class NurseController {
  constructor(private nurseService: NurseService) {}

  /**
   * Endpoint to add a new nurse.
   *
   * @param {CreateNurseDto} createNurseDto - the nurse details
   * @returns {Promise<Nurse>}
   */
  @Post('add-new-nurse')
  async create(@Body() createNurseDto: CreateNurseDto): Promise<Nurse> {
    return this.nurseService.addNewNurse(createNurseDto);
  }

  /**
   * Endpoint to get all nurses.
   *
   * @returns {Promise<Array<Nurse>>}
   */
  @Get('/')
  async getAll(): Promise<Array<Nurse>> {
    return this.nurseService.getAllNurses();
  }
}
