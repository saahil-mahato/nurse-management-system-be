import { InjectModel } from '@nestjs/mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';

import { Model } from 'mongoose';

import { NurseDto } from './nurse.dto';
import { Nurse, NurseDocument } from './nurse.schema';

@Injectable()
export class NurseService {
  constructor(
    @InjectModel(Nurse.name) private nurseModel: Model<NurseDocument>,
  ) {}

  /**
   * Function to get all nurses.
   *
   * @returns {Promise<Array<Nurse>>}
   */
  async getAllNurses(): Promise<Array<Nurse>> {
    return this.nurseModel.find().exec();
  }

  /**
   * Function to add a new nurse.
   *
   * @param {NurseDto} nurseDto - the nurse details
   * @returns {Promise<Nurse>}
   */
  async addNewNurse(nurseDto: NurseDto): Promise<Nurse> {
    const createdNurse = new this.nurseModel(nurseDto);

    return createdNurse.save();
  }

  /**
   * Function to edit a nurse.
   *
   * @param {NurseDto} nurseDto - the nurse details
   * @returns {Promise<Nurse>}
   */
  async updateNurse(id: string, nurseDto: NurseDto): Promise<Nurse> {
    if (!(await this.nurseModel.findById(id))) {
      throw new BadRequestException('Nurse does not exist');
    }
    const updatedNurse = this.nurseModel.findByIdAndUpdate(id, nurseDto, {
      new: true,
    });

    return updatedNurse;
  }
}
