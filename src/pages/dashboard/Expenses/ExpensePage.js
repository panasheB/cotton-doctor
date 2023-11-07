import React, { useState } from 'react';
import {Button, Drawer, Space } from 'antd';
import ExpenseTable from './ExpenseTable';
import AddExpense from './AddExpense';
import MainCard from 'components/MainCard';
const ExpensePage = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Drawer
        title="Add Expense"
        width={500}
        onClose={onClose}
        visible={open}
        footer={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary">OK</Button>
          </Space>
        }
      >
        <AddExpense />
      </Drawer>

   



     
          <MainCard sx={{ mt: 2 }} content={false}>
            <div style={{ margin: '10px' }}>
            <Button type="primary" ghost onClick={showDrawer}>
                New Expense
              </Button>
            </div>
      
            <ExpenseTable />
          </MainCard>
    
    </>
  );
};

export default ExpensePage;
