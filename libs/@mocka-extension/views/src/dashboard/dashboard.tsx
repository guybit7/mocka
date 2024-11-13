import { useEffect, useState } from 'react';
import './dashboard.scss';
import { getTabs, sendMessage } from '@me/common';
import { Button, FormControl, InputLabel, Menu, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import Divider from '@mui/material/Divider';

export function Dashboard() {
  const [tabs, setTabs] = useState([] as any[]);

  const [formData, setFormData] = useState({
    tab: '',
    groupId: '',
    domainList: 'http://localhost:3000', // change to list
  } as any);

  async function initTabsList() {
    const tabs = await getTabs();
    const theTabs = [];
    for (const tab of tabs) {
      theTabs.push({
        label: tab.title,
        id: tab.id,
      });
    }
    setTabs(theTabs);
  }
  useEffect(() => {
    initTabsList();
  }, []);

  const handleSelectTab = (event: SelectChangeEvent) => {
    setFormData((prevData: any) => ({
      ...prevData,
      tab: event.target.value as string,
    }));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStart = async () => {
    console.log(formData);
    const messageResponse = await sendMessage({
      id: formData.tab.id,
      groupId: formData.groupId,
      domainList: [formData.domainList],
    });
  };
  const handleStop = () => {
    console.log(formData);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-form">
        <FormControl fullWidth>
          <TextField
            className="me-text-field"
            name="domainList"
            id="domainList"
            value={formData.domainList}
            label="Domain List"
            variant="outlined"
            onChange={handleInputChange}
          />
        </FormControl>
        {/* <Divider /> */}
        <FormControl fullWidth>
          <InputLabel id="select-tab-label">Tab</InputLabel>
          <Select
            labelId="select-tab-label"
            id="select-tab-id"
            value={formData.tab}
            label="Tab"
            onChange={handleSelectTab}
          >
            {tabs &&
              tabs.map(t => {
                return <MenuItem value={t}>{t.label} </MenuItem>;
              })}
          </Select>
        </FormControl>
        {/* <Divider /> */}
        <FormControl fullWidth>
          <TextField name="groupId" id="groupId" label="Group Id" variant="outlined" onChange={handleInputChange} />
        </FormControl>
      </div>
      <div className="dashbaord-actions">
        <Button type="submit" variant="contained" onClick={handleStart}>
          Start
        </Button>
        <Button type="submit" variant="contained" onClick={handleStop}>
          Stop
        </Button>
      </div>
    </div>
  );
}

export default Dashboard;
/*

active
: 
true
audible
: 
false
autoDiscardable
: 
true
discarded
: 
false
favIconUrl
: 
"https://reactrouter.com/favicon-dark.png"
groupId
: 
-1
height
: 
1039
highlighted
: 
true
id
: 
138221087
incognito
: 
false
index
: 
9
lastAccessed
: 
1731406906733.958
mutedInfo
: 
{muted: false}
openerTabId
: 
138220874
pinned
: 
false
selected
: 
true
status
: 
"complete"
title
: 
"createHashRouter | React Router"
url
: 
"https://reactrouter.com/en/main/routers/create-hash-router"
width
: 
1920
windowId
: 
138212085

*/
