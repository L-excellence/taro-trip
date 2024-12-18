import dayjs from "dayjs";

const initialState: any = {
  dptCityId: 2, // 城市 id
  dptCityName: "上海", // 城市 name
  dptAirportName: "虹桥机场",
  arrCityId: 1, // 抵达的城市名称
  arrCityName: "北京",
  arrAirportName: "大兴机场",
  cityType: "depart", // 选择的城市类型 depart: 出发， arrive：到达
  dptDate: dayjs().format("YYYY-MM-DD"), // 起飞时间
};

function reducer(state = initialState, action: any): any {
  switch (action.type) {
    case "updateState": {
      console.log("updateState: ", action.payload);
      return {
        ...state,
        ...action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

export default reducer;
