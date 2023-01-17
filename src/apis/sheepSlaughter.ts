/**
 * @file 出栏表
 */
import { request } from "umi";
import { ApiResponse, PageData, PageParams } from ".";
import { SheepFosterSheepType } from "./sheepFoster";

const sheepSlaughter = {
  /** 出售 */
  async sell(params: {
    /** 收货人 */
    consignee: string;
    /** 收货地址 */
    consigneeAddress: string;
    /** 收货电话 */
    consigneePhone: string;
    /** 认养记 */
    fosterNo: string;
    /** 收款人 */
    payee: string;
    /** 收款账户 */
    payeeAccount: string;
    /** 收款银行 */
    payeeBank: string;
    /** 	出售方式（羊肉，钱） */
    slaughterType: SlaughterType;
  }) {
    return request<ApiResponse>("/client/core/sheepSlaughter/sell", {
      method: "POST",
      data: params,
    });
  },
  /** 查询-我的出栏-分页 */
  async listMyPage(params: PageParams) {
    return request<ApiResponse<PageData<SheepSlaughterListKeys>>>(
      "/client/core/sheepSlaughter/listMyPage",
      {
        params,
      }
    );
  },
};

export enum SlaughterType {
  羊肉 = "MUTTON",
  钱 = "MONEY",
}
export const SlaughterTypeMap = {
  [SlaughterType.羊肉]: "羊肉",
  [SlaughterType.钱]: "钱",
};

export type SheepSlaughterListKeys = {
  /** 收货人 */
  consignee: string;
  /** 收货地址 */
  consigneeAddress: string;
  /** 收货电话 */
  consigneePhone: string;
  /** 创建者 */
  createBy: string;
  /** 创建时间 */
  createTime: string;
  /** 删除标识0未删除时间戳删除 */
  del: number;
  /** 耳标号 */
  earLabel: string;
  /** 是否处理 */
  execIs: boolean;
  /** 认养记录 */
  fosterNo: string;
  /** 收款人 */
  payee: string;
  /** 收款账户 */
  payeeAccount: string;
  /** 收款银行 */
  payeeBank: string;
  /** 置换羊肉（斤） */
  replaceSheepNum: number;
  /** 羊类型 */
  sheepType: SheepFosterSheepType;
  sheepTypeCn: string;
  /** 羊品种 */
  sheepVariety: string;
  /** 羊品种名称 */
  sheepVarietyName: string;
  /** 出售编号 */
  slaughterNo: string;
  /** 出售价格 */
  slaughterPrice: number;
  /** 出售方式 */
  slaughterType: SlaughterType;
  /** 用户 */
  uid: number;
  /** 更新者 */
  updateBy: string;
  /** 更新时间 */
  updateTime: string;
  /** 用户姓名 */
  userName: string;
};

export { sheepSlaughter };
