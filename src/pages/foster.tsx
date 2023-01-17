import Services from "@/apis";
import { SheepBuyListKeys, SheepBuyStatus } from "@/apis/sheepBuy";
import {
  Card,
  Divider,
  InfiniteScroll,
  Space,
  Tag,
  TagProps,
} from "antd-mobile";
import numeral from "numeral";
import { useCallback, useRef, useState } from "react";
import { Helmet } from "umi";

const statusMapColor: Record<string, TagProps["color"]> = {
  [SheepBuyStatus.等待支付]: "default",
  [SheepBuyStatus.等待确认]: "warning",
  [SheepBuyStatus.已确认]: "success",
  [SheepBuyStatus.已取消]: "danger",
};
export default function FosterPage() {
  const page = useRef<number>(1);
  const [hasMore, setHasMore] = useState(true);
  const [data, setData] = useState<SheepBuyListKeys[]>();
  const loadMore = useCallback(async () => {
    const res = await Services.sheepBuy.listByUserPage({
      page: page.current,
    });
    page.current++;
    setData([...res.data.list, ...(data || [])]);
    setHasMore(res.data.current < res.data.totalPage);
  }, [data]);
  return (
    <div className="p-x p-y">
      <Helmet>
        <title>认养记录</title>
      </Helmet>
      <ul>
        {data?.map((item) => (
          <li className="m-b" key={item.buyOrderNo}>
            <Card
              title={<div>订单号：{item.buyOrderNo}</div>}
              extra={
                <Tag color={statusMapColor[item.status]}>{item.statusCn}</Tag>
              }
            >
              <div>
                <Space>
                  <Tag fill="outline">{item.sheepTypeCn}</Tag>
                  <Tag fill="outline" color={"primary"}>
                    {item.buyNum}只
                  </Tag>
                  <Tag fill="outline" color={"danger"}>
                    ￥{numeral(item.buyTotalPrice).format("0,00")}
                  </Tag>
                </Space>
              </div>
              <Divider />
              <Space justify="between" className="w-full">
                <div className="text-gray">{item.createTime}</div>
              </Space>
            </Card>
          </li>
        ))}
      </ul>

      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
    </div>
  );
}
