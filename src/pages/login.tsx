import Services from "@/apis";
import { CONST_KEYS } from "@/const";
import { setLocalStorage } from "@/utils/storage";
import { AutoCenter, Button, Form, Input, Toast } from "antd-mobile";
import { useCallback } from "react";
import { Helmet, history } from "umi";
export default function Login() {
  const onFinish = useCallback((values: any) => {
    Services.auth.login(values).then((res) => {
      setLocalStorage(CONST_KEYS.TOKEN, res.data.token);
      Toast.show({
        content: "登录成功",
        icon: "success",
      });
      history.push("/");
    });
  }, []);
  return (
    <div style={{ paddingTop: 100 }}>
      <Helmet>
        <title>登录</title>
      </Helmet>
      <main>
        <AutoCenter>
          <h1>登录</h1>
        </AutoCenter>
        <section>
          <Form
            layout="horizontal"
            footer={
              <Button block type="submit" color="primary" size="large">
                登录
              </Button>
            }
            mode="card"
            initialValues={{
              phone: "18838255156",
              pwd: "123456...",
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="phone"
              label="手机号"
              rules={[{ required: true, message: "手机号不能为空" }]}
            >
              <Input placeholder="请输入手机号" />
            </Form.Item>
            <Form.Item
              name="pwd"
              label="密码"
              rules={[{ required: true, message: "密码不能为空" }]}
            >
              <Input type={"password"} placeholder="请输入密码" />
            </Form.Item>
          </Form>
        </section>
        <section className="d-flex adm-space-justify-between p-x">
          <a>忘记密码</a>
          <a
            onClick={() => {
              history.push("/register");
            }}
          >
            注册
          </a>
        </section>
      </main>
    </div>
  );
}
