import { Grid } from '@mui/material';
import MainCard from 'components/MainCard';
// import { useState } from 'react';
import AssetTable from './MaintenanceTable.js';

// avatar style
const MaintenancePage = () => {
  return (
    <>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

        <Grid item xs={12} md={12} lg={12}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <AssetTable />
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
};

export default MaintenancePage;
