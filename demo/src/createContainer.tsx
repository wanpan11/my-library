/* eslint-disable no-console */
import createContainer from "create-container";

interface Store {
  age: number;
  count: number;
}
const ContainerStore = createContainer<Store>({
  age: 0,
  count: 0,
});

function Test_1() {
  const [store, setState] = ContainerStore.useContainer(state => [state.count]);
  console.log("render ===> Test_1");

  return (
    <div>
      <span>Test_1_name：</span>
      <span>{store.count}</span>

      <button
        style={{ marginLeft: 10 }}
        type="button"
        onClick={() => {
          setState({ ...store, count: store.count + 1 });
        }}
      >
        count++
      </button>
    </div>
  );
}

function Test_2() {
  const [store] = ContainerStore.useContainer(state => [state.age]);
  console.log("render ===> Test_2");

  return (
    <div>
      <span>Test_2_age：</span>
      <span>{store.age}</span>
    </div>
  );
}

function StoreTest() {
  return (
    <ContainerStore.Provider>
      <Test_1 />
      <Test_2 />
    </ContainerStore.Provider>
  );
}

export default StoreTest;
