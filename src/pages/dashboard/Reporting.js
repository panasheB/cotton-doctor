import { Grid, Typography } from '@mui/material';
import OrdersTable from './ReportingTable';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import { Table, Button, Spin } from 'antd';
import swal from 'sweetalert';

// avatar style

const Reporting = () => {
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

  const overStock = reports?.over_stock; //array

  const itemQuantites = reports?.item_quantities; //array//

  const formattedWeeklySales = `${weeklySales} weekly sales`;
  const formattedMonthly = `${monthlySales} monthly`;
  const formattedDaily = `${dailySales} sales`;
  const formattedItesm = `${items} items in stock`;
  const kgs = `${quantiityInStock} kgs in stock`;
  const formattedWeekly = `${totalSales} Sales`;
  const formattedTotalProfit = `$$  ${totalProfit} Sales`;
  const [isLoading, setIsLoading] = useState(false);

  //tables
  const quantitiesColunm = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity'
    }
  ];
  const overSockColums = [
    {
      title: 'Item ID',
      dataIndex: '_id',
      key: '_id'
    },
    {
      title: 'Item Name',
      dataIndex: 'name',
      key: 'name'
    }
  ];

  const sessionSuccess = () => {
    swal({
      title: 'Successful!',
      text: 'Email Sent Successfully!',
      icon: 'success'
    });
  };

  const sessionError = () => {
    swal({
      title: 'Error!',
      text: 'Opps something went wrong!',
      icon: 'error'
    });
  };

  function handleSubmit() {
    setIsLoading(true); // Set loading state to true

    axios
      .post(
        process.env.REACT_APP_EMAIL_URL + '/send',
        {
          service_id: process.env.REACT_APP_EMAIL_SERVICE_ID,
          template_id: process.env.REACT_APP_EMAIL_TEMPLATE_ID,
          user_id: process.env.REACT_APP_EMAIL_USER_ID,
          template_params: {
            recipient_name: 'MEGA GAS DIRECTOR',
            email_subject: 'Hello from EmailJS',
            message_content: 'This is the email content.',
            dailySales: dailySales,
            itemsInstock: items,
            quantiityInStock: quantiityInStock,
            weeklySales: weeklySales
          }
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer 2oWGab5v3N75zR_An'
          }
        }
      )
      .then((response) => {
        console.log(response);
        sessionSuccess();
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        sessionError();
        setIsLoading(false);
      });
  }

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h5">Financial Report</Typography>

          <Button type="primary" ghost onClick={handleSubmit}>
            Send Report
          </Button>

          {isLoading ? (
            <div style={{ marginRight: '60px' }}>
              {' '}
              <Spin tip="Email Sending" size="large">
                <div className="content" />
              </Spin>
            </div>
          ) : (
            <div>..</div>
          )}
        </div>
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
        <AnalyticEcommerce title="Quantity in Stock [kgs]" count={quantiityInStock} percentage={kgs} isLoss extra="$0000" />
      </Grid>

      <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

      <Grid item xs={12} md={12} lg={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Transcations</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <OrdersTable />
        </MainCard>
      </Grid>

      <Grid item xs={6} md={6} lg={6}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Available Item Quantites</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <Table
            columns={quantitiesColunm}
            dataSource={itemQuantites}
            size="small"
            pagination={{
              pageSize: 5
            }}
          />
        </MainCard>
      </Grid>

      <Grid item xs={6} md={6} lg={6}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Over Stock Items</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <Table
            columns={overSockColums}
            dataSource={overStock}
            size="small"
            pagination={{
              pageSize: 5
            }}
          />
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default Reporting;
