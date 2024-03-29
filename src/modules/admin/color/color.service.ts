// Color Service
import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Colors } from 'src/entities/colors.entity'
import { CustomException } from 'src/helpers/custom.exception'
import { AndQueryFilters } from 'src/helpers/queryFilter'
import { ColorRepository } from './color.repository'
import { ColorDto } from './dto/color.dto'

@Injectable()
export class ColorService {
    private readonly logger = new Logger(ColorService.name)
    constructor(@InjectRepository(ColorRepository) private readonly colorRepository: ColorRepository) { }

    // Get Colors
    async getColors(colorFilters: string): Promise<Colors[]> {
        try {
            const colors = await this.colorRepository.createQueryBuilder()
            .select([
                'color.id',
                'color.color',
            ])
            .from(Colors, 'color')
            .where(...AndQueryFilters(colorFilters))
            .orderBy('color.color', 'ASC')
            .getMany()
            
            this.logger.verbose(`Retrieving colors. Found ${colors.length} items.`)
            return colors
        }
        catch(error) { throw CustomException.internalServerError(ColorService.name, `Retrieving colors failed. Reason: ${error.message}.`) }
    }

    // Create Color
    async createColor(colorDto: ColorDto): Promise<void> {
        return this.colorRepository.createColor(colorDto)
    }

    // Edit Color
    async editColor(colorId: string, colorDto: ColorDto): Promise<void> {
        return this.colorRepository.editColor(colorId, colorDto)
    }

    // Delete Color
    async deleteColor(colorId: string): Promise<void> {
        return this.colorRepository.deleteColor(colorId)
    }
}
