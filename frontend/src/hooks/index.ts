import { Configuration, DefaultApi } from "@/api";

export const api = new DefaultApi(
  new Configuration({
    basePath: "/api",
    baseOptions: { withCredentials: true },
  })
);
