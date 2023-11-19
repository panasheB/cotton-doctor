import { Table } from 'antd';
import { Box, TableContainer } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ReportingTable() {
  const [data, setData] = useState([]);
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
      dataIndex: 'speed',
      key: 'speed'
    },
    {
      title: 'Rainfall',
      dataIndex: 'rainfall',
      key: 'rainfall'
    },

    {
      title: 'Humudity',
      dataIndex: 'humudity',
      key: 'humudity'
    },

    {
      title: 'Leaf Wetness',
      dataIndex: 'leaf',
      key: 'leaf'
    },
 
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
