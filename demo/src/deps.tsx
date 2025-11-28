import useSwrData from "@wanp/use-swr-data";

interface ObjParams {
  name: string;
  age: number;
  type: string;
  value: string;
}

let count = 1;
async function object(data: ObjParams) {
  return new Promise<ObjParams>((resolve, reject) => {
    setTimeout(() => {
      if (data.type === "reject" && count === 1) {
        count += 1;
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({ message: "请求失败", code: 500 });
      }
      else {
        resolve(data);
      }
    }, 1000);
  });
}

// 依赖收集
// https://swr.vercel.app/zh-CN/docs/advanced/performance#dependency-collection
function Deps() {
  // const { data } = useSwrData({
  const { data, isValidating, isLoading, error } = useSwrData({
    reqKey: "resolve",
    req: object,
    params: { type: "reject" },
    swrConfig: {
      errorRetryInterval: 300,
    },
  });

  console.log("[ data, isValidating, isLoading, error  ] ===>", data, isValidating, isLoading, error);
  // console.log("[ data, isValidating, isLoading, error  ] ===>", data);

  return <div>useSwrData</div>;
}

export default Deps;
