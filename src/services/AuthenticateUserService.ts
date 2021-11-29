import {getCustomRepository} from 'typeorm'
import {UsersRepositories} from '../repositories/UserRepositories'
import {compare} from 'bcryptjs'
import { sign } from 'jsonwebtoken'
interface IAutheticateRequest{
    email: string;
    password: string;
}

class AuthenticateUserService{
    async execute({email, password}: IAutheticateRequest){
        const usersRepositories = getCustomRepository(UsersRepositories);

        // Verificar se email existe
        const user = await usersRepositories.findOne({email})

        if(!user){
            throw new Error('Email/Password incorrect');
        }

        // verificar se senha esta correta
        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch){
            throw new Error("Email/Password incorrect");
        }

        // Gerar token
        const token = sign({
            email: user.email
        },"7c2c2edb693c0415ea58d0e85b38f102",{
            subject : user.id,
            expiresIn : "1d",
        }) 

        return token;
    }
}
export { AuthenticateUserService}