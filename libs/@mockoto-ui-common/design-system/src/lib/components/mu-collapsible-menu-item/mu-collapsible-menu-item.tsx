import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

// Define the type for each subItem
interface SubItem {
  label: string;
  icon: React.ReactNode;
  path: string;
}

// Define the props for the CollapsibleListItem component
interface CollapsibleListItemProps {
  label: string; // Label of the main list item
  icon: React.ReactNode; // Icon for the main list item
  subItems: SubItem[]; // Array of subItems
  onClick?: () => void; // Optional external onClick handler
  onClickNestedItem?: (item: SubItem) => void; // Optional external onClick handler
  iconCollapsed?: React.ReactNode; // Icon for collapsed state
  iconExpanded?: React.ReactNode; // Icon for expanded state
  defaultOpen?: boolean; // Default open state
  sx?: React.CSSProperties; // Optional styling props
}

export const MuCollapsibleListItem: React.FC<CollapsibleListItemProps> = ({
  label,
  icon,
  subItems,
  onClick,
  onClickNestedItem,
  iconCollapsed = <ExpandMore />,
  iconExpanded = <ExpandLess />,
  defaultOpen = true,
  sx = {},
}) => {
  const [open, setOpen] = useState(defaultOpen);

  const handleClick = () => {
    setOpen(!open);
    if (onClick) onClick(); // if there's an external onClick handler
  };

  const handleNestedItemClick = (item: SubItem) => {
    if (onClickNestedItem) {
      onClickNestedItem(item);
    }
  };

  return (
    <>
      <ListItemButton onClick={handleClick} sx={sx}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={label} />
        {open ? iconExpanded : iconCollapsed}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {subItems.map((item, index) => {
            return (
              <NavLink
                to={item.path} // The path for the navigation
                key={index} // Key for each NavLink
                style={({ isActive }) => ({
                  textDecoration: 'none',
                  width: '100%',
                  display: 'flex',
                  backgroundColor: isActive ? 'rgba(0, 123, 255, 0.2)' : 'transparent', // Highlight active item
                  color: isActive ? '#007bff' : 'inherit', // Change text color on active
                })}
              >
                <ListItemButton sx={{ pl: 4 }} onClick={() => handleNestedItemClick(item)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </NavLink>
            );
          })}
        </List>
      </Collapse>
    </>
  );
};

export default MuCollapsibleListItem;
