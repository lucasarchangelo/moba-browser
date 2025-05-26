import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '../database/entity/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemResponseDto, EffectDto } from './dto/item-response.dto';
import { ILogger } from '../core/logger/logger.interface';
import { Inject } from '@nestjs/common';
import { PaginationDto } from '../common/dto/pagination.dto';
import { PaginatedResponseDto } from '../common/dto/paginated-response.dto';


@Injectable()
export class ItemsService {
  private readonly serviceName = { service: 'ItemsService' };

  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {}

  async create(createItemDto: CreateItemDto): Promise<ItemResponseDto> {
    this.logger.debug(`Creating new item with name: ${createItemDto.name}`, this.serviceName);
    
    const item = new Item();
    Object.assign(item, {
      ...createItemDto,
      effects: createItemDto.effects || { effect: [] },
    });
    
    const savedItem = await this.itemRepository.save(item);
    
    this.logger.info(`Item created successfully with ID: ${savedItem.id}`, this.serviceName);
    return this.mapToResponseDto(savedItem);
  }

  async findAll(paginationDto: PaginationDto, slotType?: string): Promise<PaginatedResponseDto<ItemResponseDto>> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const queryBuilder = this.itemRepository.createQueryBuilder('item');

    if (slotType) {
      queryBuilder.where('item.slotType = :slotType', { slotType });
    }

    const [items, total] = await queryBuilder
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const itemsDto = items.map(item => this.mapToResponseDto(item));
    return new PaginatedResponseDto(itemsDto, total, page, limit);
  }

  async findOne(id: string): Promise<ItemResponseDto> {
    this.logger.debug(`Finding item with ID: ${id}`, this.serviceName);
    
    const item = await this.itemRepository.findOne({ where: { id } });
    if (!item) {
      this.logger.warn(`Item not found with ID: ${id}`, this.serviceName);
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    
    this.logger.debug(`Item found with ID: ${id}`, this.serviceName);
    return this.mapToResponseDto(item);
  }

  async update(id: string, updateItemDto: UpdateItemDto): Promise<ItemResponseDto> {
    this.logger.debug(`Updating item with ID: ${id}`, this.serviceName);
    
    const item = await this.itemRepository.findOne({ where: { id } });
    if (!item) {
      this.logger.warn(`Item not found with ID: ${id}`, this.serviceName);
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    
    const updateData = {
      ...(updateItemDto.name && { name: updateItemDto.name }),
      ...(updateItemDto.description && { description: updateItemDto.description }),
      ...(updateItemDto.baseHealth !== undefined && { baseHealth: updateItemDto.baseHealth }),
      ...(updateItemDto.baseMana !== undefined && { baseMana: updateItemDto.baseMana }),
      ...(updateItemDto.baseArmor !== undefined && { baseArmor: updateItemDto.baseArmor }),
      ...(updateItemDto.baseMagicResistance !== undefined && { baseMagicResistance: updateItemDto.baseMagicResistance }),
      ...(updateItemDto.baseAccuracy !== undefined && { baseAccuracy: updateItemDto.baseAccuracy }),
      ...(updateItemDto.baseDamage !== undefined && { baseDamage: updateItemDto.baseDamage }),
      ...(updateItemDto.baseMagicDamage !== undefined && { baseMagicDamage: updateItemDto.baseMagicDamage }),
      ...(updateItemDto.isConsumable !== undefined && { isConsumable: updateItemDto.isConsumable }),
      ...(updateItemDto.slotType && { slotType: updateItemDto.slotType }),
      ...(updateItemDto.price !== undefined && { price: updateItemDto.price }),
      ...(updateItemDto.imageUrl && { imageUrl: updateItemDto.imageUrl }),
      ...(updateItemDto.effects && { effects: updateItemDto.effects }),
    };
    
    Object.assign(item, updateData);
    const updatedItem = await this.itemRepository.save(item);
    
    this.logger.info(`Item updated successfully with ID: ${id}`, this.serviceName);
    return this.mapToResponseDto(updatedItem);
  }

  async remove(id: string): Promise<ItemResponseDto> {
    this.logger.debug(`Attempting to remove item with ID: ${id}`, this.serviceName);
    
    const item = await this.itemRepository.findOne({ where: { id } });
    if (!item) {
      this.logger.warn(`Item not found with ID: ${id}`, this.serviceName);
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    
    const result = await this.itemRepository.remove(item);
    
    this.logger.info(`Item removed successfully with ID: ${id}`, this.serviceName);
    return this.mapToResponseDto(result);
  }

  private mapToResponseDto(item: Item): ItemResponseDto {
    let effects: EffectDto[] = [];

    if (item.effects && Object.keys(item.effects).length > 0) {
      effects = item.effects?.map(effect => ({
        type: effect.type,
        target: effect.target,
        stat: effect.stat,
        value: typeof effect.value === 'string' ? parseFloat(effect.value) : effect.value,
        duration: effect.duration,
        chance: effect.chance
      }));
    }

    return {
      id: item.id,
      name: item.name,
      description: item.description,
      baseHealth: item.baseHealth,
      baseMana: item.baseMana,
      baseArmor: item.baseArmor,
      baseMagicResistance: item.baseMagicResistance,
      baseAccuracy: item.baseAccuracy,
      baseDamage: item.baseDamage,
      baseMagicDamage: item.baseMagicDamage,
      isConsumable: item.isConsumable,
      slotType: item.slotType,
      price: item.price,
      imageUrl: item.imageUrl,
      effects: effects,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,  
    };
  }
} 