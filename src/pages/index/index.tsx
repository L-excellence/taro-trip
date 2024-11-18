import { useState } from "react";
import { View } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import "./index.scss";
import NoExploit from "@/components/NoExploit/index";
import FlightIndex from "@/pages/flight/index";

const DEFAULT_TAB_LIST = [
  { title: "飞船", tab: "flight", index: 0 },
  { title: "火车票", tab: "train", index: 1 },
  { title: "酒店", tab: "hotel", index: 2 },
  { title: "汽车票", tab: "bus", index: 3 },
];

export default function Index() {
  const [tabIndex, setTabIndex] = useState(0);
  const innerStyle = {
    width: `${100 / DEFAULT_TAB_LIST.length}%`,
    transform: `translateX(${tabIndex * 100}%)`,
  };

  useLoad(() => {
    console.log("Page loaded.");
  });

  const switchTab = (index: number) => {
    setTabIndex(index);
  };

  return (
    <View className="index-container">
      <View className="top">
        <View className="index-tab">
          {DEFAULT_TAB_LIST.map((item) => (
            <View
              key={item.tab}
              className={`index_tab_item ${item.tab} ${
                tabIndex === item.index ? "current" : ""
              }`}
              onClick={() => switchTab(item.index)}
            >
              {item.title}
            </View>
          ))}
        </View>
        <View className="scrollbar" style={innerStyle}></View>
      </View>
      {DEFAULT_TAB_LIST[tabIndex]["tab"] === "flight" ? (
        <View className="content">
          <FlightIndex />
        </View>
      ) : (
        <NoExploit />
      )}
    </View>
  );
}
