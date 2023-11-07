import { Grid, Typography } from '@mui/material';
import OrdersTable from './OrdersTable';
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import avatar1 from 'assets/images/users/logo3.jpg';
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
  const weeklySales = reports?.sales_today_week_month?.week || 0; //number
  const monthlySales = reports?.sales_today_week_month?.month || 0; //number
  const dailySales = reports?.sales_today_week_month?.today || 0; //number

  // //profits
  const totalSales = reports?.weekly_sales_profit?.total_sales || 0; //number
  const totalProfit = reports?.weekly_sales_profit?.total_profit || 0; //number

  // //inventory
  const items = reports?.items || 0; //number
  const quantiityInStock = reports?.item_quantities?.['0']?.quantity || 0; //number

  // //stock
  // const lowStock = reports?.low_stock//aray

  // //quantities
  // const profitMargin = reports?.profit_margin//array//
  const formattedWeeklySales = `${weeklySales} weekly sales`;
  const formattedMonthly = `${monthlySales} monthly`;
  const formattedDaily = `${dailySales} sales`;
  const formattedItesm = `${items} items in stock`;
  const kgs = `${quantiityInStock} in stock`;
  const formattedWeekly = `${totalSales} Sales`;
  const formattedTotalProfit = `$$  ${totalProfit} Sales`;

  return (
    <Watermark>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        {/* row 1 */}
        <Grid item xs={12} sx={{ mb: -2.25 }}>
          <Typography variant="h5">Inventory Manager</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce title="Total Sales" count={formattedWeeklySales} percentage={formattedMonthly} extra={formattedDaily} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce title="Total Items" count={items} percentage={formattedItesm} extra={items} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce
            title="Profits"
            count={formattedWeekly}
            percentage={formattedTotalProfit}
            isLoss
            color="warning"
            extra={totalProfit}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce title="Quantity in Stock" count={quantiityInStock} percentage={kgs} isLoss extra={quantiityInStock} />
        </Grid>

        <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

        <Grid item xs={12} md={12} lg={12}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Transactions</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <OrdersTable />
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
