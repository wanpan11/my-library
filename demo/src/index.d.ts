import "@wanp/use-swr-data";

declare module "@wanp/use-swr-data" {
  export interface UseSwrDataError {
    message: string;
    code?: number;
  }
}
