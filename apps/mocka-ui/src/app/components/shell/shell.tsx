import { Link, Route, BrowserRouter as  Router, Routes } from "react-router-dom";
import Mock from "../mock/mock";
import Tabs from "@mui/material/Tabs";
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState }  from 'react';

export function Shell() {

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="h-full flex flex-col">
      <Box sx={{ width: '100%', bgcolor: 'background.paper', display: 'flex', flexDirection: 'row' }}>
        <Tabs value={value} onChange={handleChange} centered>
          {/* <Tab label="Add" component={Link} to="/add"/> */}
          <Tab label="List" component={Link} to="/list" />
        </Tabs>
      </Box>
    </div>
  );
}

export default Shell;
    // <Routes>
    //   <Route path="/" element={<Mock />}>
    //     {/* <Route index element={<Home />} />
    //     <Route path="about" element={<About />} /> */}
    //     {/* <Route path="*" element={<NoMatch />} /> */}
    //   </Route>
    // </Routes>