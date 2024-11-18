/* eslint-disable react/no-unused-state */
import { PureComponent, useState } from "react";
import { View, Input, Button } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { debounce } from "@/common/utils.js";
import { loginReq } from "@/common/api.js";
import { ERR_MES, USER_VALID_TIME } from "@/common/constant.js";
// import { connect } from 'react-redux';
// import tools from '@/common/tools';
import { useSelector, useDispatch } from "react-redux";

import "./login.scss";
import tools from "@/common/tools.js";

export default function Login() {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    nickName: "",
    userPhone: "",
    password: "",
  });

  const handleInput = debounce((e, type) => {
    console.log(e, type);
    setState({
      ...state,
      [type]: e.detail.value,
    });
  }, 300);

  const onLogin = () => {
    const { userPhone, password, nickName } = state;
    if (!userPhone || !password || !nickName) {
      return tools.showToast("所有内容必须填写完整～");
    }
    const reg = /^1[3-9]\d{9}$/;
    if (!reg.test(userPhone)) {
      return tools.showToast("请填写正确手机号～");
    }
    tools.showLoading();
    loginReq({
      userPhone,
      password,
      nickName,
    })
      .then((res) => {
        const { result } = res;
        console.log("login result: ", result);
        // 存储到 storage 中
        tools.setStorageSyncWithTime(
          "userInfo",
          {
            userPhone: result.userPhone,
            nickName: result.nickName,
          },
          USER_VALID_TIME
        );
        dispatch({
          type: "updateUserState",
          payload: {
            isLogin: !!result.userPhone,
            userPhone: result.userPhone,
            nickName: result.nickName,
          },
        });
        Taro.navigateBack();
      })
      .catch((err) => {
        const { data } = err;
        if (data?.mes) {
          return tools.showToast(data.mes);
        }
        tools.showToast(ERR_MES);
      })
      .finally(() => {
        tools.hideLoading();
      });
  };
  return (
    <View className="login-container">
      <View className="login-top">
        <View>你好，</View>
        <View>欢迎登录</View>
      </View>
      <View className="login-box">
        <Input
          type="text"
          className="nick-name input"
          placeholder="请输入昵称"
          placeholderClass="placeholer-class"
          onInput={(e) => handleInput(e, "nickName")}
        ></Input>
        <Input
          type="text"
          className="phone input"
          placeholder="请输入手机号"
          placeholderClass="placeholer-class"
          onInput={(e) => handleInput(e, "userPhone")}
        ></Input>
        <Input
          type="safe-password"
          className="password input"
          placeholder="请输入密码"
          placeholderClass="placeholer-class"
          onInput={(e) => handleInput(e, "password")}
        ></Input>
      </View>
      <Button className="login-btn" onClick={onLogin}>
        登录
      </Button>
    </View>
  );
}
