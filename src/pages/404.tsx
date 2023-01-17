import { Button } from "antd-mobile";
import { history } from "umi";

export default function NotFound() {
  return (
    <main className="text-center">
      <h2>404</h2>
      <Button
        onClick={() => {
          history.replace("/");
        }}
      >
        返回首页
      </Button>
    </main>
  );
}
