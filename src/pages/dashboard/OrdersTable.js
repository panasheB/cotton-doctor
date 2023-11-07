import { Table } from 'antd';
import { Box, TableContainer } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Drawer, Space } from 'antd';
import { HeatMapOutlined } from '@ant-design/icons';
import TranscationDetails from './TransactionDetails';

// third-party

export default function OrderTable() {
  const [transactions, setTranscactions] = useState([]);
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + '/transactions/get')
      .then((response) => {
        setTranscactions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const [transactionDetails, setTractionDetails] = useState(null);
  const [open, setOpen] = useState(false);
  const showDrawer = (record) => {
    setOpen(true);
    setTractionDetails(record);
  };

  const onClose = () => {
    setOpen(false);
  };

  const transactionColumn = [
    {
      title: '##',
      key: '##',
      render: (record) => (
        <div style={{ display: 'flex', gap: '10px' }}>
          <HeatMapOutlined style={{ color: 'blue', cursor: 'pointer' }} onClick={() => showDrawer(record)} />
        </div>
      )
    },
    {
      title: 'Transaction ID',
      dataIndex: 'transactionid',
      key: 'transactionid'
    },
    {
      title: 'Reference ID',
      dataIndex: '_id',
      key: '_id'
    },

    {
      title: 'Items',
      key: 'action',
      render: (record) => (
        <div style={{ display: 'flex', gap: '10px' }}>
          {record?.products?.map((product, index) => (
            <span key={index}>
              {product?.name}
              {index !== record?.products?.length - 1 ? ', ' : ''}
            </span>
          ))}
        </div>
      )
    },
    {
      title: 'Case Number',
      dataIndex: 'casenumber',
      key: 'casenumber'
    },
    {
      title: 'Payment',
      dataIndex: 'paymentMode',
      key: 'paymentMode'
    },
    {
      title: 'Cumulative Amount',
      key: 'action',
      render: (record) => (
        <div style={{ display: 'flex', gap: '10px' }}>
          {record?.currency} {record?.cumulativeAmount}
        </div>
      )
    },

    {
      title: 'Amount',
      key: 'action',
      render: (record) => (
        <div style={{ display: 'flex', gap: '10px' }}>
          {record?.currency} {record?.subtotal}
        </div>
      )
    },
    {
      title: 'Creation Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt) => createdAt?.slice(0, 10)
    }
  ];

  return (
    <Box>
      <Drawer
        title="Transaction Reciept"
        width={600}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
        <TranscationDetails transaction={transactionDetails} />
      </Drawer>

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
          columns={transactionColumn}
          dataSource={transactions}
          size="small"
          pagination={{
            pageSize: 2
          }}
        />
      </TableContainer>
    </Box>
  );
}
