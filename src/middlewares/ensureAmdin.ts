import { Request, Response, NextFunction } from "express";
import { UsersRepositories } from "../repositories/UserRepositories";
import { getCustomRepository} from 'typeorm'

export async function ensureAdmin(
    request:Request,
    response: Response,
    next: NextFunction
    ){
    // Verificando se esta logado
    const {user_id} = request;
    const usersRepositories = getCustomRepository(UsersRepositories);

    const {admin} = await usersRepositories.findOne(user_id);

    // Verificar se o usuario admin

    if(admin){
        return next();
    }

    return response.status(401).json({
        error:"Unauthorized",
    });
}