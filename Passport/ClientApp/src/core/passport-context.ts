import { createContext } from 'react';

import { User } from 'passport/common/models/user';

export type LoginHandler = (data: User) => void;
export type LogoutHandler = () => void;

export interface PassportState {
  user?: User;
}

export interface PassportActions {
  login: LoginHandler;
  logout: LogoutHandler;
}

export type PassportContextType = PassportState & PassportActions;

const defaultContext: PassportContextType = {
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
};

export const PassportContext = createContext<PassportContextType>(defaultContext);
