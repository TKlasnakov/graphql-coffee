import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Coffee } from '../coffee/entities/coffee.entity';
import { Flavor } from '../coffee/entities/flavor.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Resolver(() => Coffee)
export class CoffeeFlavorsResolver {
  constructor(
    @InjectRepository(Flavor)
    private readonly flavorsRepository: Repository<Flavor>,
  ) {}

  @ResolveField('flavors', () => [Flavor])
  async getFlavorsOfCoffee(@Parent() coffee: Coffee) {
    return this.flavorsRepository
      .createQueryBuilder('flavor')
      .innerJoin('flavor.coffee', 'coffee', 'coffee.id = :coffeeId', {
        coffeeId: coffee.id,
      })
      .getMany();
  }
}
