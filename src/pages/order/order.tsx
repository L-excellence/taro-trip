import { View, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import "./order.scss";

export default function Order() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  return (
    <View className="order">
      <Text>Order page.</Text>
    </View>
  );
}
