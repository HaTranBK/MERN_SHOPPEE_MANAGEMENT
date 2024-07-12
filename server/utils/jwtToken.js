export const generateToke = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();
  //Lưu ý là cookieName nếu giống nhau thì cái cũ sẽ bị ghi đè.
  const cookieName = user.role === "Admin" ? "adminToken" : "userToken";
  res
    .status(statusCode)
    .cookie(cookieName, token, {
      //expire thì xét dạng ngày tháng, còn maxAge thì xét dạng giây
      // httpOnly: true, //dùng để chặn kiểu attack XSS. Tức là chỉ có request HTTP mới lấy được cookie, nếu xét bằng false thì người ta có thể dùng devtool rồi gõ document.cookie sẽ cho ra cookie luôn
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
