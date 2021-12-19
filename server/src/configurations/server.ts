import setEnvironment from "./setEnvironment.js";

setEnvironment();

export interface ServerConfig {
  port: number;
  websiteUrl: string;
}

const config: ServerConfig = {
  port: parseInt(process.env["SERVER_PORT"] as string, 10),
  websiteUrl: process.env["WEBSITE_URL"] as string,
};

export default config;
