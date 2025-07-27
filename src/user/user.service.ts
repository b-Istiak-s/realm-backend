import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserInput } from './dto/create-user.input';
import * as bcrypt from 'bcrypt';
import { UpdateUserInput } from './dto/update-user.input';
import type { FileUpload } from 'graphql-upload/processRequest.mjs';
import { join } from 'path';
import { createWriteStream, existsSync, mkdirSync } from 'fs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findAllWithCount({
    limit,
    offset,
  }: {
    limit: number;
    offset: number;
  }): Promise<{ users: User[]; total: number }> {
    const [users, total] = await this.userRepo.findAndCount({
      take: limit,
      skip: offset,
    });
    return { users, total };
  }

  async findOne(id: number): Promise<User | null> {
    return this.userRepo.findOneBy({ id });
  }

  async create(input: CreateUserInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(input.password, 10); // 10 = salt rounds

    const newUser = {
      username: input.username,
      name: input.name,
      email: input.email,
      password: hashedPassword,
    };

    const user = this.userRepo.create(newUser);
    return this.userRepo.save(user);
  }

  async validate(username: string, password: string): Promise<User | null> {
    const user = await this.userRepo.findOneBy({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async update(
    input: UpdateUserInput,
    image: Promise<FileUpload> | null = null,
    req?: any,
  ): Promise<User> {
    const user = await this.userRepo.findOneBy({ id: req?.userId });
    if (!user) {
      throw new Error('User not found');
    }
    if (!(await this.validate(user.username, input.oldPassword))) {
      throw new Error('Old password is incorrect');
    }

    if (image) {
      const { filename, createReadStream } = await image;

      const uploadDir = join(
        process.cwd(),
        'uploads',
        'users',
        `${user.id}`,
        'images',
      );
      if (!existsSync(uploadDir)) {
        mkdirSync(uploadDir, { recursive: true });
      }

      const filenameWithTimestamp = `${Date.now()}-${filename}`;
      const filePath = join(uploadDir, filenameWithTimestamp);
      const relativePath = `/uploads/users/${user.id}/images/${filenameWithTimestamp}`;
      const stream = createReadStream();
      const writeStream = createWriteStream(filePath);

      await new Promise<void>((resolve, reject) => {
        stream
          .pipe(writeStream)
          .on('finish', () => resolve())
          .on('error', () => reject());
      });

      // Save image path to db (relative to project root)
      user.image = relativePath;
    }

    const { password, oldPassword, ...rest } = input;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }
    user.name = input.name || user.name;
    console.log('Updating user:', user, input, password, oldPassword);

    return this.userRepo.save(user);
  }
}
