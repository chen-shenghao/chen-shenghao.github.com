import { request } from "umi";
import { ApiResponse } from ".";

const sheepStoage = {
  /** 获取当前可认养数量 */
  async getAdoptableNum() {
    return request<ApiResponse<number>>(
      "/client/core/sheepStaorage/getAdoptableNum"
    );
  },
};
export { sheepStoage };
