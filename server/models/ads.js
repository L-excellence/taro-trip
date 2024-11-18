const express = require("express");
const router = express.Router();
// const sqlQuery = require("../mysql");

router.get("/advertising", async (req, res) => {
  const strSql = `select * from ads`;
  try {
    // const result = await sqlQuery(strSql);
    const result = await [
      {
        id: 1,
        imgUrl:
          "https://fastly.picsum.photos/id/1057/500/200.jpg?hmac=1bjMP0fnk8Ct1sqbnYZxHD5ewyTN0iFktXan2na0_7s",
      },
      {
        id: 2,
        imgUrl:
          "https://fastly.picsum.photos/id/835/500/200.jpg?hmac=Ow3YYkM9A2Q_VQP8Aes5LftuWQchRO-8iHddvfK23k8",
      },
    ];
    res.send({
      code: 1,
      message: "请求成功",
      result,
    });
  } catch (err) {
    res.send({
      code: -1,
      message: "失败",
    });
  }
});

module.exports = router;
