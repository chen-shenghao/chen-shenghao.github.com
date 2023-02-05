import Services from "@/apis";
import { CONST_KEYS } from "@/const";
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
import { Helmet, history, useRequest } from "umi";

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
  /** 退出 */
  const onLogout = useCallback(async () => {
    Modal.confirm({
      title: "确认退出？",
      onConfirm: async () => {
        await Services.auth.logout();
        localStorage.clear();
        history.replace(CONST_KEYS.LOGIN_PAGE);
      },
    });
  }, []);
  return (
    <main className="p-x p-y">
      <Helmet>
        <title>我的</title>
      </Helmet>
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
          <div>销售回款：{numeral(data?.sellAmount).format("0,00.00")}元</div>
          <div className="text-gray">|</div>
          <div>
            置换羊肉：{numeral(data?.replaceSheepNum).format("0,00.00")}斤
          </div>
        </Space>
      </Card>

      <List
        mode="card"
        style={{
          margin: 0,
        }}
        className="m-t"
        header={<>养殖记录</>}
      >
        {/* <List.Item
          title="认养记录"
          arrow
          onClick={() => history.push("/foster")}
        ></List.Item> */}
        <List.Item
          title="出栏记录"
          arrow
          onClick={() => history.push("/crop")}
        ></List.Item>
      </List>
      <List
        mode="card"
        style={{
          margin: 0,
        }}
        className="m-t"
        header={<>设置</>}
      >
        <List.Item
          title="修改密码"
          arrow
          onClick={() => history.push("/reset")}
        ></List.Item>
        <List.Item
          title="退出登录"
          arrow
          onClick={() => onLogout()}
        ></List.Item>
      </List>
    </main>
  );
};

export default UserPage;
