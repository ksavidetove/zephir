import { GraphQLGatewayModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import coreConfig from './core/config/core.config';
import { ConfigModule, ConfigType } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [coreConfig],
    }),
    GraphQLGatewayModule.forRootAsync({
      imports: [ConfigModule],
      inject: [coreConfig.KEY],
      useFactory: async (config: ConfigType<typeof coreConfig>) => ({
        gateway: {
          serviceList: [
            {
              name: 'users',
              url: `${config.usersUri}/graphql-federated`,
            },
          ],
          debug: true,
          serviceHealthCheck: true,
        },
      }),
    }),
  ],
})
export class AppModule {}
