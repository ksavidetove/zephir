#/bin/bash
npm run migrate:up:prod
pm2 start ecosystem.config.js