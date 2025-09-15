import { Configuration, DefaultApi } from "@/api";

export const api = new DefaultApi(
  new Configuration({
    basePath: "http://localhost/api",
    baseOptions: { withCredentials: true },
  })
);
