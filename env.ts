import {z} from "zod"
const envSchema = z.object({
  REDIS_TOKEN: z.string().nonempty(),
  DATABASE_HOST:z.string().nonempty(),
  DATABASE_USERNAME:z.string().nonempty(),
  DATABASE_PASSWORD:z.string().nonempty(),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});
const env = envSchema.parse(process.env);

export default env