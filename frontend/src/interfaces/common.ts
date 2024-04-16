export interface Resp<T> {
  status: boolean;
  data: T;
}
export interface LoginResponse {
  user: IUser;
  token: string;
}
export interface IUser {
  id: string;
  userName: string;
  email: string;
  password: string;
}
export interface LoginData {
  email: string;
  password: string;
}
export interface RegisterData {
  userName: string;
  email: string;
  password: string;
}
export interface MessageData {
  id: string;
  userName: string;
  message: string;
}

export interface IPayload {
  id: string;
  email: string;
  userName: string;
}
