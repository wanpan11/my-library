import type { ReactNode } from "react";
import { nanoid } from "nanoid";
import { createContext, use, useEffect, useMemo, useRef, useState } from "react";
import { shallowEqual } from "shallow-equal";

interface Observer<S> {
  state: S;
  setState: React.Dispatch<React.SetStateAction<S>>;
  readonly observers: { key: string; updater: () => void }[];
}

/**
 * 创建一个 contextStore 消费者会在订阅的属性变化后才会 rerender
 * @param initData 初始数据
 */
function createContainer<T>(initData: T) {
  const ObservableContext = createContext<Observer<T> | null>(null);

  const Provider = function ({ children }: { children: ReactNode[] | ReactNode }) {
    // dispatch 更新 state
    const [state, setState] = useState(initData);

    // 使用 ref 存储最新的 state 和 setState，避免闭包问题
    const stateRef = useRef(state);
    const setStateRef = useRef(setState);
    const observersRef = useRef<Observer<T>["observers"]>([]);

    // 同步最新值到 ref
    stateRef.current = state;
    setStateRef.current = setState;

    // 创建稳定的 context value，使用 getter 动态获取最新值
    const observableValue = useMemo<Observer<T>>(
      () => ({
        get state() {
          return stateRef.current;
        },
        get setState() {
          return setStateRef.current;
        },
        get observers() {
          return observersRef.current;
        },
      }),
      []
    );

    // state 更新时通知观察者组件更新
    useEffect(() => {
      observersRef.current.forEach(observer => observer.updater());
    }, [state]);

    return <ObservableContext value={observableValue}>{children}</ObservableContext>;
  };

  const useContainer = function (setDep: (state: T) => any[]): [T, React.Dispatch<React.SetStateAction<T>>] {
    // 获取 context 值
    const observableValue = use(ObservableContext);

    if (!observableValue) {
      throw new Error("useContainer must be used within a Provider");
    }

    // 创建强制更新方法
    const [, forceUpdate] = useState({});

    // 使用 useRef 存储依赖函数和上一次的依赖值
    const depRef = useRef(setDep);
    const prevDepRef = useRef<any[] | null>(null);

    // 更新依赖函数
    useEffect(() => {
      depRef.current = setDep;
    });

    // 创建观察者
    useEffect(() => {
      const key = nanoid();

      // 初始化依赖值
      prevDepRef.current = depRef.current(observableValue.state);

      const observer = () => {
        const prev = prevDepRef.current;
        const cur = depRef.current(observableValue.state);

        // 通过浅比较，来判断依赖是否有变化
        if (!prev || !shallowEqual(prev, cur)) {
          prevDepRef.current = cur;
          forceUpdate({}); // 触发渲染
        }
      };
      observableValue.observers.push({ key, updater: observer });

      return () => {
        const idx = observableValue.observers.findIndex(obs => obs.key === key);
        if (idx !== -1) {
          observableValue.observers.splice(idx, 1);
        }
      };
    }, [observableValue]);

    return [observableValue.state, observableValue.setState];
  };

  return { Provider, useContainer };
}

export default createContainer;
