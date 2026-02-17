import { Resolver, Query } from '@nestjs/graphql';
import { Coffee } from '../coffee/entities/coffee.entity/coffee.entity';

@Resolver()
export class CoffeesResolver {
  @Query(() => [Coffee], { name: 'coffees' })
  async findAll() {
    return [];
  }
}
