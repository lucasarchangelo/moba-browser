import { ApiProperty } from '@nestjs/swagger';
import { ItemResponseDto } from '../../items/dto/item-response.dto';

export class InventoryItemResponseDto {
  @ApiProperty({ description: 'The ID of the inventory entry' })
  id: string;

  @ApiProperty({ description: 'The quantity of the item in inventory' })
  quantity: number;

  @ApiProperty({ description: 'The item details', type: ItemResponseDto })
  item: ItemResponseDto;

  @ApiProperty({ description: 'When the item was added to inventory' })
  createdAt: Date;

  @ApiProperty({ description: 'When the inventory entry was last updated' })
  acquiredAt: Date;
}

export class InventoryResponseDto {
  @ApiProperty({ description: 'The hero ID' })
  heroId: string;

  @ApiProperty({ 
    description: 'Array of items in the inventory',
    type: [InventoryItemResponseDto]
  })
  items: InventoryItemResponseDto[];
} 