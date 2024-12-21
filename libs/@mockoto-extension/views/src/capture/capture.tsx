import { Box } from '@mui/material';
import CaptureHeader from './capture-header/capture-header';
import './capture.scss';
import CapturesTable from './captures-table/captures-table';

export function Capture() {
  return (
    <Box className="capture-container">
      <CaptureHeader />
      <CapturesTable />
    </Box>
  );
}

export default Capture;
