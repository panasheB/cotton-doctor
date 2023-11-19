import { Grid } from '@mui/material';
import MainCard from 'components/MainCard';
import { Button } from 'antd';
// import { useState } from 'react';
import DetectDiseaseFile from './DetectDiseaseFile';


const DetectDiseasePage = () => {
//   const [open, setOpen] = useState(false);
//   const showDrawer = () => {
//     setOpen(true);
//   };

//   const onClose = () => {
//     setOpen(false);
//   };

  return (
    <>
  

      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

        <Grid item xs={12} md={12} lg={12}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <div style={{ margin: '10px' }}>
              <Button type="primary" ghost >
                New Research
              </Button>
            </div>
            <DetectDiseaseFile />
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
};

export default DetectDiseasePage;
