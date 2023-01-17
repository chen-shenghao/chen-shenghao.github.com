/**
 * @file 加盟记录
 */
import { request } from "umi";
import { ApiResponse } from ".";

const league = {
  /** 获取个人登记信息 */
  async getUserLeague() {
    return request<ApiResponse<LeagueKeys>>(
      "/client/core/league/getUserLeague"
    );
  },
  /** 新增或修改 */
  async saveOrUpdate(
    params: Pick<
      LeagueKeys,
      | "culturedVariety"
      | "identityFront"
      | "identityReverse"
      | "linkPhone"
      | "maxLivestock"
      | "nowLivestock"
      | "sheepAddress"
      | "sheepFarmer"
      | "sheepName"
      | "sitePhoto"
    >
  ) {
    return request<ApiResponse>("/client/core/league/saveOrUpdate", {
      method: "POST",
      data: params,
    });
  },
};

export type LeagueKeys = {
  /** 创建者 */
  createBy: string;
  /** 创建时间 */
  createTime: string;
  /** 养殖品种 */
  culturedVariety: string;
  /** 删除标识0未删除时间戳删除 */
  del: number;
  /** id */
  id: number;
  /** 身份证-正面 */
  identityFront: string;
  /** 身份证-反面 */
  identityReverse: string;
  /** 联系电话 */
  linkPhone: string;
  /** 最大存栏 */
  maxLivestock: string;
  /** 现有存栏 */
  nowLivestock: string;
  /** 羊场地址 */
  sheepAddress: string;
  /** 羊场主 */
  sheepFarmer: string;
  /** 羊场名称 */
  sheepName: string;
  /** 场地照片（多个,分割） */
  sitePhoto: string;
  sitePhotoList: string[];
  /** 用户 */
  uid: number;
  /** 更新者 */
  updateBy: string;
  /** 更新时间 */
  updateTime: string;
};

export { league };
