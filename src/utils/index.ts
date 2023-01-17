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

export const rules = {
  phone: /^(?:(?:\+|00)86)?1\d{10}$/
};
