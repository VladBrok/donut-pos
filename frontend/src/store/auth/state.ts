export interface IAuthState {
  userId: string;
}

function state(): IAuthState {
  return {
    userId: "anonymous",
  };
}

export default state;
