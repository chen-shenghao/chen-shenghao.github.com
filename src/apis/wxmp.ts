import { request } from "umi";
import { ApiResponse } from ".";

const wxmp = {
  /** 获取当前可认养数量 */
  async jsapiSignature() {
    return request<
      ApiResponse<{
        appId: string;
        nonceStr: string;
        signature: string;
        timestamp: number;
        url: string;
      }>
    >("/client/wxmp/jsapiSignature", {
      params: { url: location.href },
    });
  },
  async getOpenid(code: string) {
    return request<ApiResponse<string>>("/client/wxmp/getOpenid", {
      params: { code },
    });
  },
};
export { wxmp };
