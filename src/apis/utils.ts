import { request } from "umi";

const utils = {
  /** 上传图片 */
  async img(file: File) {
    const url = await request<string>("/oss/img", {
      method: "POST",
      data: {
        file,
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return { url };
  },
};

export { utils };
