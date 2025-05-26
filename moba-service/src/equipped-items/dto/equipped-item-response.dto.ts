import { ApiProperty } from '@nestjs/swagger';
import { ItemSlotType } from '../../database/enums/item-slot-type.enum';

export class EquippedItemResponseDto {
  @ApiProperty({
    description: 'The ID of the equipped item',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  id: string;

  @ApiProperty({
    description: 'The ID of the hero who has the item equipped',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  heroId: string;

  @ApiProperty({
    description: 'The ID of the equipped item',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  itemId: string;

  @ApiProperty({
    description: 'The slot where the item is equipped',
    enum: ItemSlotType,
    example: ItemSlotType.WEAPON
  })
  slot: ItemSlotType;

  @ApiProperty({
    description: 'When the item was equipped',
    example: '2024-03-20T12:00:00Z'
  })
  createdAt: Date;
} 