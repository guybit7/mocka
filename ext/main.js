const server = '';
const tabs = await chrome.tabs.query({});
const tabsSelectDom = document.getElementById('tabs');

for (const tab of tabs) {
    let option = document.createElement('option');
    option.text = tab.title;
    option.value = tab.id;
    tabsSelectDom.add(option);
}

tabsSelectDom.addEventListener('change', async (e) => {
    const response = await chrome.runtime.sendMessage({id: e.target.value, server: server});
})
