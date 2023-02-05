import { DotLoading, ErrorBlock } from "antd-mobile";

export const InfiniteScrollContent = ({
  dataLen,
}: {
  dataLen: number | undefined;
}) => {
  if (dataLen === undefined) {
    return (
      <>
        <span>加载中</span>
        <DotLoading />
      </>
    );
  }

  if (dataLen > 0) {
    return <span>没有更多了</span>;
  }
  return <ErrorBlock status="empty" />;
};
