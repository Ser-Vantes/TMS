// import {createParamDecorator, ExecutionContext} from '@nestjs/common';
//
//   export  const AuthUser = createParamDecorator(
//   (data: any, ctx: ExecutionContext) => {
//     const request = ctx.switchToHttp().getRequest();
//     const authHeader = request.headers.authorization;
//     const bearer = authHeader.split(' ')[0]
//     const token = authHeader.split(' ')[1]
//
//
//     return token;
//   },
// );
//
// // import {
// //     CanActivate,
// //     ExecutionContext,
// //     HttpException,
// //     HttpStatus,
// //     Injectable,
// //     UnauthorizedException
// // } from "@nestjs/common";
// // import {Observable} from "rxjs";
// // import {JwtService} from "@nestjs/jwt";
// //
// // export class AuthUser {
// //     constructor(private jwtService: JwtService) {
// //     }
// //
// //     findUserDecorator(data: any, ctx: ExecutionContext){
// //
// //         const req = ctx.switchToHttp().getRequest();
// //         const authHeader = req.headers.authorization;
// //         const bearer = authHeader.split(' ')[0]
// //         const token = authHeader.split(' ')[1]
// //
// //         if (bearer !== 'Bearer' || !token) {
// //             throw new UnauthorizedException({message: 'Пользователь не авторизован'})
// //         }
// //
// //         const user = this.jwtService.verify(token);
// //         req.user = user;
// //         const UserIds = user.id
// //         return UserIds
// //     }
// //
// //
// // }
