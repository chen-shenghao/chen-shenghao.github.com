import Services from "@/apis";
import { SheepBuyListKeys, SheepBuyStatus } from "@/apis/sheepBuy";
import { InfiniteScrollContent } from "@/components/InfiniteScrollContent";
import {
  Button,
  Card,
  Divider,
  Form,
  InfiniteScroll,
  Input,
  Modal,
  Radio,
  Slider,
  Space,
  Tag,
  TagProps,
  Toast,
} from "antd-mobile";
import numeral from "numeral";
import { useCallback, useRef, useState } from "react";
import { Helmet, history, useRequest } from "umi";

const statusMapColor: Record<string, TagProps["color"]> = {
  [SheepBuyStatus.等待支付]: "default",
  [SheepBuyStatus.等待确认]: "warning",
  [SheepBuyStatus.已确认]: "success",
  [SheepBuyStatus.已取消]: "danger",
};

const marks = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
};
export default function FosterPage() {
  const [form] = Form.useForm();

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
  // 获取可认养羊只数
  const { data: adoptableNum } = useRequest(
    Services.sheepStoage.getAdoptableNum
  );
  // 获取羊配置表
  const { data: sheepTypeList } = useRequest(Services.sheepTypeConfig.list);

  /** 买羊 */
  const onBuy = useCallback(() => {
    form.resetFields();
    Modal.confirm({
      title: "买羊",
      destroyOnClose: false,
      forceRender: true,
      content: (
        <>
          <Form
            form={form}
            onValuesChange={(values) => {
              if (values.sheepType) {
                const buyPrice = sheepTypeList?.find(
                  (item) => item.sheepType === values.sheepType
                )?.buyPrice;
                form.setFieldsValue({
                  buyPrice: buyPrice,
                });
              }

              if (
                form.getFieldValue("buyNum") &&
                form.getFieldValue("buyPrice")
              ) {
                try {
                  form.setFieldsValue({
                    buyTotalPrice:
                      +form.getFieldValue("buyNum") *
                      +form.getFieldValue("buyPrice"),
                  });
                } catch (error) {
                  form.setFieldsValue({
                    buyNum: undefined,
                  });
                }
              }
            }}
            initialValues={{
              buyNum: 1,
            }}
          >
            <Form.Item
              name={"sheepType"}
              label="羊类型"
              rules={[{ required: true, message: "请选择羊类型" }]}
            >
              <Radio.Group>
                {sheepTypeList
                  ?.filter((buyIs) => buyIs.buyIs)
                  .map((item) => (
                    <Radio
                      key={item.id}
                      style={{ marginRight: 6 }}
                      value={item.sheepType}
                    >
                      {item.sheepTypeCn}（￥{item.buyPrice}/只）
                    </Radio>
                  ))}
              </Radio.Group>
            </Form.Item>
            <Form.Item
              hidden
              name={"buyPrice"}
              label="单价"
              rules={[{ required: true, message: "请输入单价" }]}
            >
              <Input type={"number"} placeholder="请输入单价" />
            </Form.Item>
            <Form.Item
              name={"buyNum"}
              label="购入数量"
              rules={[{ required: true, message: "请选择数量" }]}
            >
              <Slider marks={marks} step={1} min={1} max={10} value={40} />
            </Form.Item>
            <Form.Item name={"buyTotalPrice"} label="总额（元）">
              <Input type={"number"} readOnly placeholder="待计算" />
            </Form.Item>
          </Form>
        </>
      ),
      confirmText: "确认",
      onConfirm: async () => {
        const validate = await form.validateFields();
        const res = await Services.sheepBuy.getMyDetail(validate);
        Toast.show({
          icon: "success",
          content: "提交成功",
        });
        history.push("/foster/" + res.data.buyOrderNo);
      },
    });
  }, [form, sheepTypeList]);

  return (
    <div className="p-x p-y">
      <Helmet>
        <title>买羊</title>
      </Helmet>
      <Card
      // style={{
      //   position: "sticky",
      //   top: 16,
      //   zIndex: 2,
      // }}
      >
        <div className="d-flex items-center space-between">
          <div>繁育母羊剩余</div>
          <div>{adoptableNum || 0}只</div>
        </div>
      </Card>
      {/* <div className="d-flex items-center space-between">
        <div>繁育母羊剩余</div>
        <div>{adoptableNum || 0}只</div>
      </div> */}
      <ul className="m-t">
        {data?.map((item) => (
          <li
            className="m-b"
            key={item.buyOrderNo}
            onClick={() => history.push("/foster/" + item.buyOrderNo)}
          >
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
                    ￥{numeral(item.buyTotalPrice).format("0,00.00")}
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

      <InfiniteScroll
        style={{
          paddingBottom: 56,
        }}
        loadMore={loadMore}
        hasMore={hasMore}
      >
        <InfiniteScrollContent dataLen={data?.length} />
      </InfiniteScroll>
      <footer
        className="p-x"
        style={{
          position: "absolute",
          bottom: 66,
          left: 0,
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <Button
          color="primary"
          block
          onClick={() => {
            onBuy();
          }}
        >
          买羊
        </Button>
      </footer>
    </div>
  );
}
