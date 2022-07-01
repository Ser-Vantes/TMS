import { Injectable } from '@nestjs/common';
import {CreateJobPositionDto} from "./dto/create-jobPosition.dto";
import {InjectModel} from "@nestjs/sequelize";
import {JobPosition} from "./jobPosition.model";

@Injectable()
export class JobPositionService {

    constructor(@InjectModel(JobPosition) private jobPositionRepository: typeof JobPosition) {}

    async create(dto: CreateJobPositionDto) {
        const jobPosition = await this.jobPositionRepository.create(dto)
        return jobPosition;
    }

    async getAllJobPositions() {
        const jobPositions = await this.jobPositionRepository.findAll({include: {all: true}});
        return jobPositions;
    }
}
