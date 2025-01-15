export default interface IFailResponse {
  message: string;
  errors: {
    [key: string]: string;
  };
}
