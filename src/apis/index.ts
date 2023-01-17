import { auth } from "./auth";
import { league } from "./league";
import { sheepBuy } from "./sheepBuy";
import { sheepFoster } from "./sheepFoster";
import { sheepSlaughter } from "./sheepSlaughter";
import { sheepTypeConfig } from "./sheepTypeConfig";
import { utils } from "./utils";
const Services = {
  auth,
  /** 加盟表 */
  league,
  sheepFoster,
  sheepBuy,
  sheepSlaughter,
  sheepTypeConfig,
  utils,
};

export default Services;
export type ApiResponse<T = any> = {
  code: string;
  data: T;
  msg: string;
  showLevel: "ERROR" | "NOTIFICATION" | "PAGE" | "SILENT" | "WARN";
  success: boolean;
};

export type CurrentUser = {
  /** 创建者 */
  createBy: string;
  /** 创建时间 */
  createTime: string;
  /** 删除标识0未删除时间戳删除 */
  del: number;
  /** 头像 */
  headImage: string;
  /** id */
  id: number;
  /** 登陆号 */
  loginNo: string;
  /** 姓名 */
  name: string;
  /** 手机号 */
  phone: string;
  /** 密码 */
  pwd: string;
  /** 密码盐 */
  pwdSalt: string;
  /** 更新者 */
  updateBy: string;
  /** 更新时间 */
  updateTime: string;
  /** 置换羊肉 */
  replaceSheepNum: number;
  /** 销售回款 */
  sellAmount: number;
};

export type PageData<T> = {
  /** 当前页数 */
  current: number;
  /** array */
  list: T[];
  /** 一页显示数 */
  pageSize: number;
  /** 总记录数 */
  total: number;
  /** 总页数 */
  totalPage: number;
};

export type PageParams<T extends Record<string, any> = any> = {
  page: number;
  limit?: number;
} & T;
