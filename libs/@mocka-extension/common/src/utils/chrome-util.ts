export const getTabs = async () => {
  return await chrome.tabs.query({});
};
