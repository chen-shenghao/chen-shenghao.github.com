import Services from "@/apis";
import {
  Avatar,
  Card,
  Divider,
  Form,
  ImageUploader,
  Input,
  List,
  Modal,
  Space,
  Toast,
} from "antd-mobile";
import numeral from "numeral";
import { useCallback } from "react";
import { history, useRequest } from "umi";

const UserPage = () => {
  const [form] = Form.useForm();
  const { data, run } = useRequest(Services.auth.currentUser, {
    cacheKey: "Services.auth.currentUser",
  });
  /** 更新个人信息 */
  const onUpdateUserInfo = useCallback(() => {
    Modal.confirm({
      title: "更新个人信息",
      destroyOnClose: false,
      forceRender: true,
      content: (
        <>
          <Form mode="card" form={form} layout="horizontal">
            <Form.Item
              noStyle
              name="headImageArr"
              rules={[{ required: true, message: "请上传头像" }]}
            >
              <ImageUploader
                style={{ justifyContent: "center", display: "flex" }}
                upload={Services.utils.img}
                maxCount={1}
              ></ImageUploader>
            </Form.Item>
            <Form.Item
              style={{
                "--prefix-width": "5em",
              }}
              name={"name"}
              label="姓名"
              rules={[{ required: true, message: "请输入姓名" }]}
            >
              <Input placeholder="请输入姓名" />
            </Form.Item>
          </Form>
        </>
      ),
      confirmText: "确认",
      onConfirm: async () => {
        const res = await form.validateFields();
        await Services.auth.updateUserInfo({
          name: res.name,
          headImage: res.headImageArr[0].url,
        });
        Toast.show({
          icon: "success",
          content: "提交成功",
        });
        run();
      },
    });
    form.setFieldsValue({
      name: data?.name,
      headImageArr: [{ url: data?.headImage }],
    });
  }, [data?.headImage, data?.name, form, run]);
  return (
    <main className="p-x p-y">
      <Card>
        <Space
          align="center"
          justify="start"
          onClick={() => {
            onUpdateUserInfo();
          }}
        >
          <Avatar
            style={{
              "--border-radius": "50%",
            }}
            src={data?.headImage || ""}
          />
          <div>{data?.name}</div>
        </Space>
        <Divider />
        <Space className="w-full" justify="between">
          <div>销售回款：{numeral(data?.sellAmount).format("0,00")}元</div>
          <div className="text-gray">|</div>
          <div>置换羊肉：{numeral(data?.replaceSheepNum).format("0,00")}斤</div>
        </Space>
      </Card>

      <List
        mode="card"
        style={{
          margin: 0,
        }}
        className="m-t"
      >
        <List.Item
          title="认养记录"
          arrow
          onClick={() => history.push("/foster")}
        ></List.Item>
        <List.Item
          title="出栏记录"
          arrow
          onClick={() => history.push("/crop")}
        ></List.Item>
      </List>
    </main>
  );
};

export default UserPage;
