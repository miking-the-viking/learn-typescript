import { Test, TestingModule } from '@nestjs/testing';
import { BlogService } from './blog.service';

describe('BlogService', () => {
  let service: BlogService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlogService],
    }).compile();
    service = module.get<BlogService>(BlogService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should retrieve blogs', async () => {
    expect(service.getBlogs()).resolves.toBeInstanceOf(Array);
  });
  it('should add a Blog', async () => {
    const originalArray = await service.getBlogs();
    const originalLength = originalArray.length;
    const payload = { title: 'test title', body: 'some body' };
    const record = await service.addBlog(payload);
    expect(record).toHaveProperty('id');
    expect(record).toHaveProperty('createdAt');
    expect(record).toHaveProperty('updatedAt');
    const newArray = await service.getBlogs();
    expect(newArray).toHaveLength(originalLength + 1);
    expect(newArray[newArray.length - 1]).toMatchObject(payload);
  });
});
