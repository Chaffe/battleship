export const parseMessage = (message) => {
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

export const stringifyMessage = (data) => {
  return JSON.stringify({ ...data, data: JSON.stringify(data.data) });
};
