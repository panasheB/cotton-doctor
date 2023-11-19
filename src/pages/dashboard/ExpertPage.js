import { Grid } from '@mui/material';
import ExpertsTable from './ExpertsTable';

import MainCard from 'components/MainCard';
import { Button, Drawer, Space } from 'antd';
import { useState } from 'react';
import AddExpert from './AddExpert';


const ExpertPage = () => {
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
        title="Add Expert"
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
        <AddExpert />
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
                New Expert
              </Button>
            </div>
            <ExpertsTable />
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
};

export default ExpertPage;
