# muiltiple-request-redis
Thực hiện giải pháp đặt hàng với số lượng 1 nhưng 2 người mua.

- Atom (tính nguyên tử): Không thể để 2 nguyên tử hoạt động trên cùng một biến cùng một lúc ví dụ:
  + Chuyển tiền từ tk A -> tk B bao gồm 2 hoạt động rút tiền từ tk A -> cộng vào tk B và thực hiện các thao tác trong 1 giao dịch nguyên tử đảm bảo rằng DB ở trong trạng thái nhất quán và tiền sẽ không có ở tk B và không trừ đi ở tk A nếu hoạt động giao dịch trên không thực hiện thành công
