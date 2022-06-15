declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      APP_HOSTNAME: string;
      APP_URL: string;
      NODE_ENV: "development" | "production";
      JWT_SECRET: string;
      JWT_ADMIN: string;
      JWT_SUPER: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
