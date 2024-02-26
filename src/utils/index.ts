import { users } from "../data";
import {IUserError} from "../interface/user";;

export const parseMessage = (message: string): any => {
  let parsedMessage;
  try {
    parsedMessage = JSON.parse(message);
  } catch (error) {
    console.error('Parsed Error', error);
  }

  return {
    ...parsedMessage,
    data: parsedMessage.data ? JSON.parse(parsedMessage.data) : '',
  };
};

export const stringifyMessage = (data: any): any => {
  return JSON.stringify({ ...data, data: JSON.stringify(data.data) });
};

export const validateUser = ({ data }: any): IUserError => {
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
