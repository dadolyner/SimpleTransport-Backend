// Color Service
import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Colors } from 'src/entities/colors.entity'
import { ColorRepository } from './color.repository'
import { CreateColorDto } from './dto/create-color.dto'

@Injectable()
export class ColorService {
    private readonly logger = new Logger(ColorService.name)
    constructor(@InjectRepository(ColorRepository) private readonly colorRepository: ColorRepository) { }

    // Get Colors
    async getColors(colorId: string): Promise<Colors[]> {
        if (colorId) {
            const colors = await this.colorRepository.find({ where: { id: colorId } })
            this.logger.verbose(`Retrieving color with id: ${colorId}. Found ${colors.length} items.`)
            return colors
        } else {
            const colors = await this.colorRepository.find()
            this.logger.verbose(`Retrieving all colors. Found ${colors.length} items.`)
            return colors
        }
    }

    // Create Color
    async createColor(colorDto: CreateColorDto): Promise<void> {
        return this.colorRepository.createColor(colorDto)
    }

    // Edit Color
    async editColor(colorId: string, colorDto: CreateColorDto): Promise<void> {
        return this.colorRepository.editColor(colorId, colorDto)
    }

    // Delete Color
    async deleteColor(colorId: string): Promise<void> {
        return this.colorRepository.deleteColor(colorId)
    }
}
