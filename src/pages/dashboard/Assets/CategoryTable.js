import { Table } from 'antd';
import { Box, TableContainer } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Drawer, Space, Tooltip, Watermark } from 'antd';
import { BsTrashFill } from 'react-icons/bs';
import avatar1 from 'assets/images/users/logo3.jpg';
import { PlusOutlined } from '@ant-design/icons';
import UpdateCategory from './UpdateCategory';
import DeleteCategory from './DeleteCategory';

// third-party

export default function CategoryTable() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + '/assetCategories')
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const [itemDetails, setItemDetails] = useState(null);
  const [open, setOpen] = useState(false);
  const showDrawer = (record) => {
    setOpen(true);
    setItemDetails(record);
  };

  const onClose = () => {
    setOpen(false);
  };

  //updating
  const [itemDetails1, setItemDetails1] = useState(null);
  const [open1, setOpen1] = useState(false);
  const showDrawer1 = (record) => {
    setOpen1(true);
    setItemDetails1(record);
  };

  const onClose1 = () => {
    setOpen1(false);
  };

  const itemColumn = [
    {
      title: ' Category Name',
      dataIndex: 'CategoryName',
      key: 'CategoryName'
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
            <Tooltip title="Delete Category" color="grey">
              <BsTrashFill size={12} color="#69a3de" style={{ cursor: 'pointer' }} onClick={() => showDrawer(record)} />
            </Tooltip>
          </Space>

          <Tooltip title="Update Category" color="grey">
            <PlusOutlined style={{ color: 'blue', cursor: 'pointer' }} onClick={() => showDrawer1(record)} />
          </Tooltip>
        </div>
      )
    }
  ];

  return (
    <Box>
      <Watermark>
        <Drawer
          title="Delete Item"
          width={600}
          onClose={onClose}
          open={open}
          extra={
            <Space>
              <Button>Cancel</Button>
              <Button type="primary">OK</Button>
            </Space>
          }
        >
          <DeleteCategory itemDetails={itemDetails} />
        </Drawer>

        <Drawer
          title="Update Category"
          width={600}
          onClose={onClose1}
          open={open1}
          extra={
            <Space>
              <Button>Cancel</Button>
              <Button type="primary">OK</Button>
            </Space>
          }
        >
          <UpdateCategory itemDetails={itemDetails1} />
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
            columns={itemColumn}
            dataSource={items}
            size="small"
            pagination={{
              pageSize: 10
            }}
          />

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
