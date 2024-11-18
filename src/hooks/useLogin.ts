import tools from "@/common/tools.js";
import { useEffect } from "react";

const useLogin = () => {
  useEffect(() => {
    const store = tools.getStorageSyncWithTime("userInfo");
    if (!store?.userPhone) {
      // 未登录
      tools.navigateTo({
        url: "/pages/login/login",
        data: {},
      });
    }
  }, []);
};

export default useLogin;
