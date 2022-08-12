// Postal Repository
import { Postals } from "src/entities/postals.entity"
import { CustomException } from "src/helpers/custom.exception"
import { EntityRepository, Repository } from "typeorm"
import { CreatePostalDto } from "./dto/create-postal.dto"

@EntityRepository(Postals)
export class PostalRepository extends Repository<Postals> {

    // Create Postal
    async createPostal(postalDto: CreatePostalDto): Promise<void> {
        const { post_office, post_number } = postalDto

        const postalExists = await this.findOne({ where: [{ post_office }, { post_number }] })
        if (postalExists) throw CustomException.badRequest(PostalRepository.name, `Postal ${post_office} (${post_number}) already exists.`)

        const newPostal = new Postals()
        newPostal.post_office = post_office
        newPostal.post_number = post_number
        newPostal.created_at = new Date()
        newPostal.updated_at = new Date()

        try { await newPostal.save() }
        catch (error) { throw CustomException.internalServerError(PostalRepository.name, `Adding a postal failed. Reason: ${error.message}.`) }

        throw CustomException.created(PostalRepository.name, `Postal ${post_office} (${post_number}) successfully created.`)
    }

    // Edit Postal
    async editPostal(postalId: string, postalDto: CreatePostalDto): Promise<void> {
        const { post_office, post_number } = postalDto
        
        const existingPostal = await this.findOne({ where: { id: postalId } })
        if (!existingPostal) throw CustomException.conflict(PostalRepository.name, `Provided postal does not exist.`)
        const postalExists = await this.findOne({ where: [{ post_office }, { post_number }] })
        if (postalExists) throw CustomException.badRequest(PostalRepository.name, `Postal ${post_office} (${post_number}) already exists.`)

        const oldPostal = { ...existingPostal }
        existingPostal.post_office = post_office
        existingPostal.post_number = post_number
        existingPostal.updated_at = new Date()

        try { await existingPostal.save() }
        catch (error) { throw CustomException.internalServerError(PostalRepository.name, `Editing a postal failed. Reason: ${error.message}.`) }

        throw CustomException.ok(PostalRepository.name, `Postal ${oldPostal.post_office} (${oldPostal.post_number}) successfully edited.`)
    }

    // Delete Postal
    async deletePostal(postalId: string): Promise<void> {
        const existingPostal = await this.findOne({ where: { id: postalId } })
        if (!existingPostal) throw CustomException.conflict(PostalRepository.name, `Provided postal does not exist.`)

        try { await existingPostal.remove() }
        catch (error) { throw CustomException.internalServerError(PostalRepository.name, `Deleting a postal failed. Reason: ${error.message}.`) }

        throw CustomException.ok(PostalRepository.name, `Postal ${existingPostal.post_office} (${existingPostal.post_number}) successfully deleted.`)
    }
}