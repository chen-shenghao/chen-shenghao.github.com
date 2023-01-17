import Services from "@/apis";
import { rules } from "@/utils";
import {
  Button,
  Form,
  ImageUploader,
  ImageUploadItem,
  Input,
  TextArea,
  Toast,
} from "antd-mobile";
import { useCallback } from "react";
import { Helmet, history, useRequest } from "umi";
export default function JoinPage() {
  const [form] = Form.useForm();
  // get
  useRequest(Services.league.getUserLeague, {
    cacheKey: "Services.league.getUserLeague",
    onSuccess(res) {
      if (res) {
        form.setFieldsValue({
          ...res,
          identityFrontArr: [{ url: res.identityFront }],
          identityReverseArr: [{ url: res.identityReverse }],
          sitePhotoArr: res.sitePhotoList.map((item) => ({ url: item })),
        });
      }
    },
  });
  // save
  const { run } = useRequest(Services.league.saveOrUpdate, {
    cacheKey: "Services.league.saveOrUpdate",
    manual: true,
    onSuccess() {
      Toast.show({
        icon: "success",
        content: "保存成功",
      });
      history.back();
    },
  });
  const onFinish = useCallback(
    (values: any) => {
      const clone = JSON.parse(JSON.stringify(values));
      const formet = Object.entries(clone).map(([key, value]) => {
        if (key.endsWith("Arr")) {
          return [
            key.replace("Arr", ""),
            (value as ImageUploadItem[]).map((item) => item.url).toString(),
          ];
        } else {
          return [key, value];
        }
      });
      run(Object.fromEntries(formet));
    },
    [run]
  );

  return (
    <div style={{ overflow: "hidden" }}>
      <Helmet>
        <title>羊场加盟</title>
      </Helmet>
      <Form
        form={form}
        // initialValues={{
        //   sheepName: "羊场名称",
        //   maxLivestock: 100,
        //   linkPhone: 15617870620,
        //   culturedVariety: "胡杨",
        //   nowLivestock: 50,
        //   sheepAddress: "羊场地址",
        //   sheepFarmer: "德华",
        // }}
        mode="card"
        layout="horizontal"
        footer={
          <Button block type="submit" color="primary" size="large">
            保存
          </Button>
        }
        onFinish={onFinish}
      >
        <Form.Item
          name="sheepName"
          label="羊场名称"
          rules={[{ required: true, message: "羊场名称不能为空" }]}
        >
          <Input placeholder="请输入羊场名称" />
        </Form.Item>
        <Form.Item
          name="maxLivestock"
          label="最大存栏"
          rules={[{ required: true, message: "最大存栏不能为空" }]}
        >
          <Input placeholder="请输入最大存栏" />
        </Form.Item>
        <Form.Item
          name="nowLivestock"
          label="现有存栏"
          rules={[{ required: true, message: "现有存栏不能为空" }]}
        >
          <Input placeholder="请输入现有存栏" />
        </Form.Item>
        <Form.Item
          name="culturedVariety"
          label="养殖品种"
          rules={[{ required: true, message: "养殖品种不能为空" }]}
        >
          <Input placeholder="请输入养殖品种" />
        </Form.Item>
        <Form.Item
          name="sheepFarmer"
          label="羊场负责人"
          rules={[{ required: true, message: "羊场负责人不能为空" }]}
        >
          <Input placeholder="请输入羊场负责人" />
        </Form.Item>
        <Form.Item
          name="linkPhone"
          label="联系电话"
          rules={[
            { required: true, message: "联系电话不能为空" },
            {
              pattern: rules.phone,
              message: "电话格式不正确",
            },
          ]}
        >
          <Input placeholder="请输入联系电话" />
        </Form.Item>
        <Form.Item
          name="sheepAddress"
          label="羊场地址"
          rules={[{ required: true, message: "羊场地址不能为空" }]}
        >
          <TextArea placeholder="请输入羊场地址" rows={3} />
        </Form.Item>
        <Form.Item
          name="identityFrontArr"
          label="身份证正面"
          rules={[{ required: true, message: "身份证正面不能为空" }]}
        >
          <ImageUploader
            upload={Services.utils.img}
            maxCount={1}
          ></ImageUploader>
        </Form.Item>
        <Form.Item
          name="identityReverseArr"
          label="身份证反面"
          rules={[{ required: true, message: "身份证反面不能为空" }]}
        >
          <ImageUploader
            upload={Services.utils.img}
            maxCount={1}
          ></ImageUploader>
        </Form.Item>
        <Form.Item
          name="sitePhotoArr"
          label="场地照片"
          rules={[{ required: true, message: "场地照片不能为空" }]}
        >
          <ImageUploader
            upload={Services.utils.img}
            maxCount={9}
          ></ImageUploader>
        </Form.Item>
      </Form>
    </div>
  );
}
