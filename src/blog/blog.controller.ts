import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { BlogService } from './blog.service';
import { BlogDto } from './dto/blog.dto';
import { Request } from 'express';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('blog')
export class BlogController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private blogService: BlogService,
  ) {}

  @Post('create')
  async create(@Body() body: BlogDto, @Req() request: Request) {
    const cookie = request.cookies['jwt'];
    const data = await this.jwtService.verifyAsync(cookie);
    const user = await this.authService.findOneById(data.id);
    const blog = await this.blogService.create(body, user);
    return blog;
  }

  @Post('updateBlog')
  async updateBlog(@Body('id') id: number, @Body('blog') blog: any) {
    return await this.blogService.update(id, {
      title: blog.title,
      text: blog.text,
      editDate: new Date(),
    });
  }

  @Post('updateDraft')
  async updateDraft(@Body('id') id: number, @Body('isDraft') isDraft: boolean) {
    return await this.blogService.update(id, {
      isDraft: isDraft,
    });
  }

  @Get()
  async readAll(@Req() request: Request) {
    const cookie = request.cookies['jwt'];
    const data = await this.jwtService.verifyAsync(cookie);
    const user = await this.authService.findOneById(data.id);
    const blogs = await this.blogService.readAll(user);
    return blogs;
  }

  @Post(':id')
  async blog(@Param('id') id: number) {
    return this.blogService.findOneById(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.blogService.delete(id);
  }
}
