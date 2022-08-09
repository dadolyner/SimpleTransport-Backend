// Color Service
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Colors } from 'src/entities/colors.entity';
import { ColorRepository } from './color.repository';
import { CreateColorDto } from './dto/create-color.dto';

@Injectable()
export class ColorService {
    constructor(
        @InjectRepository(ColorRepository) private readonly colorRepository: ColorRepository,
    ) { }

    // Get Colors
    async getColors(colorId: string): Promise<Colors[]> {
        if (colorId) return this.colorRepository.find({ where: { id: colorId } });
        return this.colorRepository.find();
    }

    // Create Color
    async createColor(color: CreateColorDto): Promise<void> {
        return this.colorRepository.createColor(color);
    }

    // Edit Color
    async editColor(colorId: string, newColor: CreateColorDto): Promise<void> {
        return this.colorRepository.editColor(colorId, newColor);
    }

    // Delete Color
    async deleteColor(colorId: string): Promise<void> {
        return this.colorRepository.deleteColor(colorId);
    }
}
