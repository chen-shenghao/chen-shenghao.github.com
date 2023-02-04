import Services from "@/apis";
import { SheepBuyStatus } from "@/apis/sheepBuy";

import { Button, List } from "antd-mobile";
import { useCallback } from "react";
import { Helmet, useParams, useRequest } from "umi";
import wx from "weixin-js-sdk-ts";
const { Item } = List;

export default function DetailPage() {
  const params = useParams<{ id: string }>();
  const { data } = useRequest(async () => Services.sheepBuy.detail(params.id));
  const { loading, run } = useRequest(Services.sheepBuy.wxMpPay, {
    manual: true,
  });
  const { data: wxJsConfig } = useRequest(Services.wxmp.jsapiSignature, {
    onSuccess(res) {
      wx.config({
        debug: true,
        jsApiList: ["chooseWXPay"],
        openTagList: [],
        ...res,
      });
    },
  });
  const onPay = useCallback(async () => {
    /** 下单 */
    const res = await run({
      orderNo: data?.buyOrderNo,
    });

    // Toast.show({
    //   icon: "loading",
    //   content: "请求支付…",
    //   duration: 0,
    // });
    wx.ready(() => {
      if (!wxJsConfig) {
        return;
      }
      wx.chooseWXPay({
        ...res,
        timestamp: res.timeStamp,
        success: function (res: any): void {
          console.log("success", res);
        },
      });
    });
  }, [data?.buyOrderNo, run, wxJsConfig]);

  return (
    <div>
      <Helmet>
        <title>认养记录详情</title>
      </Helmet>
      <List>
        <Item extra={data?.buyNum}>数量</Item>
        <Item extra={data?.buyOrderNo}>订单号</Item>
        <Item extra={data?.payNo}> 第三方支付号</Item>
        <Item extra={"￥" + data?.buyPrice}>单价</Item>
        <Item extra={"￥" + data?.buyTotalPrice}>总价</Item>
        <Item extra={data?.sheepTypeCn}>羊类型</Item>
        <Item extra={data?.statusCn}> 状态</Item>
        {/* <Item extra={data?.statusCn}>当前状态</Item>
        <Item description={<div>这里是监控</div>}>{"配属监控"}</Item> */}
      </List>
      <div className="m-t p-x">
        {data?.status === SheepBuyStatus.等待支付 && (
          <Button
            color="primary"
            block
            onClick={onPay}
            disabled={loading}
            loading={loading}
          >
            支付
          </Button>
        )}
      </div>
    </div>
  );
}
