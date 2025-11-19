class AppError extends Error {}
class NetworkError extends Error {}

class AppContentError extends AppError {}
class AppNetworkError extends AppError {}
class AppFloorContentError extends AppError {}
class AppUrlError extends AppError {}

const CustomError = (data, errorClass) => {
  // eslint-disable-next-line new-cap
  const error = new errorClass('что опять');
  error.data = data;
  return error;
};

const AppContentCustomError = data => CustomError(data, AppContentError);
const AppNetworkCustomError = data => CustomError(data, AppNetworkError);
const AppFloorContentCustomError = data => CustomError(data, AppFloorContentError);
const AppUrlCustomError = data => CustomError(data, AppUrlError);


export {
  AppError,
  AppContentError,
  AppFloorContentError,
  AppNetworkError,
  AppUrlError,
  NetworkError,
  CustomError,
  AppContentCustomError,
  AppNetworkCustomError,
  AppFloorContentCustomError,
  AppUrlCustomError,
};
