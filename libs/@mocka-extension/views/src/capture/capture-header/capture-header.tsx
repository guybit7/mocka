import { useSharedState } from '@me/common';
import { Box, Typography } from '@mui/material';
import './capture-header.scss';

export function CaptureHeader() {
  const { state, setState } = useSharedState();

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
