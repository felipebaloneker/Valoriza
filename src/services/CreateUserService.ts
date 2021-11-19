import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UserRepositories"

interface IUserRequest{
    name: string;
    email: string;
    admin?: boolean
}

class CreateUserService {
    async execute({name, email, admin} : IUserRequest) {       
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

        // Criando instância
        const user = usersRepository.create({
            name,
            email,
            admin
        })
        // Salvando no banco
        await usersRepository.save(user)

        return user;
    }
}
export { CreateUserService }