import type { UseSwrDataError } from "../src/interface";
import { describe, expect, it } from "vitest";

declare module "../src/interface" {
  export interface UseSwrDataError {
    message?: string;
    code?: number;
  }
}

// 测试用例：验证 UseSwrDataError 类型覆写
describe("useSwrDataError Type Override", () => {
  // 测试1：验证基本的类型覆写
  it("should override UseSwrDataError with custom properties", () => {
    const customError: UseSwrDataError = {
      message: "Network request failed",
      code: 500,
    };

    expect(customError.message).toBe("Network request failed");
    expect(customError.code).toBe(500);
  });

  // 测试3：验证类型检查
  it("should validate property types", () => {
    const error: UseSwrDataError = {
      message: "Error message",
      code: 500,
    };

    expect(typeof error.message).toBe("string");
    expect(typeof error.code).toBe("number");
  });
});
