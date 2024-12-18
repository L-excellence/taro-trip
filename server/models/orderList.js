const express = require("express");
const router = express.Router();
// const sqlQuery = require("../mysql");

router.post("/order", async (req, res) => {
  try {
    const { userPhone, orderInfo } = req.body;
    const { dptCityName, arrCityName, dptTimeStr, dptTime, price } = orderInfo;
    // const createTableSql = `
    // create table if not exists orderList (
    //   id int auto_increment,
    //   userPhone char(11) not null,
    //   dptCityName char(50) not null,
    //   arrCityName char(50) not null,
    //   dptTimeStr char(50) not null,
    //   dptTime char(50) not null,
    //   price decimal not null,
    //   primary key (id)
    // ) engine=innodb;
    // `
    // await sqlQuery(createTableSql)
    // 插入对应字段值
    // const insetSql = `insert into orderList(id, userPhone, dptCityName, arrCityName, dptTimeStr, dptTime, price) values (null, '${userPhone}', '${dptCityName}', '${arrCityName}', '${dptTimeStr}', '${dptTime}', '${price}')`;
    // await sqlQuery(insetSql)
    res.send({
      code: 1,
      mes: "预定成功~",
    });
  } catch (err) {
    res.send({
      code: -1,
      mes: "请求失败",
      result: err,
    });
  }
});

// 查询订单
router.post("/getOrderList", async (req, res) => {
  try {
    const { userPhone } = req.body;
    // desc: 降序查询 asc: 升序
    // const querySql = `select * from orderList where userPhone=${userPhone} order by id desc`
    // const result = await sqlQuery(querySql)
    const result = await [
      {
        dptCityName: "上海",
        arrCityName: "北京",
        dptTimeStr: "2024-1118",
        dptTime: "2024-1118",
        price: 300,
        userPhone,
      },
    ];
    res.send({
      code: 1,
      mes: "查询成功",
      result,
    });
  } catch (err) {
    res.send({
      code: -1,
      mes: "请求失败",
      result: err,
    });
  }
});

module.exports = router;
