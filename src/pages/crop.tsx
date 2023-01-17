import Services from "@/apis";
import { SheepSlaughterListKeys, SlaughterType } from "@/apis/sheepSlaughter";
import { Card, Divider, InfiniteScroll, Space, Tag } from "antd-mobile";
import { useCallback, useRef, useState } from "react";
import { Helmet } from "umi";

// const statusMapColor: Record<string, TagProps["color"]> = {
//   [SheepBuyStatus.等待支付]: "default",
//   [SheepBuyStatus.等待确认]: "warning",
//   [SheepBuyStatus.已确认]: "success",
//   [SheepBuyStatus.已取消]: "danger",
// };
export default function CropPage() {
  const page = useRef<number>(1);
  const [hasMore, setHasMore] = useState(true);
  const [data, setData] = useState<SheepSlaughterListKeys[]>();
  const loadMore = useCallback(async () => {
    const res = await Services.sheepSlaughter.listMyPage({
      page: page.current,
    });
    page.current++;
    setData([...res.data.list, ...(data || [])]);
    setHasMore(res.data.current < res.data.totalPage);
  }, [data]);
  return (
    <div className="p-x p-y">
      <Helmet>
        <title>出栏记录</title>
      </Helmet>
      <ul>
        {data?.map((item) => (
          <li className="m-b" key={item.slaughterNo}>
            <Card
              title={<div>出售编号：{item.slaughterNo}</div>}
              extra={
                <>
                  {item.slaughterType === SlaughterType.羊肉 && (
                    <Tag>换肉{item.replaceSheepNum}斤</Tag>
                  )}
                  {item.slaughterType === SlaughterType.钱 && (
                    <Tag>换钱{item.slaughterPrice}元/斤</Tag>
                  )}
                </>
              }
            >
              <div>
                <Space>
                  <Tag fill="outline" color={"primary"}>
                    {item.sheepTypeCn}
                    {item.earLabel}
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
