import { createContext } from 'react';

import { User } from 'passport/common/models/user';
import { OperationError } from 'passport/features/error/models/operation-error';

export type LoginHandler = (data: User) => void;
export type LogoutHandler = () => void;
export type AlertHandler = (error: OperationError) => void;
export type NotifyHandler = (message: string) => void;
export type ClearHandler = (type: 'error' | 'notification') => void;

export interface PassportState {
  user?: User;
  error?: OperationError;
  notification?: string;
}

export interface PassportActions {
  login: LoginHandler;
  logout: LogoutHandler;
  alert: AlertHandler;
  notify: NotifyHandler;
  clear: ClearHandler;
}

export type PassportContextType = PassportState & PassportActions;

const defaultContext: PassportContextType = {
  alert: () => Promise.resolve(),
  clear: () => Promise.resolve(),
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  notify: () => Promise.resolve(),
};

export const PassportContext = createContext<PassportContextType>(defaultContext);
