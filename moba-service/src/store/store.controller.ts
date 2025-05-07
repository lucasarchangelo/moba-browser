import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { StoreService } from './store.service';
import { PurchaseItemDto } from './dto/purchase-item.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../database/enums/user-role.enum';

@ApiTags('store')
@Controller('store')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get('items')
  @Roles(UserRole.USER)
  @ApiOperation({ summary: 'Get all available items in the store' })
  @ApiResponse({ status: 200, description: 'Returns all available items' })
  @ApiResponse({ status: 400, description: 'User needs an active hero in the current season' })
  @ApiResponse({ status: 404, description: 'No active season found' })
  async getAvailableItems(@Request() req) {
    return this.storeService.getAvailableItems(req.user.id);
  }

  @Post('purchase')
  @Roles(UserRole.USER)
  @ApiOperation({ summary: 'Purchase multiple items from the store' })
  @ApiResponse({ 
    status: 200, 
    description: 'Items purchased successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Items purchased successfully' },
        remainingMoney: { type: 'number', example: 50 }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Invalid purchase request, not enough money, or user already owns some items' })
  @ApiResponse({ status: 404, description: 'One or more items not found or no active season' })
  async purchaseItem(@Request() req, @Body() purchaseItemDto: PurchaseItemDto) {
    return this.storeService.purchaseItem(req.user.id, purchaseItemDto);
  }
} 