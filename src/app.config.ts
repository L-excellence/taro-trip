export default defineAppConfig({
  pages: [
    "pages/index/index",
    "pages/order/order",
    "pages/airportList/airportList",
    "pages/calendar/calendar",
    "pages/login/login",
  ],
  subPackages: [
    {
      root: "pages/flight",
      pages: ["list/list", "detail/detail"],
    },
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "旅行",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    // 基础样式
    color: "#7F8389",
    selectedColor: "#5495e6",
    borderStyle: "black", // tabBar 顶部边框线条的颜色
    backgroundColor: "#fff",
    // tab 列表
    list: [
      {
        pagePath: "pages/index/index",
        iconPath: "assets/images/index-unselected.png",
        selectedIconPath: "assets/images/index-selected.png",
        text: "首页",
      },
      {
        pagePath: "pages/order/order",
        iconPath: "assets/images/order-unselected.png",
        selectedIconPath: "assets/images/order-selected.png",
        text: "我的订单",
      },
    ],
  },
  // 配置位置获取请求弹框
  permission: {
    "scope.userLocation": {
      desc: "为了更好的服务体验，我们希望获取你的位置",
    },
  },
  // 配置位置需要添加这个
  requiredPrivateInfos: ["getLocation"],
});
