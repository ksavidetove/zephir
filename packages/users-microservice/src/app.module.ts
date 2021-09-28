import { GraphQLFederationModule, GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@users/user.module';
import { ConfigModule } from '@nestjs/config';
import coreConfig from '@core/config/core.config';
import ormConfig from '@database/ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [coreConfig],
    }),
    GraphQLFederationModule.forRoot({
      path: '/graphql-federated',
      debug: true,
      playground: true,
      introspection: true,
      typePaths: ['./**/*.{graphql,graphql.federation}'],
    }),
    GraphQLModule.forRoot({
      path: '/graphql',
      debug: true,
      playground: false,
      installSubscriptionHandlers: true,
      introspection: true,
      typePaths: ['./**/*.{graphql,graphql.normal}'],
    }),
    TypeOrmModule.forRoot(ormConfig),
    UserModule,
  ],
})
export class AppModule {}
