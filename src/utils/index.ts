import { IUserError } from "../types/user";
import { users } from "../data";
import {IWSMessage, IWSRegRequest} from "../types/wsRequest";

export const parseMessage = (message: string): IWSMessage => {
  let parsedMessage;
  try {
    parsedMessage = JSON.parse(message);
  } catch (error) {
    console.error('Parsed Error', error);
  }

  return {
    ...parsedMessage,
    data: parsedMessage.data ? JSON.parse(parsedMessage.data) : '',
  } as IWSMessage;
};

export const validateUser = (message: IWSRegRequest): IUserError => {
  const data = message.data;
  const isUserExist = users.find(({ name }) => name === data.name);

  if (isUserExist) {
    return {
      error: !!isUserExist,
      errorText: `User with name ${data.name} is already exists. Please choose another name`,
    };
  }

  return {
    error: !!isUserExist,
    errorText: ''
  };
};

export const stringifyMessage = (data: any): any => {
  return JSON.stringify({ ...data, data: JSON.stringify(data.data) });
};

export const generateId = (): string => Date.now().toString();