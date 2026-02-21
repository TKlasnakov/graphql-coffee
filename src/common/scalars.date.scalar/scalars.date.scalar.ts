import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('Date', () => Date)
export class ScalarsDateScalar implements CustomScalar<number, Date> {
  description: 'Custom date scalar';

  parseValue(value: Date): Date {
    return new Date(value);
  }

  serialize(value: Date): number {
    console.log(`Serialising: ${value.toDateString()}`);
    return value.getTime();
  }

  parseLiteral(ast: ValueNode): Date {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }

    return new Date();
  }
}
