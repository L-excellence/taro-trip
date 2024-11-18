import tools from "@/common/tools.js";

const init = () => {
  const userInfo = tools.getStorageSyncWithTime("userInfo");
  return {
    isLogin: !!userInfo?.userPhone, // 是否登录
    userPhone: userInfo?.userPhone,
    nickName: userInfo?.nickName,
  };
};

const initialState: any = {
  ...init(),
};

function reducer(state = initialState, action: any): any {
  switch (action.type) {
    case "updateUserState": {
      console.log("updateUserState: ", action.payload);
      return {
        ...state,
        ...action.payload,
      };
    }

    case "loginOut": {
      return {
        ...state,
        ...init(),
      };
    }

    default: {
      return state;
    }
  }
}

export default reducer;
