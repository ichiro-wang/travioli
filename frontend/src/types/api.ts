import type { ErrorResponseMessage } from "@/api";
import type { AxiosError } from "axios";

export type ApiError = AxiosError<ErrorResponseMessage>;
