import {HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {User} from "./users.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";
import {JwtService} from "@nestjs/jwt";
import {UpdateUserDto} from "./dto/update-user.dto";
import {where} from "sequelize";

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
                private roleService: RolesService,
                private jwtService: JwtService,) {
    }

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        // const role = await this.roleService.getRoleByValue("Broker")
        // user.roleId = role.id
        return user;
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll(
            {
                include: {all: true},
                attributes: {exclude: ['password']}
            });
        return users;
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne(
            {
                where: {email},
                include: {all: true},
                attributes: {exclude: ['password']}
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
        const user = await this.userRepository.findOne({
            where: {roleId: role.id},
            include: {all: true},
            attributes: {exclude: ['password']}
        });
        return user;
    }

    async getUserByTerminal(terminal: string) {
        const user = await this.userRepository.findOne({
            where: {terminal},
            include: {all: true},
            attributes: {exclude: ['password']}
        });
        return user;
    }

    async getUserBySypervisor(supervisor: string) {
        const user = await this.userRepository.findOne({
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


}
