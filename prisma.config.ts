import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  // optional but good to be explicit:
  // schema: './prisma/schema.prisma',

  datasource: {
    url: env('DATABASE_URL'),
  },
});