module.exports = {
  apps: [
    {
      script: './dist/src/main.js',
      name: 'app',
      exec_mode: 'cluster',
      instances: 2,
      env: {
        DB_PORT: 5432,
        DB_USERNAME: 'postgres',
        DB_PASSWORD: 'secret',
        DB_DATABASE: 'postgres',
        DB_HOST: 'zefir-db',
        DB_SYNC: 'false',

        NODE_ENV: 'production',
        PORT: 4000,
        NBWORDS: 1,
      },
    },
  ],
};
