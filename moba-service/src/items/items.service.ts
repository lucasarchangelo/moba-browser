import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '../database/entity/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemResponseDto } from './dto/item-response.dto';
import { ILogger } from '../core/logger/logger.interface';
import { Inject } from '@nestjs/common';

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
    
    const item = this.itemRepository.create(createItemDto);
    const savedItem = await this.itemRepository.save(item);
    
    this.logger.info(`Item created successfully with ID: ${savedItem.id}`, this.serviceName);
    return this.mapToResponseDto(savedItem);
  }

  async findAll(): Promise<ItemResponseDto[]> {
    this.logger.debug('Fetching all items', this.serviceName);
    
    const items = await this.itemRepository.find();
    
    this.logger.info(`Retrieved ${items.length} items`, this.serviceName);
    return items.map(item => this.mapToResponseDto(item));
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

    Object.assign(item, updateItemDto);
    const updatedItem = await this.itemRepository.save(item);
    
    this.logger.info(`Item updated successfully with ID: ${id}`, this.serviceName);
    return this.mapToResponseDto(updatedItem);
  }

  async remove(id: string): Promise<void> {
    this.logger.debug(`Attempting to remove item with ID: ${id}`, this.serviceName);
    
    const result = await this.itemRepository.delete(id);
    if (result.affected === 0) {
      this.logger.warn(`Item not found for deletion with ID: ${id}`, this.serviceName);
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    
    this.logger.info(`Item removed successfully with ID: ${id}`, this.serviceName);
  }

  private mapToResponseDto(item: Item): ItemResponseDto {
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      type: item.type,
      damage: item.damage,
      armor: item.armor,
      magicResistance: item.magicResistance,
      health: item.health,
      mana: item.mana,
      strength: item.strength,
      agility: item.agility,
      intelligence: item.intelligence,
      imageUrl: item.imageUrl,
      price: item.price,
      rarity: item.rarity,
      slotType: item.slotType,
      isConsumable: item.isConsumable,
      effects: item.effects,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };
  }
} 