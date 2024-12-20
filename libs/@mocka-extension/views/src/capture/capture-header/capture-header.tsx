import { useSharedState } from '@me/common';
import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import './capture-header.scss';

export function CaptureHeader() {
  const { state, setState } = useSharedState();
  useEffect(() => {
    console.log(state);
    // setState({
    //   captureState: {
    //     domainValue: 'https://gw.yad2.co.il',
    //     group: {
    //       _id: '67504f05627ef193348cd90a',
    //       name: '123',
    //       spaceId: '674f676ac904d7a56be2c955',
    //     },
    //     space: {
    //       _id: '674f676ac904d7a56be2c955',
    //       name: 'nitay',
    //     },
    //     selectedTab: {
    //       label: 'MockaUi',
    //       id: 138231823,
    //     },
    //   },
    // });
  }, []);

  const spaceName = state?.captureState?.space?.name || 'N/A';
  const groupName = state?.captureState?.group?.name || 'N/A';
  const selectedTabLabel = state?.captureState?.selectedTab?.label || 'N/A';

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: '0.25rem', // Converted 4px and 8px to rem
        borderBottom: '0.0625rem solid #ccc', // Converted 1px to rem
        fontSize: '0.75rem', // Converted 12px to rem
        fontWeight: 'bold',
      }}
    >
      <Typography sx={{ paddingRight: '0.5rem' }} noWrap>
        Space: {spaceName}
      </Typography>
      <Box
        sx={{
          height: '1rem', // Converted 16px to rem
          width: '0.0625rem', // Converted 1px to rem
          backgroundColor: '#ccc',
          margin: '0 0.5rem', // Converted 8px to rem
        }}
      />
      <Typography sx={{ paddingRight: '0.5rem' }} noWrap>
        Group: {groupName}
      </Typography>
      <Box
        sx={{
          height: '1rem', // Converted 16px to rem
          width: '0.0625rem', // Converted 1px to rem
          backgroundColor: '#ccc',
          margin: '0 0.5rem', // Converted 8px to rem
        }}
      />
      <Typography noWrap>Tab: {selectedTabLabel}</Typography>
    </Box>
  );
}

export default CaptureHeader;
