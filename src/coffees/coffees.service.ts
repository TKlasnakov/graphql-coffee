import { Injectable } from '@nestjs/common';
import { CreateCoffeeInput } from './dto/create-coffee.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Coffee } from '../coffee/entities/coffee.entity';
import { Repository } from 'typeorm';
import { UserInputError } from 'apollo-server-express';
import { UpdateCoffeeInput } from './dto/update-coffee.input';
import { Flavor } from 'src/coffee/entities/flavor.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
  ) {}

  findAll() {
    return this.coffeeRepository.find();
  }

  async findOne(id: number) {
    const coffee = await this.coffeeRepository.findOne({ where: { id } });

    if (!coffee) throw new UserInputError(`Coffe with ${id} does not exist`);

    return coffee;
  }

  async create(createCoffeeInput: CreateCoffeeInput) {
    const flavors = await Promise.all(
      createCoffeeInput.flavors.map((flavor) => this.flavor(flavor)),
    );

    const coffee = this.coffeeRepository.create({
      ...createCoffeeInput,
      flavors,
    });

    return flavors && this.coffeeRepository.save(coffee);
  }

  async update(id: number, updateCoffeeInput: UpdateCoffeeInput) {
    const flavors =
      updateCoffeeInput.flavors &&
      (await Promise.all(
        updateCoffeeInput.flavors.map((flavor) => this.flavor(flavor)),
      ));

    const coffee = await this.coffeeRepository.preload({
      id,
      ...updateCoffeeInput,
      flavors,
    });

    if (!coffee) throw new UserInputError(`Coffee #${id} does not exist`);

    return this.coffeeRepository.save(coffee);
  }

  async remove(id: number) {
    const coffee = await this.findOne(id);
    return this.coffeeRepository.remove(coffee);
  }

  async flavor(name: string) {
    const existingFlavor = await this.flavorRepository.findOne({
      where: { name },
    });

    if (existingFlavor) {
      return existingFlavor;
    }

    return this.flavorRepository.create({ name });
  }
}
