import dotenv from "dotenv";
dotenv.config();

interface EnvVariables {
    NODE_ENV: 'development' | 'test' | 'production';
    PORT: number,
    JWT_SECRET: string
}

const requiredEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is requiresd`);
  }

  return value;
};


const env: EnvVariables = {
    NODE_ENV: requiredEnv('NODE_ENV') as 'development' | 'test' | 'production',
    PORT: Number(requiredEnv('PORT')),
    JWT_SECRET: requiredEnv('JWT_SECRET')
}


export default env;