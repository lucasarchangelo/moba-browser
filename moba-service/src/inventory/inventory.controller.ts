import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { InventoryService } from './inventory.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../database/enums/user-role.enum';
import { InventoryResponseDto } from './dto/inventory-response.dto';

@ApiTags('inventory')
@Controller('inventory')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  @Roles(UserRole.USER)
  @ApiOperation({ summary: 'Get hero inventory' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns the hero inventory',
    type: InventoryResponseDto
  })
  @ApiResponse({ status: 400, description: 'User needs an active hero in the current season' })
  @ApiResponse({ status: 404, description: 'No active season found' })
  async getHeroInventory(@Request() req): Promise<InventoryResponseDto> {
    return this.inventoryService.getHeroInventory(req.user.id);
  }
} 