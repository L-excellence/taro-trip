import { PureComponent } from "react";
import {
  View,
  Text,
  Button,
  Image,
  Input,
  // Switch
} from "@tarojs/components";
import { connect } from "react-redux";
import Taro, { getCurrentInstance } from "@tarojs/taro";
import dayjs from "dayjs";
import withShare from "@/common/decorator/withShare";
import loginDecorator from "@/components/LoginDecorator";
import tools from "@/common/tools.js";
import { orderReq } from "@/common/api.js";
import { ERR_MES } from "@/common/constant.js";

import "./detail.scss";

// @withShare({
//   title: "我的行程分你一半，快乐同样分你一半～",
//   imageUrl:
//     "https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180914%2Ff4b0c16e207e4fd0b686bf378a62989c.jpg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1633356232&t=99c2f5e1ceb1b611976b1e28608aeee7",
// })
// @loginDecorator
@connect(({ user }) => ({
  user,
}))
export default class Detail extends PureComponent<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      selectedFlightData: {},
      // isChecked: false,
    };
  }

  onShareAppMessage() {
    console.log(this.props);
    return {
      title: "我的行程分你一半，快乐同样分你一半～",
      imageUrl:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180914%2Ff4b0c16e207e4fd0b686bf378a62989c.jpg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1633356232&t=99c2f5e1ceb1b611976b1e28608aeee7",
      // 当前页面路由
      path: `/${(this.props as any).tid}`,
    };
  }

  componentDidMount() {
    const { params } = getCurrentInstance().router as any;
    this.setState({
      selectedFlightData: {
        ...params,
      },
    });

    const store = tools.getStorageSyncWithTime("userInfo");
    if (!store?.userPhone) {
      // 未登录
      tools.navigateTo({
        url: "/pages/login/login",
        data: {},
      });
    }
  }
  onOrder = () => {
    const { userPhone } = this.props.user;
    const { selectedFlightData } = this.state;
    tools.doLogin(() => {
      tools.showLoading();
      orderReq({
        userPhone,
        orderInfo: selectedFlightData,
      })
        .then(() => {
          tools
            .showToast({
              title: "预定成功...",
              icon: "loading",
              duration: 2000,
            })
            .then(() => {
              Taro.switchTab({
                url: "/pages/order/order",
              });
            });
        })
        .catch((err) => {
          tools.showToast(err?.data?.mes || ERR_MES);
        })
        .finally(() => {
          tools.hideLoading();
        });
    });
  };
  // onSwitchChange = (e) => {
  //   console.log('--ee', e)
  //   this.setState({
  //     isChecked: e.detail.value
  //   })
  // }
  render() {
    const {
      selectedFlightData,
      // isChecked
    } = this.state;
    const {
      airCompanyName,
      airIcon,
      arrAirportName,
      arrTimeStr,
      dptAirportName,
      dptTime,
      dptTimeStr,
      price,
    } = selectedFlightData;
    const { isLogin, userPhone, nickName } = this.props.user;
    return (
      <View className="detail-container">
        <View className="flight-segment">
          <View className="info-head">
            <View className="tag">直飞</View>
            <View className="company-info">
              <Image src={airIcon} className="logo"></Image>
              {`${airCompanyName} ${dayjs(dptTime).format("M月D日")}`}
            </View>
          </View>
          <View className="info-detail">
            <View className="from">
              <View className="time">{dptTimeStr}</View>
              <View className="station">{dptAirportName}</View>
            </View>
            <Image
              className="mid"
              src="https://i.postimg.cc/z3P1QNf1/1.png"
            ></Image>
            <View className="to">
              <View className="time">{arrTimeStr}</View>
              <View className="station">{arrAirportName}</View>
            </View>
          </View>
        </View>
        <View className="passenger-box module-box">
          <Text className="title">乘机人</Text>
          {isLogin ? (
            <View className="name">{nickName}</View>
          ) : (
            <Button className="add-btn name" onClick={tools.doLogin}>
              新增
            </Button>
          )}
        </View>
        <View className="passenger-box module-box">
          <Text className="title">联系手机</Text>
          <View className="phone-box">
            <Text className="num-pre">+86 </Text>
            <Input
              disabled
              placeholder="请输入乘机人手机号"
              value={userPhone}
            ></Input>
          </View>
        </View>
        {/* 测试Taro bug */}
        {/* <Switch
          onChange={this.onSwitchChange}
        ></Switch>
        <View>
          {
            isChecked ? (
              <View className="module-box">
                <Text className="title">保险</Text>
                <View className="insurance-name">
                  <Text>人身意外险</Text>
                  <Text>¥ 30/人</Text>
                </View>
              </View>
            ) : null
          }
        </View> */}
        <View className="price-item">
          <View className="color-red">
            ¥ <Text className="price color-red">{price}</Text>
          </View>
          <View className="order-btn" onClick={this.onOrder}>
            订
          </View>
        </View>
        <Button className="share-btn" openType="share">
          快将行程分享给好友吧
        </Button>
        {/*  机票底部  */}
        <View className="flight-info"></View>
      </View>
    );
  }
}
