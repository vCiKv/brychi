import { z } from "zod";
const envSchema = z.object({
  DATABASE_HOST: z.string().nonempty(),
  DATABASE_USERNAME: z.string().nonempty(),
  DATABASE_PASSWORD: z.string().nonempty(),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().nonempty(),
  CLERK_SECRET_KEY: z.string().nonempty(),
});
const env = envSchema.parse(process.env);
export default env;
