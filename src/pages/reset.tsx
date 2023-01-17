import Services from "@/apis";
import { CONST_KEYS } from "@/const";
import { Button, Form, Input, Modal } from "antd-mobile";
import { useCallback } from "react";
import { Helmet, history } from "umi";
export default function ResetPage() {
  const [form] = Form.useForm();

  const onFinish = useCallback((values: any) => {
    delete values.checkpwd;
    Services.auth
      .changePwd(values)
      .then(() => {
        Modal.alert({
          title: "提示",
          content: "修改密码成功，请重新登录",
          onConfirm() {
            history.replace(CONST_KEYS.LOGIN_PAGE);
          },
        });
      })
      .catch(() => null);
  }, []);
  return (
    <div>
      <Helmet>
        <title>修改密码</title>
      </Helmet>
      <main>
        <section>
          <Form
            form={form}
            layout="horizontal"
            footer={
              <Button block type="submit" color="primary" size="large">
                修改密码
              </Button>
            }
            onFinish={onFinish}
            mode="card"
          >
            <Form.Item
              name="rePwd"
              label="原密码"
              rules={[{ required: true, message: "原密码不能为空" }]}
            >
              <Input type={"password"} placeholder="请输入原密码" />
            </Form.Item>

            <Form.Item
              name="newPwd"
              label="新密码"
              rules={[{ required: true, message: "新密码不能为空" }]}
            >
              <Input type={"password"} placeholder="请输入新密码" />
            </Form.Item>
            <Form.Item
              name="checkNewPwd"
              label="确认密码"
              rules={[
                { required: true, message: "请确认密码" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPwd") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("两次密码不一样"));
                  },
                }),
              ]}
            >
              <Input type={"password"} placeholder="请确认密码" />
            </Form.Item>
          </Form>
        </section>
      </main>
    </div>
  );
}
