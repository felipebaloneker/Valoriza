import { getCustomRepository } from 'typeorm'
import { TagsRepositories } from "../repositories/TagsRepositories"

class CreateTagService{
    async execute(name: string){
        const tagsRepositories = getCustomRepository(TagsRepositories)
        // Verificando se o nome ja existe
        if(!name) {
            throw new Error('Incorrect name!');
        }

        // Verificando se a tag ja existe
        const tagAlreadyExists = await tagsRepositories.findOne({
            name
        });
        if(tagAlreadyExists) {
         throw new Error('Tag already exists!');   
        }

        // Criando a tag
        const tag = tagsRepositories.create({
            name,
        })
        
        await tagsRepositories.save(tag);
        return tag;
    }

}

export { CreateTagService }