import Services from "@/apis";
import { CONST_KEYS } from "@/const";

export function sleep(time = 1500) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isResolve = Math.random() > 0.5;
      console.log("Promise:", isResolve ? "resolve" : "reject");
      if (isResolve) {
        resolve(true);
      }
      reject(false);
    }, time);
  });
}

export const isDev = () => process.env.NODE_ENV === "development";

export const rules = {
  phone: /^(?:(?:\+|00)86)?1\d{10}$/,
};
/**
 * 根据当前的url获取参数值
 * @param key 需要获取的key值
 * @returns 获取到的value
 */
export function getUrlParam(key: string) {
  const uri = new URL(location.href);
  const search = uri.searchParams;
  return search.get(key);
}

/**
 * 获取code，并储存到localStorage中
 * @param state 微信授权需要传递给重定向路径的state值
 * @returns code
 */
export async function getOpenid(state?: string) {
  const currentUrl = location.href;
  const code = getUrlParam("code") || localStorage.getItem(CONST_KEYS.OPENID);

  if (!code) {
    // const appId = "wxf53d7ad98e82e920";
    // test wxf23786c584eb01a6
    const appId = isDev() ? "wxf23786c584eb01a6" : "wxf53d7ad98e82e920";
    const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${encodeURIComponent(
      currentUrl
    )}&response_type=code&scope=snsapi_base&state=${state}#wechat_redirect`;
    console.group("微信相关");
    console.log("appid", appId);
    console.log("url", url);
    console.log("redirect_uri", currentUrl);
    console.log("state", state);
    console.groupEnd();

    location.replace(url);
  } else {
    const openid = (await Services.wxmp.getOpenid(code)).data;
    console.log("获取到的openid", openid);
    localStorage.setItem(CONST_KEYS.OPENID, openid);
    return openid;
  }
}
