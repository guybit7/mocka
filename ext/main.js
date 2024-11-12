const server = '';
a
tabsSelectDom.addEventListener('change', async (e) => {
    const response = await chrome.runtime.sendMessage({id: e.target.value, server: server});
})
