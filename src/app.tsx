// import { defineApp } from "umi";
// export default defineApp({
//   rootContainer(lastRootContainer) {
//     return <div id="sifon">{lastRootContainer}</div>;
//   }
// });
import { Modal, Toast } from "antd-mobile";
import { AxiosError, history, RequestConfig } from "umi";
import { AxiosRequestConfig } from "./.umi/plugin-request/request";
import { ApiResponse } from "./apis";
import { CONST_KEYS } from "./const";
import { getLocalStorage } from "./utils/storage";

export const request: RequestConfig = {
  baseURL: "http://spfapi.lianglianwang.com",
  // baseURL: "http://sheep.gitliuyi.top",
  errorConfig: {},
  responseInterceptors: [
    [
      (response) => response,
      (error: any) => {
        const { response } = (error as AxiosError) || {};

        const { data, status } = response || {};
        if (status === 401) {
          history.replace(CONST_KEYS.LOGIN_PAGE);
          return Promise.reject(data);
        }
        const { msg, success, showLevel } = data as ApiResponse;
        if (!success) {
          if (showLevel === "ERROR") {
            Toast.show({
              icon: "fail",
              content: msg,
            });
          }
          if (showLevel === "NOTIFICATION") {
            Modal.alert({
              title: "提示",
              content: msg,
            });
          }

          return Promise.reject(data);
        }
        return Promise.reject(data);
      },
    ],
  ],
  requestInterceptors: [
    (config: AxiosRequestConfig) => {
      config.headers = {
        ...config.headers,
        Authorization: "UUID " + getLocalStorage(CONST_KEYS.TOKEN, ""),
      };
      return config;
    },
  ],
};
