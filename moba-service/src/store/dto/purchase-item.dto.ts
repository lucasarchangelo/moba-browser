import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, IsNumber, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class PurchaseItemEntryDto {
  @ApiProperty({ description: 'ID of the item to purchase' })
  @IsString()
  itemId: string;

  @ApiProperty({ description: 'Quantity of the item to purchase', minimum: 1 })
  @IsNumber()
  @Min(1)
  quantity: number;
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