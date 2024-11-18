import {
  Swiper,
  SwiperItem,
  View,
  Text,
  Button,
  Image,
} from "@tarojs/components";
import "./index.scss";
import Tab from "@/components/Tab";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import NoExploit from "@/components/NoExploit";
import { adsReq } from "@/common/api.js";
import Taro from "@tarojs/taro";
import { useSelector, useDispatch } from "react-redux";
import tools from "@/common/tools.js";

const FLIGHT_TABS = [
  {
    label: "单程",
    id: 0,
  },
  {
    label: "多程",
    id: 1,
  },
  {
    label: "往返",
    id: 2,
  },
];

function Flight() {
  const dispatch = useDispatch();
  const flightIndex = useSelector((state) => state.flightIndex);
  const [isExchange, setIsExchange] = useState(false);
  const [adsList, setAdsList] = useState<{ id: number; imgUrl: string }[]>([]);
  // const dptCityName = "a",
  //   arrCityName = "b";
  const {
    dptCityName, // 出发城市
    arrCityName, // 到达城市
    dptDate,
  } = flightIndex || {};

  useEffect(() => {
    fetchAds();
    getLocationInfo();
  }, []);

  const handleTabClick = (id: number) => {
    console.log(`tab id: ${id}`);
  };

  const fetchAds = () => {
    (adsReq as any)().then((res) => {
      console.log("data: ", res);
      setAdsList(res.result);
    });
  };

  const exchangeCity = () => {};

  const chooseFlightCity = (type: string) => {
    dispatch({
      type: "updateState",
      payload: {
        cityType: type,
      },
    });
    Taro.navigateTo({
      url: "/pages/airportList/airportList",
    });
  };

  const chooseFlightDate = () => {
    Taro.navigateTo({
      url: "/pages/calendar/calendar",
    });
  };

  const onLinkToList = () => {};

  /**
   * 获取经纬度
   * @{param}
   */
  const getLocationInfo = () => {
    // 1、获取经纬度
    Taro.getLocation({
      type: "gcj02",
    })
      .then((res) => {
        console.log("locationInfo：", res);
        const { latitude, longitude } = res;
        // 2、根据经纬度向 腾讯地图 获取所在城市（在腾讯地图那里需要先注册一个 key）
        getCity({ latitude, longitude });
      })
      .catch((e) => {
        console.log("经纬度获取失败: ", e);
        tools.showToast("经纬度获取失败~");
      });
  };

  const getCity = ({ latitude, longitude }) => {
    Taro.request({
      url: `https://apis.map.qq.com/ws/geocoder/v1/?key=JKLBZ-WN3K4-HFSU6-DB5UU-2FGCS-CLB4J&location=${latitude},${longitude}`,
    })
      .then((res) => {
        const { data } = res;
        const cityInfo = data?.result?.ad_info || {};
        dispatch({
          type: "updateState",
          payload: {
            dptCityId: cityInfo.city_code || 2,
            dptCityName: cityInfo.city || "上海",
          },
        });
      })
      .catch(() => {
        tools.showToast("位置获取失败~");
      });
  };

  return (
    <View className="flight-container">
      <View className="flight-top">
        <Tab
          tabList={FLIGHT_TABS}
          onTabClick={handleTabClick}
          className="flight-index-tab"
        >
          <SwiperItem>
            <View className="item station">
              <View
                className={`cell from ${isExchange ? "slide" : ""}`}
                onClick={() => chooseFlightCity("depart")}
              >
                {dptCityName}
              </View>
              <Text
                onClick={exchangeCity}
                className={`icon-zhihuan iconfont ${
                  isExchange ? "active" : ""
                }`}
              ></Text>
              <View
                className={`cell to ${isExchange ? "slide" : ""}`}
                onClick={() => chooseFlightCity("arrive")}
              >
                {arrCityName}
              </View>
            </View>
            <View className="item date" onClick={chooseFlightDate}>
              {dayjs(dptDate).format("M月D日")}
            </View>
            <Button className="search-btn" onClick={onLinkToList}>
              搜一下吧～
            </Button>
          </SwiperItem>
          {/*  往返  */}
          <SwiperItem>
            <NoExploit className="no-data" />
          </SwiperItem>
          {/*  多程  */}
          <SwiperItem>
            <NoExploit className="no-data" />
          </SwiperItem>
        </Tab>
      </View>
      <View className="alipay-swiper" style={{ margin: "15px" }}>
        <Swiper className="advs-banner-bd" autoplay circular interval={3000}>
          {adsList.map((item) => {
            return (
              <SwiperItem key={item.id} className="item">
                <Image className="img" src={item.imgUrl}></Image>
              </SwiperItem>
            );
          })}
        </Swiper>
      </View>
      {/*  机票底部  */}
      <View className="flight-info"></View>
    </View>
  );
}

export default Flight;
