// Color Repository
import { Colors } from "src/entities/colors.entity"
import { CustomException } from "src/helpers/custom.exception"
import { EntityRepository, Repository } from "typeorm"
import { CreateColorDto } from "./dto/create-color.dto"

@EntityRepository(Colors)
export class ColorRepository extends Repository<Colors> {

    // Create Color
    async createColor(colorDto: CreateColorDto): Promise<void> {
        const { color } = colorDto

        const newColor = new Colors()
        newColor.color = color
        newColor.created_at = new Date()
        newColor.updated_at = new Date()

        const colorExists = await this.findOne({ where: { color: color } })
        if (colorExists) throw CustomException.conflict(ColorRepository.name, `Color: ${color} already exists!`)

        try { await newColor.save() }
        catch (error) { throw CustomException.internalServerError(ColorRepository.name, `Adding a color failed! Reason: ${error.message} `) }

        throw CustomException.created(ColorRepository.name, `Color: ${color} successfully created!`)
    }

    // Edit Color
    async editColor(colorId: string, colorDto: CreateColorDto): Promise<void> {
        const existingColor = await this.findOne({ where: { id: colorId } })
        if (!existingColor) throw CustomException.notFound(ColorRepository.name, `Color with id: ${colorId} does not exist!`)

        const oldColor = existingColor.color
        const { color } = colorDto
        existingColor.color = color
        existingColor.updated_at = new Date()

        const colorExists = await this.findOne({ where: { color: color } })
        if (colorExists) throw CustomException.conflict(ColorRepository.name, `Color: ${color} already exists!`)

        try { await existingColor.save() }
        catch (error) { throw CustomException.internalServerError(ColorRepository.name, `Editing a color failed! Reason: ${error.message}`) }

        throw CustomException.ok(ColorRepository.name, `Color: ${oldColor} successfully changed into ${color} !`)
    }

    // Delete Color
    async deleteColor(colorId: string): Promise<void> {
        const existingColor = await this.findOne({ where: { id: colorId } })
        if (!existingColor) throw CustomException.notFound(ColorRepository.name, `Color with id: ${colorId} does not exist!`)

        try { await existingColor.remove() }
        catch (error) { throw CustomException.internalServerError(ColorRepository.name, `Deleting a color failed! Reason: ${error.message}`) }

        throw CustomException.ok(ColorRepository.name, `Color: ${existingColor.color} successfully deleted!`)
    }
}