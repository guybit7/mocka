import { sendMessage, useSharedState } from '@me/common';
import { MuTable } from '@mockoto-ui-common/ui-components';
import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { capturesTableHeaders } from './captures-table-config';
import './captures-table.scss';

export function CapturesTable() {
  const { state, setState } = useSharedState();
  const [data, setData] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const handleMessage = (message: any, sender: any, sendResponse: any) => {
      if (message.type === 'CAPTURE') {
        console.log('Payload:', message.payload);
        setData(prevData => [message.payload, ...prevData]);
      }
    };
    chrome.runtime.onMessage.addListener(handleMessage);
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  const onRowClick = (row: any) => {
    console.log(row);
  };
  const dataString = JSON.stringify(data);
  const sizeInBytes = new TextEncoder().encode(dataString).length;
  console.log(`Size of data in bytes: ${sizeInBytes}`);

  const handleStop = async () => {
    const messageResponse = await sendMessage({
      type: 'STOP',
      payload: {
        tabId: state.captureState?.selectedTab?.id,
      },
    });
    setState({
      captureState: {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        ...state.captureState!,
        mocks: data,
      },
    });
    navigate('/summary');
  };

  return (
    <Box className="captures-table-container">
      <MuTable
        dataSource={data || []}
        key={'users-data'}
        headers={capturesTableHeaders}
        id={'users'}
        onRowClick={onRowClick}
        order={'desc'}
        orderBy={''}
        rowCount={0}
      ></MuTable>
      <Button onClick={handleStop} variant={'contained'} sx={{ background: 'rgb(139, 0, 0)', color: 'white' }}>
        STOP
      </Button>
    </Box>
  );
}

export default CapturesTable;
