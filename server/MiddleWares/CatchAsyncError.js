export const CatchAsyncError = (theFunction) => {
  return (req, res, next) => {
    Promise.resolve(theFunction(req, res, next)).catch((error) => {
      console.log("lỗi ở catchasync: ", error.message);
      next(error);
    });
  };
};
