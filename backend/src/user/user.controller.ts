import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/auth/public.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    // return this.userService.();
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Req() req) {
    //guard coloca o user no request
    return req.user; // Retorna o perfil do usuário logado
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne({ id });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update({
      where: { id },
      data: updateUserDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.delete({
      id,
    });
  }
}
