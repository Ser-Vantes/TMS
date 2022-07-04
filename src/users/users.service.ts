import {HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {User} from "./users.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";
import {JwtService} from "@nestjs/jwt";
import {UpdateUserDto} from "./dto/update-user.dto";
import * as bcrypt from 'bcryptjs'
import {where} from "sequelize";
import {JobPosition} from "../jobPosition/jobPosition.model";
import {FilesService} from "../files/files.service";

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
                private roleService: RolesService,
                private fileService: FilesService,
                private jwtService: JwtService) {
    }

    async createUser(dto: CreateUserDto,avatar?: any) {
        const candidate = await this.userRepository.findOne(
            {where: {email: dto.email}}
        );
        if (candidate) {
            throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST);
        }
            if (typeof avatar !== 'undefined') {
                const fileName = await this.fileService.createFile(avatar)
                const hashPassword = await bcrypt.hash(dto.password, 5);
                const user = await this.userRepository.create({...dto, password: hashPassword, avatar: fileName})
                return user;
            }else{
                const hashPassword = await bcrypt.hash(dto.password, 5);
                const user = await this.userRepository.create({...dto, password: hashPassword, avatar: ''})
                return user;
            }

    }

    async getAllUsers() {
        const items = await this.userRepository.findAll({
            include: { all: true },
            attributes: { exclude: ["password"] },
        });
        return { items };
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne(
            {
                where: {email},
                include: JobPosition
            },
        )
        return user;
    }

    async findOne(id: number) {
        const user = await this.userRepository.findOne({
            where: {id},
            include: {all: true},
            attributes: {exclude: ['password']}
        });
        return user;
    }

    async getUserByRole(value: string) {
        const role = await this.roleService.getRoleByValue(value);
        const user = await this.userRepository.findAll({
            where: {roleId: role.id},
            include: {all: true},
            attributes: {exclude: ['password']}
        });
        return user;
    }

    async getUserByTerminal(terminal: string) {
        const user = await this.userRepository.findAll({
            where: {terminal},
            include: {all: true},
            attributes: {exclude: ['password']}
        });
        return user;
    }

    async getUserBySypervisor(supervisor: string) {
        const user = await this.userRepository.findAll({
            where: {supervisor},
            include: {all: true},
            attributes: {exclude: ['password']}
        });
        return user;
    }

    async update(id: number, updateDto: UpdateUserDto) {
        const user = await this.userRepository.update(
            {
                ...updateDto
            },
            {
                where: {id},
                returning: true
            })

        if (!user) {
            throw new NotFoundException(`User ${id} not found`);
        }
        return user;
    }

    async delete(id: number) {
        return await this.userRepository.destroy({where: {id}});
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);
        if (role && user) {
            await user.$add('role', role.id);
            return dto;
        }
        throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
    }

    async ban(dto: BanUserDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
        }
        user.banned = true;
        user.banReason = dto.banReason;
        await user.save();
        return user;
    }

  async findMes(head:any) {

        const authHeader = head.authorization
        const bearer = authHeader.split(' ')[0]
        const token = authHeader.split(' ')[1]

        const user = this.jwtService.verify(token);
        const idsUser = user.id
        return idsUser
    }

    async updateAvatar(id:number,avatar: any) {
        const fileName = await this.fileService.createFile(avatar)
        const user = await this.userRepository.update(
            {
                avatar: fileName
            },
            {
                where: {id: id},
            })
        if (!user) {
            throw new NotFoundException(`User ${id} not found`);
        }
        return user;
    }
}
