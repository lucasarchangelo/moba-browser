import { Controller, Post, Get, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { EquippedItemsService } from './equipped-items.service';
import { EquipItemDto } from './dto/equip-item.dto';
import { EquippedItemResponseDto } from './dto/equipped-item-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../database/enums/user-role.enum';

@ApiTags('equipped-items')
@Controller('equipped-items')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class EquippedItemsController {
  constructor(private readonly equippedItemsService: EquippedItemsService) {}

  @Post()
  @Roles(UserRole.USER)
  @ApiOperation({ summary: 'Equip an item to the active hero' })
  @ApiResponse({
    status: 201,
    description: 'The item has been successfully equipped',
    type: EquippedItemResponseDto
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Hero or item not found' })
  async equipItem(
    @Body() equipItemDto: EquipItemDto,
    @Req() req: any
  ): Promise<EquippedItemResponseDto> {
    return this.equippedItemsService.equipItem(equipItemDto, req.user.userId);
  }

  @Get('active')
  @Roles(UserRole.USER)
  @ApiOperation({ summary: 'Get all equipped items for the active hero' })
  @ApiResponse({
    status: 200,
    description: 'Returns all equipped items for the active hero',
    type: [EquippedItemResponseDto]
  })
  @ApiResponse({ status: 404, description: 'Active hero not found' })
  async getActiveHeroEquippedItems(
    @Req() req: any
  ): Promise<EquippedItemResponseDto[]> {
    return this.equippedItemsService.getActiveHeroEquippedItems(req.user.userId);
  }

  @Delete(':id')
  @Roles(UserRole.USER)
  @ApiOperation({ summary: 'Unequip an item from the active hero' })
  @ApiResponse({ status: 200, description: 'The item has been successfully unequipped' })
  @ApiResponse({ status: 404, description: 'Equipped item not found' })
  async unequipItem(
    @Param('id') id: string,
    @Req() req: any
  ): Promise<void> {
    return this.equippedItemsService.unequipItem(id, req.user.userId);
  }
} 