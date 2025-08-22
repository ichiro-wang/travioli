import { Configuration, DefaultApi } from "@/api";

const BASE_URL = "/api";

export const api = new DefaultApi(
  new Configuration({
    basePath: BASE_URL,
    baseOptions: { withCredentials: true },
  })
);
