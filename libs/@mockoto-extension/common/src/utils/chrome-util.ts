export const getTabs = async () => {
  return await chrome.tabs.query({});
};

export const sendMessage = async (message: any) => {
  return await chrome.runtime.sendMessage(message);
};
