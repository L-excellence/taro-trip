import { PropsWithChildren } from "react";
import { useLaunch } from "@tarojs/taro";
import { Provider } from "react-redux";

import "./app.scss";
import store from "./store/index";
// import createApp from "./dva";
// import models from "./models";

// const dvaApp = createApp({
//   initialState: {},
//   models,
// });
// const store = dvaApp.getStore();

function App({ children }: PropsWithChildren<any>) {
  useLaunch(() => {
    console.log("App launched.");
  });

  // children 是将要会渲染的页面
  return <Provider store={store}>{children}</Provider>;
}

export default App;
