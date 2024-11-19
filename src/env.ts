import type z from "https://deno.land/x/zod@v3.23.8/index.ts";
import * as zod from "https://deno.land/x/zod@v3.23.8/mod.ts";

export const envSchema = zod.object({
  PORT: zod.number(),
  REDIRECT_URI: zod.string(),
  GITHUB_CLIENT_ID: zod.string(),
  GITHUB_CLIENT_SECRET: zod.string(),
});

declare global {
  namespace Deno {
    export interface Env extends z.infer<typeof envSchema> {}
  }
}

export function LoadEnv() {
  //! check it --allow-env is enabled and --env-file is set
  if (Deno.env.get("PORT") === undefined) {
    throw new Error(
      "Check your deno.json file or update the dev command to enable reading from the environment , or pass the --allow-env flag + --env-file flag correctly",
    );
  }
  const env = {
    PORT: Deno.env.get("PORT"),
    REDIRECT_URI: Deno.env.get("REDIRECT_URI"),
    GITHUB_CLIENT_ID: Deno.env.get("GITHUB_CLIENT_ID"),
    GITHUB_CLIENT_SECRET: Deno.env.get("GITHUB_CLIENT_SECRET"),
  };

  const checkedEnv = envSchema.safeParse(env);
  if (checkedEnv.success === false) {
    throw new Error("Invalid environment variable types , confirm them in the env.ts file");
  }

  Deno.env.PORT = checkedEnv.data.PORT;
  Deno.env.REDIRECT_URI = checkedEnv.data.REDIRECT_URI;
  Deno.env.GITHUB_CLIENT_ID = checkedEnv.data.GITHUB_CLIENT_ID;
  Deno.env.GITHUB_CLIENT_SECRET = checkedEnv.data.GITHUB_CLIENT_SECRET;
}


