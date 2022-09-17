import { Injectable } from "@nestjs/common";
import { Loads } from "./loads.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateLoadsDto } from "./dto/create-loads.dto";

@Injectable()
export class LoadsService {
  constructor(@InjectModel(Loads) private loadsRepository: typeof Loads) {
  }

  async createLoads(dto: CreateLoadsDto) {
    const load = await this.loadsRepository.create(dto);
    return load;
  }

  async getAllLoads() {
const loads = await this.loadsRepository.findAll();
return loads;
  }

  async updateLoads() {

  }
}
