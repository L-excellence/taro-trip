import { ScrollView, View } from "@tarojs/components";
import "./index.scss";
import tools from "@/common/tools.js";
import { airportCityListReq } from "@/common/api.js";
import { useEffect, useState } from "react";
import CityItem from "./components/CityItem/CityItem";

export default function AirPortList() {
  const [cityListObj, setCityListObj] = useState<Record<string, any[]>>({});
  const [letterList, setLetterList] = useState<string[]>([]);
  const [currentLetter, setCurrentLetter] = useState("");

  useEffect(() => {
    getCityList();
  }, []);

  const getCityList = () => {
    tools.showLoading();
    airportCityListReq()
      .then((res) => {
        console.log("getCityList res: ", res);
        const { result } = res;
        const cityObj = formatList(result);
        setCityListObj(cityObj);
        setLetterList(Object.keys(cityObj));
      })
      .finally(() => {
        tools.hideLoading();
      });
  };

  const handleLetter = (letter: string) => {
    setCurrentLetter(letter);
  };

  const formatList = (cityList: any[]) => {
    const obj = {};
    if (cityList.length) {
      cityList.map((ele) => {
        const { firstLetter } = ele;
        if (!obj[firstLetter]) {
          obj[firstLetter] = [];
        }
        obj[firstLetter].push(ele);
      });
    }
    return obj;
  };

  console.log("letterList: ", letterList);

  return (
    <View className="airport-list-container">
      <ScrollView
        scrollY
        scrollWithAnimation
        style={{ height: "100vh" }}
        // 传入 CityItem label 节点的 id 值，实现滚动定位
        scrollIntoView={currentLetter}
      >
        {letterList.map((item) => {
          const cityList = cityListObj[item];
          return <CityItem key={item} label={item} cityList={cityList} />;
        })}
      </ScrollView>

      <View className="letter-container">
        {letterList.map((item) => (
          <View
            key={item}
            className="letter-item"
            onClick={() => handleLetter(item)}
          >
            {item}
          </View>
        ))}
      </View>
    </View>
  );
}
