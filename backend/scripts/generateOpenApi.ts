import {
  OpenApiGeneratorV3,
  OpenAPIRegistry,
} from "@asteasolutions/zod-to-openapi";
import { registerAuthPaths } from "./registerAuthPaths.js";
import fs from "fs";
import yaml from "yaml";
import { cwd } from "process";
import { currentDateFormatted } from "../src/utils/currentDateFormatted.js";
import { registerUsersPaths } from "./registerUsersPaths.js";

const registry = new OpenAPIRegistry();

registerAuthPaths(registry);
registerUsersPaths(registry);

/**
 * Creates an OpenAPI JSON document
 */
const getOpenApiDocumentation = () => {
  const generator = new OpenApiGeneratorV3(registry.definitions);

  const formattedDate = currentDateFormatted();

  return generator.generateDocument({
    openapi: "3.0.0",
    info: {
      title: "Backend API",
      version: "1.0.0",
      description: `This is the backend API. This doc was generated on ${formattedDate}.`,
    },
    servers: [{ url: "http://localhost:5000/api", description: "Dev server" }],
  });
};

/**
 * write the OpenAPI JSON doc as a YAML file
 */
const writeDocumentation = () => {
  // OpenAPI JSON
  const docs = getOpenApiDocumentation();

  // YAML equivalent
  const fileContent = yaml.stringify(docs);

  const fileDirectory = `${cwd()}/openapi-docs.yml`;

  fs.writeFileSync(fileDirectory, fileContent, { encoding: "utf-8" });

  console.log(`OpenAPI spec generated in ${fileDirectory}`);
};

writeDocumentation();
