import { Grid, Typography } from '@mui/material';
import ReportingTable from './ReportingTable';
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import avatar1 from 'assets/images/users/final.jpg';
import { Watermark } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';

// avatar style

const DashboardDefault = () => {

  
  const [reports, setReports] = useState(null);
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + '/dashboard/stats')
      .then((response) => {
        setReports(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  //sales
  const monthlySales = reports?.sales_today_week_month?.month || 0; //number
  const dailySales = reports?.sales_today_week_month?.today || 0; //number
  const totalProfit = reports?.weekly_sales_profit?.total_profit || 0; //number
  const items = reports?.items || 0; //number
  const quantiityInStock = reports?.item_quantities?.['0']?.quantity || 0; //number
  const formattedMonthly = `${monthlySales} ...`;
  const formattedDaily = `${dailySales} ...`;
  const kgs = `${quantiityInStock} ...`;
  const formattedTotalProfit = `$$  ${totalProfit} ...`;

  return (
    <Watermark>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        {/* row 1 */}
        <Grid item xs={12} sx={{ mb: -2.25 }}>
          <Typography variant="h5">Cotton Doctor</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce title="Temperature" count="27/18 (°C)" percentage={formattedMonthly} extra={formattedDaily} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
      <AnalyticEcommerce title="Wind Speed" count="200(m/s)" percentage="5000 lux" extra={items} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce
            title="Rainfall"
            count="105(mm)"
            percentage={formattedTotalProfit}
            isLoss
            color="warning"
            extra={totalProfit}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce title="Humudity Level" count="60%" percentage={kgs} isLoss extra={quantiityInStock} />
        </Grid>

        <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

        <Grid item xs={12} md={12} lg={12}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Cotton Doctor</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <ReportingTable />
          </MainCard>
        </Grid>
      </Grid>

      <img
        style={{
          zIndex: 10,
          maxWidth: 400,
          display: 'block',
          margin: '0 auto'
        }}
        src={avatar1}
        alt="示例图片"
      />
    </Watermark>
  );
};

export default DashboardDefault;
