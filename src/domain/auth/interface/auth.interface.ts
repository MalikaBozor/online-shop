export interface IMessage {
  message: string;
}

export interface IForget {
  forgetToken: string;
}

export interface IRefreshAccess {
  accessToken: string;
}

export interface ILogin {
  accessToken: string;
  refreshToken: string;
}
