import Services from "@/apis";
import { rules } from "@/utils";
import { AutoCenter, Button, Form, Input, Toast } from "antd-mobile";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Helmet, history } from "umi";
export default function Register() {
  const [form] = Form.useForm();
  // -2发送中 -1正常 >0倒计时 0重新发送
  const [code, setCode] = useState<-1 | -2 | 0 | number>(-1);
  const buttonText = useMemo(() => {
    if (code === -1) return "获取验证码";
    if (code === -2) return "发送中...";
    if (code === 0) return "重新发送";
    return `${code}s`;
  }, [code]);
  const onGetCode = useCallback(() => {
    form.validateFields(["phone"]).then(({ phone }) => {
      setCode(-2);
      Services.auth
        .getCode(phone)
        .then((res) => {
          setCode(60);
          Toast.show({
            icon: "success",
            content: "发送成功",
          });
          console.log(res);
        })
        .catch(() => {
          setCode(-1);
        });
    });
  }, [form]);
  useEffect(() => {
    if (code <= 0) return;
    const timer = setInterval(() => {
      setCode(code - 1);
      if (code <= 0) clearInterval(timer);
    }, 1000);
    return () => timer && clearInterval(timer);
  }, [code]);
  const onFinish = useCallback((values: any) => {
    delete values.checkpwd;
    Services.auth
      .register(values)
      .then(() => {
        Toast.show({
          icon: "sucsess",
          content: "注册成功",
        });
        history.back();
      })
      .catch(() => null);
  }, []);
  return (
    <div style={{ paddingTop: 100 }}>
      <Helmet>
        <title>注册</title>
      </Helmet>
      <main>
        <AutoCenter>
          <h1>注册</h1>
        </AutoCenter>
        <section>
          <Form
            initialValues={{
              phone: 11111111111,
              pwd: 1,
              checkpwd: 1,
              code: 1,
            }}
            form={form}
            layout="horizontal"
            footer={
              <Button block type="submit" color="primary" size="large">
                注册
              </Button>
            }
            onFinish={onFinish}
            mode="card">
            <Form.Item
              name="phone"
              label="手机号"
              rules={[
                { required: true, message: "手机号不能为空" },
                { pattern: rules.phone, message: "手机号格式不正确" },
              ]}>
              <Input placeholder="请输入手机号" />
            </Form.Item>
            <Form.Item
              name="code"
              label="验证码"
              rules={[{ required: true, message: "验证码不能为空" }]}
              extra={
                <Button
                  size="mini"
                  disabled={code > 0}
                  onClick={() => {
                    onGetCode();
                  }}>
                  {buttonText}
                </Button>
              }>
              <Input placeholder="请输入验证码" />
            </Form.Item>
            <Form.Item
              name="pwd"
              label="密码"
              rules={[{ required: true, message: "密码不能为空" }]}>
              <Input type={"password"} placeholder="请输入密码" />
            </Form.Item>
            <Form.Item
              name="checkpwd"
              label="确认密码"
              rules={[
                { required: true, message: "请确认密码" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("pwd") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("两次密码不一样"));
                  },
                }),
              ]}>
              <Input type={"password"} placeholder="请确认密码" />
            </Form.Item>
          </Form>
        </section>
        <section className="d-flex adm-space-justify-between p-x">
          <a></a>
          <a
            onClick={() => {
              history.back();
            }}>
            返回
          </a>
        </section>
      </main>
    </div>
  );
}
