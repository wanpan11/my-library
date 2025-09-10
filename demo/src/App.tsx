import CacheTest from "./cacheRoute";
import StoreTest from "./createContainer";
import Demo from "./useSwrData";

function App() {
  return (
    <>
      <h1>cacheRoute</h1>
      <CacheTest />
      <hr />

      <h1>containerStore</h1>
      <StoreTest />
      <hr />

      <h1>useSwrData</h1>
      <Demo />
    </>
  );
}

export default App;
