import { FC } from "react";
import { Helmet } from "umi";

const Pstyle: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <p style={{ textAlign: "justify", lineHeight: 1.25 }}>{children}</p>;
};
export default function IntroPage() {
  return (
    <>
      <Helmet>
        <title>认养规则</title>
      </Helmet>
      <div className="p-x p-y">
        <h2>项目简介</h2>
        <Pstyle>
          河南振兴羊业有限公司由豫资集团下面的河南豫芯资产管理有限公司和豫资鑫芯融资租赁有限公司等企业2020年投资设立,注册资本6600万
          元，国有控股企业。从事托管政府所建的羊场，带动农户养羊，用设计建设运营融资一体化(EPC+O+F)方式发展地方羊产业公司总部位干郑州市，下辖淮滨羊场存栏规模1
          万只，在养品种包括湖羊、东佛利生、澳洲奶绵羊以及杂交品种。
        </Pstyle>
        <h2>认养规则</h2>
        <Pstyle>
          1.繁育羊，8个月出栏，每只出资2000元，回报小羊羔1只，价格随行就市，平台托底回收价小羊羔600元/只，
          1只母羊可以用5年，两年三窝，每年回报1.5只羔羊。八个月后可以中途卖母羊退出，淘汰母羊回收价1300元/只。
        </Pstyle>
        <Pstyle>
          2.育肥羊，5个月出栏，每只出资1000元，回报1100元的羊肉，羊肉价格随行就市。或者回报35斤羊肉。
        </Pstyle>
        <Pstyle>郑重承诺：羊死了平台包换成活羊，平台保证成活</Pstyle>
      </div>
    </>
  );
}
