import IconFont from "@/components/IconFont";
import { Button, ErrorBlock } from "antd-mobile";

export default function HomePage() {
  return (
    <div>
      <IconFont type="icon-im" fontSize={24} color="#ff0000" />
      <Button color="primary" block>
        button
      </Button>
      <ErrorBlock status="disconnected" />
    </div>
  );
}
