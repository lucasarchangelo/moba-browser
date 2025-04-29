import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemResponseDto } from './dto/item-response.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/roles.enum';

@ApiTags('items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new item' })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'The item has been successfully created.',
    type: ItemResponseDto 
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Invalid input data.' 
  })
  @ApiResponse({ 
    status: HttpStatus.FORBIDDEN, 
    description: 'Only administrators can create items.' 
  })
  create(@Body() createItemDto: CreateItemDto): Promise<ItemResponseDto> {
    return this.itemsService.create(createItemDto);
  }

  @Get()
  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Return all items.',
    type: [ItemResponseDto] 
  })
  findAll(): Promise<ItemResponseDto[]> {
    return this.itemsService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Get an item by id' })
  @ApiParam({ name: 'id', description: 'The item ID' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Return the item.',
    type: ItemResponseDto 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Item not found.' 
  })
  findOne(@Param('id') id: string): Promise<ItemResponseDto> {
    return this.itemsService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an item (admin only)' })
  @ApiParam({ name: 'id', description: 'The item ID' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'The item has been successfully updated.',
    type: ItemResponseDto 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Item not found.' 
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Invalid input data.' 
  })
  @ApiResponse({ 
    status: HttpStatus.FORBIDDEN, 
    description: 'Only administrators can update items.' 
  })
  update(
    @Param('id') id: string,
    @Body() updateItemDto: UpdateItemDto,
  ): Promise<ItemResponseDto> {
    return this.itemsService.update(id, updateItemDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete an item' })
  @ApiParam({ name: 'id', description: 'The item ID' })
  @ApiResponse({ 
    status: HttpStatus.NO_CONTENT, 
    description: 'The item has been successfully deleted.' 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Item not found.' 
  })
  @ApiResponse({ 
    status: HttpStatus.FORBIDDEN, 
    description: 'Only administrators can delete items.' 
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.itemsService.remove(id);
  }
} 