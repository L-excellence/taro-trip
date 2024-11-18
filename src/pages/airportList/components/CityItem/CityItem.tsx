import { Text, View } from "@tarojs/components";
import "./index.scss";
import Taro from "@tarojs/taro";
import { useSelector, useDispatch } from "react-redux";

interface IProps {
  label: string; // 字母
  cityList: any[]; // 字母对应的城市列表
  dispatch: Function;
  cityType: string;
}

function CityItem({ label, cityList }: IProps) {
  const dispatch = useDispatch();
  const flightIndex = useSelector((state) => state.flightIndex);

  const onCityClick = (cityInfo) => {
    const { cityType } = flightIndex;
    const { cityId, cityName, airportName } = cityInfo;
    dispatch({
      type: "updateState",
      payload:
        cityType === "depart"
          ? {
              dptCityId: cityId,
              dptAirportName: airportName,
              dptCityName: cityName,
            }
          : {
              arrCityId: cityId,
              arrAirportName: airportName,
              arrCityName: cityName,
            },
    });
    Taro.navigateBack(); // 回到上一页
  };

  return (
    <View className="list-item">
      <Text className="label" id={label}>
        {label}
      </Text>
      {cityList.map((item) => (
        <View key={item.id} className="name" onClick={() => onCityClick(item)}>
          {`${item.cityName} (${item.airportName})`}
        </View>
      ))}
    </View>
  );
}

export default CityItem;
