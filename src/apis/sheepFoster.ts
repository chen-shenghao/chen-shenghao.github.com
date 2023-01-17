import { request } from "umi";
import { ApiResponse, PageData, PageParams } from ".";

const sheepFoster = {
  /** 统计-我的在养数量 */
  async statisticsMyNum() {
    return request<
      ApiResponse<{
        BREEDING_EWES: number;
        FATTENING_SHEEP: number;
        LAMB: number;
      }>
    >("/client/core/sheepFoster/statisticsMyNum", {});
  },
  /** 查询-我的羊详情 */
  async getMyDetail(params: { fosterNo: string }) {
    return request<ApiResponse<SheepFosterListKeys>>(
      `/client/core/sheepFoster/getMyDetail/${params.fosterNo}`,
      {
        params,
      }
    );
  },
  /** 查询-我的羊-分页 */
  async listMyPage(
    params: PageParams<{
      sheepType?: SheepFosterSheepType;
      status?: SheepFosterStatus | undefined;
    }>
  ) {
    return request<ApiResponse<PageData<SheepFosterListKeys>>>(
      "/client/core/sheepFoster/listMyPage",
      {
        params,
      }
    );
  },
};

export enum SheepFosterSheepType {
  育肥羊 = "FATTENING_SHEEP",
  繁育母羊 = "BREEDING_EWES",
  羊羔 = "LAMB",
}
export const SheepFosterSheepTypeMap = {
  [SheepFosterSheepType.育肥羊]: "育肥羊",
  [SheepFosterSheepType.繁育母羊]: "繁育母羊",
  [SheepFosterSheepType.羊羔]: "羊羔",
};
export enum SheepFosterStatus {
  在养 = "IN_RAISING",
  已出售 = "SOLD",
}

export type SheepFosterListKeys = {
  /** 购买日期 */
  buyDate: string;
  /** 购入价 */
  buyPrice: number;
  /** 创建者 */
  createBy: string;
  /** 创建时间 */
  createTime: string;
  /** 删除标识0未删除时间戳删除 */
  del: number;
  /** 耳标号 */
  earLabel: string;
  /** 认养编号 */
  fosterNo: string;
  /** 距离产羔天数 */
  lambingDay: number;
  /** 购买订单号 */
  orderNo: string;
  /** 距离出栏天数 */
  outDay: number;
  /** 产出周期（天） */
  outputCycle: number;
  /** 胎次 */
  parityNum: number;
  /** 生产日期 */
  prodDate: string;
  /** 是否可出售 */
  sellIs: boolean;
  /** 出售价 */
  sellPrice: number;
  /** 羊类型, */
  sheepType: SheepFosterSheepType;
  sheepTypeCn: string;
  /** 羊品种 */
  sheepVariety: string;
  /** 羊品种名称 */
  sheepVarietyName: string;
  /** 出栏日期 */
  slaughterDate: string;
  /** 当前状态 */
  status: SheepFosterStatus;
  statusCn: string;
  /** 会员id */
  uid: number;
  /** 更新者 */
  updateBy: string;
  /** 更新时间 */
  updateTime: string;
};

export { sheepFoster };
