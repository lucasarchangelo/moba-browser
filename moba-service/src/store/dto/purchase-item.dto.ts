import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsUUID } from 'class-validator';

export class PurchaseItemDto {
  @ApiProperty({
    description: 'The ID of the item to purchase',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsUUID()
  itemId: string;

  @ApiProperty({
    description: 'The quantity of items to purchase (max 5 for consumables)',
    example: 1,
    minimum: 1,
    maximum: 5
  })
  @IsNumber()
  quantity: number;
} 