import Services from "@/apis";
import {
  SheepFosterListKeys,
  SheepFosterSheepType,
  SheepFosterSheepTypeMap,
  SheepFosterStatus,
} from "@/apis/sheepFoster";
import { SlaughterType } from "@/apis/sheepSlaughter";
import { CONST_KEYS } from "@/const";
import { getOpenid, isDev } from "@/utils";
import {
  AutoCenter,
  Card,
  Checkbox,
  Divider,
  Grid,
  Image,
  InfiniteScroll,
  Modal,
  Space,
  SpinLoading,
  Tabs,
  Tag,
} from "antd-mobile";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Helmet, history, useRequest } from "umi";

const GridItem = ({ num, label }: { num?: number; label: string }) => {
  return (
    <Grid.Item>
      <p>
        <b>{num}只</b>
      </p>
      <div>{label}</div>
    </Grid.Item>
  );
};
type CurrentRowType = SheepFosterListKeys;

export default function HomePage() {
  const page = useRef<number>(1);
  // 只看在养
  const [checked, setChecked] = useState(false);
  // 还有更多么
  const [hasMore, setHasMore] = useState(true);
  const [data, setData] = useState<CurrentRowType[]>();
  const [currentTab, setCurrentTab] = useState<SheepFosterSheepType>(
    SheepFosterSheepType.育肥羊
  );
  const { data: statisticsMyNum } = useRequest(
    Services.sheepFoster.statisticsMyNum,
    {
      cacheKey: "Services.sheepFoster.statisticsMyNum",
    }
  );

  useEffect(() => {
    if (!data || localStorage.getItem(CONST_KEYS.OPENID)) return;
    if (!isDev()) {
      getOpenid();
    }
  }, [data]);

  const loadMore = useCallback(async () => {
    const res = await Services.sheepFoster.listMyPage({
      page: page.current,
      sheepType: currentTab,
    });
    page.current++;
    setData([...res.data.list, ...(data || [])]);
    setHasMore(res.data.current < res.data.totalPage);
  }, [currentTab, data]);
  /** 点击销售
   * @description 判断是否是育肥羊，育肥羊可以要钱，其他只能要钱
   * */
  const onSellClick = useCallback((record: CurrentRowType) => {
    console.log("record", record);
    if (record.sheepType === SheepFosterSheepType.育肥羊) {
      Modal.show({
        title: "选择出售方式",
        showCloseButton: true,
        closeOnAction: true,
        actions: [
          {
            key: "money",
            text: "要钱",
            onClick() {
              history.push(`/sell/${record.fosterNo}/${SlaughterType.钱}`);
            },
          },
          {
            key: "meat",
            text: "要肉",
            onClick() {
              history.push(`/sell/${record.fosterNo}/${SlaughterType.羊肉}`);
            },
          },
        ],
      });
    } else {
      history.push(`/sell/${record.fosterNo}/${SlaughterType.钱}`);
    }
  }, []);

  const renderData = useMemo(() => {
    if (checked) {
      return data?.filter((item) => item.status === SheepFosterStatus.在养);
    }
    return data;
  }, [checked, data]);

  // 生产环境没有openid的话返回null
  if (!isDev() && !localStorage.getItem(CONST_KEYS.OPENID)) {
    return (
      <AutoCenter>
        <SpinLoading />
      </AutoCenter>
    );
  }

  return (
    <>
      <Helmet>
        <title>首页</title>
      </Helmet>
      <div className="p-x p-y">
        {/* 统计 */}
        <section>
          <Card className="text-center">
            <Grid columns={3}>
              <GridItem
                num={statisticsMyNum?.FATTENING_SHEEP}
                label={"育肥羊"}
              />
              <GridItem
                num={statisticsMyNum?.BREEDING_EWES}
                label={"繁育母羊"}
              />
              <GridItem num={statisticsMyNum?.LAMB} label={"羔羊"} />
            </Grid>
          </Card>
        </section>
        {/* 认养规则 */}
        <section className="m-t">
          <Grid columns={2} gap={16}>
            <Grid.Item>
              <Card
                bodyStyle={{ paddingTop: 0, paddingBottom: 0 }}
                onClick={() => history.push("/intro")}
              >
                <div className="d-flex space-between items-center">
                  <div>认养规则</div>
                  <Image
                    src="/home-1.jpg"
                    fit="contain"
                    width={60}
                    height={60}
                  />
                </div>
              </Card>
            </Grid.Item>
            <Grid.Item>
              <Card
                bodyStyle={{ paddingTop: 0, paddingBottom: 0 }}
                onClick={() => history.push("/join")}
              >
                <div className="d-flex space-between items-center">
                  <div>羊场加盟</div>
                  <Image
                    src="/home-2.png"
                    fit="contain"
                    width={60}
                    height={60}
                  />
                </div>
              </Card>
            </Grid.Item>
          </Grid>
        </section>
        {/* 选择 */}
        <section className="m-t">
          <Grid columns={4}>
            <Grid.Item span={3}>
              <Tabs
                activeKey={currentTab}
                onChange={(tab) => {
                  page.current = 1;
                  setData([...[]]);
                  setHasMore(true);
                  setCurrentTab(tab as any);
                }}
                stretch={false}
                style={{
                  "--title-font-size": "13px",
                }}
              >
                {Object.entries(SheepFosterSheepTypeMap).map(([key, value]) => {
                  return <Tabs.Tab title={value} key={key}></Tabs.Tab>;
                })}
              </Tabs>
            </Grid.Item>
            <Grid.Item
              span={1}
              className="d-flex items-center"
              style={{ justifyContent: "flex-end" }}
            >
              <Checkbox checked={checked} onChange={setChecked}></Checkbox>
              <span style={{ marginLeft: 6 }}>只看在养</span>
            </Grid.Item>
          </Grid>
        </section>
        {/* 列表 */}
        <section>
          <ul>
            {renderData?.map((item) => (
              <li className="m-t" key={item.fosterNo}>
                <Card
                  title={<div>{item.earLabel}</div>}
                  extra={
                    <>
                      {item.outDay > 0 ? (
                        <b className="text-warning">据出栏{item.outDay}天</b>
                      ) : (
                        <b className="text-success">可出栏</b>
                      )}
                    </>
                  }
                  onClick={() => {
                    history.push(`/detail/${item.fosterNo}`);
                  }}
                >
                  <div>
                    <Space>
                      <Tag fill="outline" color={"primary"}>
                        {item.sheepVarietyName}
                      </Tag>
                      {typeof item.parityNum === "number" && (
                        <Tag fill="outline" color={"primary"}>
                          {item.parityNum}胎
                        </Tag>
                      )}
                    </Space>
                  </div>
                  <Divider />
                  <Space justify="between" className="w-full">
                    {/* 在养且可出栏 */}
                    {item.outDay <= 0 &&
                    item.status === SheepFosterStatus.在养 ? (
                      <a
                        onClick={(e) => {
                          e.stopPropagation();
                          onSellClick(item);
                        }}
                      >
                        出售
                      </a>
                    ) : (
                      <span>{item.statusCn}</span>
                    )}
                    <span></span>
                  </Space>
                </Card>
              </li>
            ))}
          </ul>
        </section>

        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
      </div>
    </>
  );
}
