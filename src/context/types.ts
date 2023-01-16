export interface IAuthContext {
  accessToken: string;
  name: string;
  id: number;
  email: string;
  role: string;
}

export type AuthContextValueType = {
  auth : IAuthContext;
  setAuth: React.Dispatch<React.SetStateAction<IAuthContext>>
}

export type AuthProviderType = {
  children: React.ReactNode;
}