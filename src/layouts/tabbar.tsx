import IconFont from "@/components/IconFont";
import { TabBar } from "antd-mobile";
import { FC } from "react";
import { history, Outlet, useLocation } from "umi";

const Bottom: FC = () => {
  const location = useLocation();
  const { pathname } = location;

  const setRouteActive = (value: string) => {
    history.push(value);
  };

  const tabs = [
    {
      key: "/home/index",
      title: "首页",
      icon: <IconFont type="icon-home" />,
    },
    {
      key: "/home/foster",
      title: "买羊",
      icon: <IconFont type="icon-im" />,
    },
    {
      key: "/home/user",
      title: "我的",
      icon: <IconFont type="icon-black" />,
    },
  ];

  return (
    <TabBar activeKey={pathname} onChange={(value) => setRouteActive(value)}>
      {tabs.map((item) => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  );
};

export default function Tabbar() {
  return (
    <main style={{ height: "100vh", position: "relative", overflow: "hidden" }}>
      <section
        style={{
          height: "calc(100vh - 50px)",
          overflow: "auto",
        }}
      >
        <Outlet />
      </section>
      <section
        style={{
          height: 50,
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          background: "#fff",
          borderTop: "2px solid #eeeeee",
        }}
      >
        <Bottom />
      </section>
    </main>
  );
}
