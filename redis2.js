const express = require("express");

const app = express();

const { decrby, exists, get, incrby, set, setnx } = require("./module.redis");

app.listen(3001, () => {
  console.log("The app is listening on port 3001");
});

app.get("/order", async (req, res) => {
  const time = new Date().getTime();

  //gia su so luong ton kho hien tai la 10
  const slTonKho = 10;

  //ten products ip13
  const keyName = "iPhone13";

  //gia su moi lan mua thi luong tieu thu ton kho la 1
  const slMua = 1;

  //So luong da ban ra, neu chua ba thi set = 0, con neu ban thi update + 1 moi lan user order thanh cong.
  const getKey = await exists(keyName);
  if (!getKey) {
    //set = 0

    //setnx
    //Luu y: Nếu có đồng thời hai hay nhiều người truy cập mua hàng cùng 1 thời điểm thì sử dụng
    // setnx sẽ không được đặt lại
    await setnx(keyName, 0);
  }

  //Lay sl ban ra
  const slBanRa = await get(keyName);

  //Neu sl ban ra + so luong mua (slMua) > slTonKho return failed!
  slBanRa = await incrby(keyName, slMua); // +1

  if (slBanRa > slTonKho) {
    console.log("Het Hang");
    return res.json({
      status: "err",
      msg: "Het Hang",
      time,
    });
  }
  
  //Neu user order thanh cong
  if (slBanRa > slTonKho) {
    await setnx("banquaroi", slBanRa - slTonKho);
  }

  return res.json({
    status: "Success",
    msg: "OK",
    time,
  });
});
