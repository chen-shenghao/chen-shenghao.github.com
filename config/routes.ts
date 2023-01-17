export type Route = {
  path?: string;
  component?: string;
  routes?: Route[];
  redirect?: string;
  wrappers?: string[];
  title?: string;
};

const routes: Route[] = [
  {
    path: "/home",
    component: "@/layouts/tabbar",
    routes: [
      {
        path: "index",
        component: "index",
      },
      {
        path: "user",
        component: "user",
      },
    ],
  },
  { path: "/login", component: "login", title: "登录" },
  { path: "/register", component: "register", title: "注册" },
  { path: "/sell/:id/:type", component: "sell", title: "出售" },
  { path: "/intro", component: "intro", title: "认养规则" },
  { path: "/join", component: "join", title: "羊场加盟" },
  { path: "/foster", component: "foster", title: "认养记录" },
  { path: "/crop", component: "crop", title: "出栏记录" },
  { path: "/detail/:id", component: "detail", title: "详情" },
  { path: "/", redirect: "/home/index" },
  { path: "*", component: "404" },
];

export default routes;
