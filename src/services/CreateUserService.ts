import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UserRepositories"

interface IUserRequest{
    name: string;
    email: string;
    admin?: boolean;
    password:string;
}

class CreateUserService {
    async execute({name, email, admin = false, password} : IUserRequest) {       
        const usersRepository = getCustomRepository(UsersRepositories);
        // Verificando se email foi preenchido
        if(!email) {
            throw new Error("Email incorrect");
        }

        // Verificando se usuario já existe pelo email
        const userAlreadyExists = await usersRepository.findOne({
            email
        });

        if(userAlreadyExists){
            throw new Error(" User already exists");
        }

        const passwordHash = await hash(password, 8)

        // Criando instância
        const user = usersRepository.create({
            name,
            email,
            admin,
            password: passwordHash,
        })
        // Salvando no banco
        await usersRepository.save(user)

        return user;
    }
}
export { CreateUserService }