import * as dotenv from 'dotenv';
dotenv.config();

export type ConfigType = {
  PORT: number;
  DB_URL: string;
  ACCESS_SECRET: string;
  ACCESS_TIME: string;
  REFRESH_SECRET: string;
  REFRESH_TIME: string;
  USER_EMAIL: string;
  APP_PASSWORD: string;
};

const requiredVariables = [
  'PORT',
  'DB_URL',
  'ACCESS_SECRET',
  'ACCESS_TIME',
  'REFRESH_SECRET',
  'REFRESH_TIME',
  'APP_PASSWORD',
  'USER_EMAIL',
];

const missingVariables = requiredVariables.filter((variable) => {
  const value = process.env[variable];
  return !value || value.trim() === '';
});

if (missingVariables.length > 0) {
  console.error(`Missing environment variables`);
  process.exit(1);
}

export const config: ConfigType = {
  PORT: +process.env.PORT,
  DB_URL: process.env.DB_URL,
  ACCESS_SECRET: process.env.ACCESS_SECRET,
  ACCESS_TIME: process.env.ACCESS_TIME,
  REFRESH_SECRET: process.env.REFRESH_SECRET,
  REFRESH_TIME: process.env.REFRESH_TIME,
  USER_EMAIL: process.env.USER_EMAIL,
  APP_PASSWORD: process.env.APP_PASSWORD,
};
