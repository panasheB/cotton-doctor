import { Table,Button } from 'antd';
import { Box, TableContainer } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ReportingTable() {
  const [data, setData] = useState([
    {
     
      temperature: '27/18 (°C)',
      wind: '200(m/s)',
      rainfall: '105(mm)',
      humidity: "60%",
      light: '5000 lux',
    }
  ]);
  useEffect(() => {
    axios
      .get('path')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const reportColunm = [
  
    {
      title: 'Temperature',
      dataIndex: 'temperature',
      key: 'temperature'
    },
    {
      title: 'Wind Speed',
      dataIndex: 'wind',
      key: 'wind'
    },
    {
      title: 'Rainfall',
      dataIndex: 'rainfall',
      key: 'rainfall'
    },

    {
      title: 'Humudity',
      dataIndex: 'humidity',
      key: 'humidity'
    },

    {
      title: 'Light Intensity',
      dataIndex: 'light',
      key: 'light'
    },

    {
      title: 'Action',
      key: 'action',
      render: () => (
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button  type="primary" ghost>
            Get Recommendations
          </Button>
        </div>
      )
    }
 
  ];

  return (
    <Box>


      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table
          columns={reportColunm}
          dataSource={data}
          size="small"
          pagination={{
            pageSize: 2
          }}
        />
      </TableContainer>
    </Box>
  );
}
