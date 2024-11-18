import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { AtCalendar } from "taro-ui";
import { MIN_DATE, MAX_DATE } from "@/common/constant.js";
import { useSelector, useDispatch } from "react-redux";

import "./calendar.scss";

export default function Calendar() {
  const flightIndex = useSelector((state) => state.flightIndex);
  const dispatch = useDispatch();

  const onDateSelect = (date: any) => {
    const {
      value: { start },
    } = date;
    dispatch({
      type: "updateState",
      payload: {
        dptDate: start,
      },
    });
    Taro.navigateBack();
  };

  return (
    <View className="calendar-page">
      <AtCalendar
        currentDate={flightIndex.dptDate}
        minDate={MIN_DATE}
        maxDate={MAX_DATE}
        onSelectDate={onDateSelect}
      ></AtCalendar>
    </View>
  );
}
