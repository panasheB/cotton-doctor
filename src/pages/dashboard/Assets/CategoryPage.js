import { Grid } from '@mui/material';
import MainCard from 'components/MainCard';
import { Button, Drawer, Space } from 'antd';
import { useState } from 'react';
import AddCategory from './AddCategory';
import CategoryTable from './CategoryTable';

// avatar style

const CategoryPage = () => {
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
        title="Add Category"
        width={500}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button>Cancel</Button>
            <Button type="primary">OK</Button>
          </Space>
        }
      >
        <AddCategory />
      </Drawer>

      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

        <Grid item xs={12} md={12} lg={12}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <div style={{ margin: '10px' }}>
              <Button type="primary" ghost onClick={() => showDrawer()}>
                New Category
              </Button>
            </div>
            <CategoryTable />
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
};

export default CategoryPage;
