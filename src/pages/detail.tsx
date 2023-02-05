import Services from "@/apis";
import { List } from "antd-mobile";
import { Helmet, useParams, useRequest } from "umi";
const { Item } = List;
export default function DetailPage() {
  const params = useParams<{ id: any }>();
  const { data } = useRequest(async () =>
    Services.sheepFoster.getMyDetail({ fosterNo: params.id })
  );

  return (
    <div>
      <Helmet>
        <title>详情</title>
      </Helmet>
      <List>
        <Item extra={data?.earLabel}>羊耳号</Item>
        <Item extra={data?.sheepTypeCn}>羊类型</Item>
        <Item extra={data?.sheepVarietyName}>羊品种</Item>
        <Item extra={"￥" + data?.buyPrice}>购入价</Item>
        <Item extra={"￥" + data?.sellPrice}>出售价</Item>
        <Item extra={data?.buyDate}>购买日期</Item>
        <Item extra={data?.prodDate || "-"}>生产日期</Item>
        <Item extra={data?.outputCycle + "天"}>产出周期</Item>
        <Item extra={data?.statusCn}>当前状态</Item>
        <Item description={<div>开发中...</div>}>{"配属监控"}</Item>
      </List>
    </div>
  );
}
