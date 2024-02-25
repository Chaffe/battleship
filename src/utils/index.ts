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
