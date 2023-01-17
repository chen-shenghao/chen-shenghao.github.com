import Services from "@/apis";
import { SlaughterType } from "@/apis/sheepSlaughter";
import { rules } from "@/utils";
import { Button, Form, Input, TextArea, Toast } from "antd-mobile";
import { useCallback } from "react";
import { Helmet, history, useParams } from "umi";

export default function SellPage() {
  const params = useParams<{ id: any; type: SlaughterType }>();
  const onFinish = useCallback(
    (values: any) => {
      Services.sheepSlaughter
        .sell({ ...values, fosterNo: params.id, slaughterType: params.type })
        .then(() => {
          Toast.show({
            content: "销售成功",
            icon: "success",
          });
          history.back();
        });
    },
    [params.id, params.type]
  );
  return (
    <>
      <Helmet>
        <title>出售</title>
      </Helmet>
      <div className="p-x p-y">
        <Form
          footer={
            <Button block type="submit" color="primary" size="large">
              出售
            </Button>
          }
          mode="card"
          initialValues={{
            phone: "18838255156",
            pwd: "123456...",
          }}
          onFinish={onFinish}
        >
          <>
            {params.type === SlaughterType.钱 ? (
              <>
                <Form.Item
                  name="payee"
                  label="收款人"
                  rules={[{ required: true, message: "收款人不能为空" }]}
                >
                  <Input placeholder="请输入收款人" />
                </Form.Item>
                <Form.Item
                  name="payeeAccount"
                  label="收款账户"
                  rules={[{ required: true, message: "收款账户不能为空" }]}
                >
                  <Input placeholder="请输入收款账户" />
                </Form.Item>
                <Form.Item
                  name="payeeBank"
                  label="收款银行"
                  rules={[{ required: true, message: "收款银行不能为空" }]}
                >
                  <Input placeholder="请输入收款银行" />
                </Form.Item>
              </>
            ) : (
              <>
                <Form.Item
                  name="consignee"
                  label="收货人"
                  rules={[{ required: true, message: "收货人不能为空" }]}
                >
                  <Input placeholder="请输入收货人" />
                </Form.Item>
                <Form.Item
                  name="consigneePhone"
                  label="收货电话"
                  rules={[
                    { required: true, message: "收货电话不能为空" },
                    {
                      pattern: rules.phone,
                      message: "电话格式不正确",
                    },
                  ]}
                >
                  <Input placeholder="请输入收货电话" />
                </Form.Item>
                <Form.Item
                  name="consigneeAddress"
                  label="收货地址"
                  rules={[{ required: true, message: "收货地址不能为空" }]}
                >
                  <TextArea rows={4} placeholder="请输入收货地址" />
                </Form.Item>
              </>
            )}
          </>
        </Form>
      </div>
    </>
  );
}
