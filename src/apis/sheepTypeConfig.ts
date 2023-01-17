/**
 * @file 羊类型配置表
 */
import { request } from "umi";
import { ApiResponse, PageData, PageParams } from ".";
import { SheepFosterSheepType } from "./sheepFoster";

const sheepTypeConfig = {
  /** 查询羊类型配置 */
  async config(params: { type: SheepFosterSheepType }) {
    return request<ApiResponse<SheepTypeConfig>>(
      `/client/core/sheepTypeConfig/config/${params.type}`
    );
  },
  /** 买入 */
  async get(params: { id: string }) {
    return request<ApiResponse<SheepTypeConfig>>(
      `/client/core/sheepTypeConfig/get/${params.id}`,
      {
        method: "POST",
        data: params,
      }
    );
  },
  /** 分页查询 */
  async listPage(params: PageParams) {
    return request<ApiResponse<PageData<SheepTypeConfigListKeys>>>(
      "/client/core/sheepTypeConfig/listPage",
      {
        method: "POST",
        data: params,
      }
    );
  },
  /** 列表查询 */
  async list(params: PageParams) {
    return request<ApiResponse<SheepTypeConfigListKeys[]>>(
      "/client/core/sheepTypeConfig/list",
      {
        method: "POST",
        data: params,
      }
    );
  },
};
export type SheepTypeConfig = {
  /** 是否可购买 */
  buyIs: boolean;
  /** 购入价 */
  buyPrice: number;
  /** 创建者 */
  createBy: string;
  /** 创建时间 */
  createTime: string;
  /** 删除标识0未删除时间戳删除 */
  del: number;
  /** id */
  id: number;
  /** 产出周期（天） */
  outputCycle: number;
  /** 是否可置换羊肉 */
  replaceSheepIs: boolean;
  /** 置换羊肉数量（斤） */
  replaceSheepNum: number;
  /** 出售价 */
  sellPrice: number;
  /** 类型 */
  sheepType: SheepFosterSheepType;
  /** 更新者 */
  updateBy: string;
  /** 更新时间 */
  updateTime: string;
};

export type SheepTypeConfigListKeys = {
  /** 是否可购买 */
  buyIs: boolean;
  /** 购入价 */
  buyPrice: number;
  /** 创建者 */
  createBy: string;
  /** 创建时间 */
  createTime: string;
  /** 删除标识0未删除时间戳删除 */
  del: number;
  /** id */
  id: number;
  /** 产出周期（天） */
  outputCycle: number;
  /** 是否可置换羊肉 */
  replaceSheepIs: boolean;
  /** 置换羊肉数量（斤） */
  replaceSheepNum: number;
  /** 出售价 */
  sellPrice: number;
  /** 类型 */
  sheepType: SheepFosterSheepType;
  /** 更新者 */
  updateBy: string;
  /** 更新时间 */
  updateTime: string;
};

export { sheepTypeConfig };
