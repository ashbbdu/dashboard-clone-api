import { Test, TestingModule } from '@nestjs/testing';
import { QuoteController } from './quote.controller';

describe('QuoteController', () => {
  let controller: QuoteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuoteController],
    }).compile();

    controller = module.get<QuoteController>(QuoteController);
  });

  // will work on testing part
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
