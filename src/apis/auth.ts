import { request } from "umi";
import { ApiResponse, CurrentUser } from ".";
const auth = {
  async register(params: { code: string; phone: string; pwd: string }) {
    return request("/client/registration", {
      method: "POST",
      data: params,
    });
  },
  async getCode(phone: string) {
    return request("/sms/send", {
      method: "POST",
      data: {
        phone,
        type: "CLIENT_REGISTRATION",
      },
    });
  },
  async login(params: { phone: string; pwd: string }) {
    return request<ApiResponse<{ token: string }>>("/client/login", {
      method: "POST",
      data: params,
    });
  },
  async currentUser() {
    return request<ApiResponse<CurrentUser>>("/client/getUserInfo");
  },
  async logout() {
    return request<ApiResponse>("/client/logout", { method: "POST" });
  },
  async changePwd(params: { newPwd: string; rePwd: string }) {
    return request<ApiResponse>("/client/updatePwd", {
      method: "POST",
      data: params,
    });
  },
  async updateUserInfo(params: { headImage: string; name: string }) {
    return request<ApiResponse>("/client/updateUserInfo", {
      method: "POST",
      data: params,
    });
  },
};

export { auth };
