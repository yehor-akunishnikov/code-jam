import { Test, TestingModule } from '@nestjs/testing';
import { SearchUtilsService } from './search-utils.service';

describe('SearchUtilsService', () => {
  let service: SearchUtilsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SearchUtilsService],
    }).compile();

    service = module.get<SearchUtilsService>(SearchUtilsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
