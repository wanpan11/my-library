import useSwrData from "@wanp/use-swr-data";

interface ObjParams {
  name: string;
  age: number;
  type: string;
  value: string;
}
async function object(data: ObjParams) {
  return new Promise<ObjParams>((resolve, reject) => {
    setTimeout(() => {
      console.log("[ data ] ===>", data);
      if (data.type === "reject") {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({ message: "请求失败", code: 500 });
      }
      else {
        resolve(data);
      }
    }, 1000);
  });
}

function Demo() {
  const { data } = useSwrData({
    reqKey: "resolve",
    req: object,
    params: { type: "resolve" },
  });

  const { error } = useSwrData({
    reqKey: "reject",
    req: object,
    params: { type: "reject" },
  });

  console.log("[ data ] ===>", data);
  console.log("[ error ] ===>", error?.code);

  return <div>useSwrData</div>;
}

export default Demo;
