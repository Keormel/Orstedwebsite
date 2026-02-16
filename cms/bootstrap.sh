#!/bin/sh
set -eu

if [ ! -f package.json ]; then
  echo "Initializing Strapi app..."
  npx create-strapi@latest . \
    --ts \
    --use-npm \
    --dbclient=postgres \
    --dbhost="${DATABASE_HOST}" \
    --dbport="${DATABASE_PORT}" \
    --dbname="${DATABASE_NAME}" \
    --dbusername="${DATABASE_USERNAME}" \
    --dbpassword="${DATABASE_PASSWORD}" \
    --dbssl=false \
    --no-run \
    --skip-cloud \
    --non-interactive
  npm install pg
fi

echo "Starting Strapi..."
npm run develop
