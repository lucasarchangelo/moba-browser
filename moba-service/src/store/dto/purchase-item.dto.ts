import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, IsNumber, IsEnum, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export enum PurchaseItemType {
  ITEM = 'item',
  SKILL = 'skill'
}

export class PurchaseItemEntryDto {
  @ApiProperty({ description: 'ID of the item or skill to purchase' })
  @IsString()
  itemId: string;

  @ApiProperty({ description: 'Quantity of the item to purchase (only for items)' })
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty({ 
    description: 'Type of the purchase (item or skill)',
    enum: PurchaseItemType
  })
  @IsEnum(PurchaseItemType)
  type: PurchaseItemType;
}

export class PurchaseItemDto {
  @ApiProperty({ 
    description: 'Array of items to purchase',
    type: [PurchaseItemEntryDto]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PurchaseItemEntryDto)
  items: PurchaseItemEntryDto[];
} 