import { Injectable } from '@nestjs/common';
import { BlogEntity } from './models/blog.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './models/blog.interface';
import { User } from '../auth/models/user.interface';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogEntity)
    private readonly blogRepository: Repository<BlogEntity>,
  ) {}

  async create(blog: Blog, user: User): Promise<Blog> {
    blog.user = user;
    blog.date = new Date();
    blog.editDate = new Date();
    blog.isDraft = false;
    return await this.blogRepository.save(blog);
  }

  async readAll(user: User): Promise<Blog[]> {
    return await this.blogRepository.find({
      where: { user: user },
      order: { date: 'DESC' },
    });
  }

  async delete(id: number): Promise<any> {
    return await this.blogRepository.delete({ id: id });
  }

  async findOneById(id: number): Promise<User> {
    return await this.blogRepository.findOne({
      where: { id: id },
    });
  }

  async update(id: number, data): Promise<any> {
    return await this.blogRepository.update(id, data);
  }
}
