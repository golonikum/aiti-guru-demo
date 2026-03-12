import type { ApiError } from "./types";

export const isApiError = (err: unknown): err is ApiError => {
  return !!err && typeof err === "object" && "response" in err;
};
