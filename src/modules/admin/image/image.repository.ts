// Image Repository
import { Images } from "src/entities/images.entity"
import { CustomException } from "src/helpers/custom.exception"
import { EntityRepository, Repository } from "typeorm"
import { ImageDto } from "./dto/image.dto"

@EntityRepository(Images)
export class ImageRepository extends Repository<Images> {

    // Create Image
    async createImage(imageDto: ImageDto): Promise<void> {
        const { url } = imageDto

        const imageExists = await this.findOne({ where: { url: url } })
        if (imageExists) throw CustomException.conflict(ImageRepository.name, `Image ${url} already exists.`)

        const newImage = new Images()
        newImage.url = url
        newImage.created_at = new Date()
        newImage.updated_at = new Date()

        try { await newImage.save() }
        catch (error) { throw CustomException.internalServerError(ImageRepository.name, `Adding an image failed. Reason: ${error.message}.`) }

        throw CustomException.created(ImageRepository.name, `Image ${url} successfully created.`)
    }

    // Edit Image
    async editImage(imageId: string, imageDto: ImageDto): Promise<void> {
        const { url } = imageDto

        const existingImage = await this.findOne({ where: { id: imageId } })
        if (!existingImage) throw CustomException.badRequest(ImageRepository.name, `Provided image does not exist.`)
        const imageExists = await this.findOne({ where: { url: url } })
        if (imageExists) throw CustomException.conflict(ImageRepository.name, `Image ${url} already exists.`)

        const oldImage = existingImage.url
        existingImage.url = url
        existingImage.updated_at = new Date()

        try { await existingImage.save() }
        catch (error) { throw CustomException.internalServerError(ImageRepository.name, `Editing an image failed. Reason: ${error.message}.`) }

        throw CustomException.ok(ImageRepository.name, `Image ${oldImage} successfully edited.`)
    }


    // Delete Image
    async deleteImage(imageId: string): Promise<void> {
        const existingImage = await this.findOne({ where: { id: imageId } })
        if (!existingImage) throw CustomException.badRequest(ImageRepository.name, `Provided image does not exist.`)

        try { await existingImage.remove() }
        catch (error) { throw CustomException.internalServerError(ImageRepository.name, `Deleting an image failed. Reason: ${error.message}.`) }

        throw CustomException.ok(ImageRepository.name, `Image ${existingImage.url} successfully deleted.`)
    }
}