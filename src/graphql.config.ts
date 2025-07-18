import { join } from 'path';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLError, GraphQLFormattedError } from 'graphql';

export const graphqlConfig: ApolloDriverConfig = {
  driver: require('@nestjs/apollo').ApolloDriver,
  autoSchemaFile: join(process.cwd(), 'src/schema.gql'),

  formatError: (error: GraphQLError): GraphQLFormattedError => {
    const originalError = error.originalError as any;

    let message = error.message || 'Internal server error';
    let statusCode = 500;

    if (originalError?.statusCode) {
      statusCode = originalError.statusCode;
      message = originalError.message;
    } else if (originalError instanceof Error) {
      message = originalError.message;
    }

    return {
      message,
      extensions: {
        statusCode,
      },
    };
  },
};
