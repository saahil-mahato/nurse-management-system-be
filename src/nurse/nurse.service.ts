import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { CreateNurseDto } from './nurse.dto';
import { Nurse, NurseDocument } from './nurse.schema';

@Injectable()
export class NurseService {
  constructor(
    @InjectModel(Nurse.name) private nurseModel: Model<NurseDocument>,
  ) {}

  /**
   * Function to add a new nurse.
   *
   * @param {CreateNurseDto} createNurseDto - the nurse details
   * @returns {Promise<Nurse>}
   */
  async addNewNurse(createNurseDto: CreateNurseDto): Promise<Nurse> {
    const createdNurse = new this.nurseModel(createNurseDto);

    return createdNurse.save();
  }

  /**
   * Function to get all nurses.
   *
   * @returns {Promise<Array<Nurse>>}
   */
  async getAllNurses(): Promise<Array<Nurse>> {
    return this.nurseModel.find().exec();
  }
}
