import React, { useState, useEffect } from 'react';
import { Table, Button, Drawer, Space, Tooltip, Watermark } from 'antd';
import { BsTrashFill } from 'react-icons/bs';
import DeleteExpense from './DeleteExpense';
import UpdateExpense from './UpdateExpense';
import avatar1 from 'assets/images/users/logo3.jpg';
import { Box, TableContainer } from '@mui/material';
import axios from 'axios';

export default function ExpenseTable() {
  const [expenses, setExpenses] = useState([]);
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + '/expenses')
      .then((response) => {
        setExpenses(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [expenseDetails, setExpenseDetails] = useState(null);
  const [openDeleteDrawer, setOpenDeleteDrawer] = useState(false);
  const showDeleteDrawer = (record) => {
    setOpenDeleteDrawer(true);
    setExpenseDetails(record);
  };
  const closeDeleteDrawer = () => {
    setOpenDeleteDrawer(false);
  };

  const [expenseDetailsUpdate, setExpenseDetailsUpdate] = useState(null);
  const [openUpdateDrawer, setOpenUpdateDrawer] = useState(false);
  const showUpdateDrawer = (record) => {
    setOpenUpdateDrawer(true);
    setExpenseDetailsUpdate(record);
  };
  const closeUpdateDrawer = () => {
    setOpenUpdateDrawer(false);
  };

  const columns = [
    {
      title: 'Expense Name',
      dataIndex: 'Name',
      key: 'Name'
    },
    {
      title: 'Category',
      dataIndex: 'Category',
      key: 'Category'
    },
    {
      title: 'Amount',
      dataIndex: 'Amount',
      key: 'Amount'
    },
    {
      title: 'Description',
      dataIndex: 'Description',
      key: 'Description'
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <div style={{ display: 'flex', gap: '10px' }}>
          <Space size="middle">
            <Tooltip title="Delete Expense" color="grey">
              <BsTrashFill size={12} color="#69a3de" style={{ cursor: 'pointer' }} onClick={() => showDeleteDrawer(record)} />
            </Tooltip>
          </Space>
          <Tooltip title="Update Expense" color="grey">
            <Button type="primary" onClick={() => showUpdateDrawer(record)}>
              Update
            </Button>
          </Tooltip>
        </div>
      )
    }
  ];

  return (

 



<Box>
<Watermark>
<Drawer
        title="Delete Expense"
        width={600}
        onClose={closeDeleteDrawer}
        visible={openDeleteDrawer}
        footer={
          <div style={{ textAlign: 'right' }}>
            <Button onClick={closeDeleteDrawer} style={{ marginRight: 8 }}>
              Cancel
            </Button>
          </div>
        }
      >
        <DeleteExpense expenseDetails={expenseDetails} />
      </Drawer>

      <Drawer
        title="Update Expense"
        width={600}
        onClose={closeUpdateDrawer}
        visible={openUpdateDrawer}
        footer={
          <div style={{ textAlign: 'right' }}>
            <Button onClick={closeUpdateDrawer} style={{ marginRight: 8 }}>
              Cancel
            </Button>
          </div>
        }
      >
        <UpdateExpense expenseDetails={expenseDetailsUpdate} />
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
   <Table columns={columns} dataSource={expenses} />

    <img
      style={{
        zIndex: 10,
        maxWidth: 200,
        display: 'block',
        margin: '0 auto'
      }}
      src={avatar1}
      alt="示例图片"
    />
  </TableContainer>
</Watermark>
</Box>
  );
}
