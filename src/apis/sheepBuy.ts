import { CONST_KEYS } from "@/const";
import { request } from "umi";
import { ApiResponse, PageData, PageParams } from ".";
import { SheepFosterSheepType } from "./sheepFoster";

const sheepBuy = {
  /** 模拟支付 */
  async analogPayment(params: {
    /** 订单号 */
    buyOrderNo: string;
    /** 支付金额 */
    buyTotalPrice: string;
    /** 第三方支付号 */
    payNo: string;
    payway: "WECHAT";
  }) {
    return request<ApiResponse>("/client/core/sheepBuy/analogPayment", {
      params,
    });
  },
  /** 买入 */
  async getMyDetail(params: {
    buyNum: number;
    sheepType: SheepFosterSheepType;
  }) {
    return request<ApiResponse<SheepBuyListKeys>>("/client/core/sheepBuy/buy", {
      method: "POST",
      data: params,
    });
  },
  /** 查询-个人认养记录-分页 */
  async listByUserPage(params: PageParams) {
    return request<ApiResponse<PageData<SheepBuyListKeys>>>(
      "/client/core/sheepBuy/listByUserPage",
      {
        params,
      }
    );
  },
  /**
   * 微信公众号支付
   */
  async wxMpPay(params: { orderNo?: string; openid?: string }) {
    return request<
      ApiResponse<{
        appId: string;
        timeStamp: number;
        nonceStr: string;
        package: string;
        signType: string;
        paySign: string;
      }>
    >(`/client/core/sheepBuy/wxMpPay/${params?.orderNo}`, {
      params: {
        openid: localStorage.getItem(CONST_KEYS.OPENID),
      },
    });
  },
  /**
   * 微信公众号支付
   */
  async detail(buyOrderNo?: string) {
    return request<ApiResponse<SheepBuyListKeys>>(
      `/client/core/sheepBuy/detail/${buyOrderNo}`
    );
  },
};

export enum SheepBuyStatus {
  等待支付 = "WAITING_PAYMENT",
  等待确认 = "WAITING_CONFIRMATION",
  已确认 = "CONFIRMED",
  已取消 = "CANCELLED",
}
export const SheepBuyStatusMap = {
  [SheepBuyStatus.等待支付]: "等待支付",
  [SheepBuyStatus.等待确认]: "等待确认",
  [SheepBuyStatus.已确认]: "已确认",
  [SheepBuyStatus.已取消]: "已取消",
};

export type SheepBuyListKeys = {
  /** 数量 */
  buyNum: number;
  /** 订单号 */
  buyOrderNo: string;
  /** 单价 */
  buyPrice: number;
  /** 总价 */
  buyTotalPrice: number;
  /** 创建者 */
  createBy: string;
  /** 创建时间 */
  createTime: string;
  /** 删除标识0未删除时间戳删除 */
  del: number;
  /** 备注 */
  memo: string;
  /** 第三方支付号 */
  payNo: string;
  /** 付款时间 */
  payTime: string;
  /** 支付方式 */
  payWay: "WECHAT";
  payWayCn: string;
  /** 羊类型 */
  sheepType: SheepFosterSheepType;
  sheepTypeCn: string;
  /** 状态 */
  status: SheepBuyStatus;
  statusCn: string;
  /** 用户 */
  uid: number;
  /** 更新者 */
  updateBy: string;
  /** 更新时间 */
  updateTime: string;
};

export { sheepBuy };
