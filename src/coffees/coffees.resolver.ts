import { Resolver, Query, Args, ID, Mutation } from '@nestjs/graphql';
import { Coffee } from '../coffee/entities/coffee.entity/coffee.entity';
import { ParseIntPipe } from '@nestjs/common';
import { CreateCoffeeInput } from './dto/create-coffee.input';
import { CoffeesService } from './coffees.service';

@Resolver()
export class CoffeesResolver {
  constructor(private readonly coffeeService: CoffeesService) {}

  @Query(() => [Coffee], { name: 'coffees' })
  findAll() {
    return this.coffeeService.findAll();
  }

  @Query(() => Coffee, { name: 'coffee' })
  findOne(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return this.coffeeService.findOne(id);
  }

  @Mutation(() => Coffee, { name: 'createCoffee' })
  create(@Args('createCoffeeInput') createCoffeeInput: CreateCoffeeInput) {
    return this.coffeeService.create(createCoffeeInput);
  }
}
