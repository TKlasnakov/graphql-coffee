import { Injectable } from '@nestjs/common';
import { CreateCoffeeInput } from './dto/create-coffee.input';

@Injectable()
export class CoffeesService {
  findAll() {
    return [];
  }

  findOne(id) {
    return null;
  }

  create(createCoffeeInput: CreateCoffeeInput) {
    return null;
  }
}
