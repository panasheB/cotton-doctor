import React, { useState } from 'react';
import { CFormLabel } from '@coreui/react';
import { Button, Input, Row, Col } from 'antd';
import axios from 'axios';
import swal from 'sweetalert';
import PropTypes from 'prop-types';

function UpdateExpense({ expenseDetails }) {
  const buttonStyle3 = {
    backgroundColor: '#69A3DE',
    border: '1px solid #69A3DE',
    borderRadius: '50px',
    color: '#fff',
    variant: 'outline',
    padding: '2px 15px',
    margin: '5px',
    fontWeight: 'bold',
    cursor: 'pointer'
  };

  const [expense, setExpense] = useState({
    Name: '',
    Category: '',
    Amount: '',
    Description: ''
  });

  UpdateExpense.propTypes = {
    expenseDetails: PropTypes.any
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setExpense((prevExpense) => ({
      ...prevExpense,
      [name]: value
    }));
  };

  const sessionSuccess = () => {
    swal({
      title: 'Successful!',
      text: 'Expense Updated!',
      icon: 'success'
    });
  };

  const sessionError = () => {
    swal({
      title: 'Error!',
      text: 'Oops, something went wrong!',
      icon: 'error'
    });
  };

  function handleSubmit() {
    const code = expenseDetails?._id;
    const data = {
      Name: expense.Name,
      Category: expense.Category,
      Amount: Number(expense.Amount),
      Description: expense.Description
    };
    axios
      .put(process.env.REACT_APP_API_BASE_URL + `/expenses/${code}`, data)
      .then((response) => {
        console.log(response);
        sessionSuccess();
      })
      .catch((error) => {
        console.log(error);
        sessionError();
      });
  }

  const containerStyle = {
    border: '0.5px solid lightgrey',
    padding: '10px'
  };

  return (
    <div style={containerStyle}>
      <div style={{ backgroundColor: 'white' }}>
        <div style={{ marginLeft: '10px' }}>
          <h3>Update Expense</h3>

          <div style={{ marginBottom: '30px' }}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <CFormLabel>Expense Name</CFormLabel>
                <Input
                  type="text"
                  size="sm"
                  valid={expense.Name !== ''}
                  name="Name"
                  placeholder="Expense Name"
                  value={expense.Name}
                  onChange={handleChange}
                />
              </Col>

              <Col span={12}>
                <CFormLabel className="label-txt">Category</CFormLabel>
                <Input
                  type="text"
                  size="sm"
                  valid={expense.Category !== ''}
                  name="Category"
                  placeholder="Category"
                  value={expense.Category}
                  onChange={handleChange}
                />
              </Col>
            </Row>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <CFormLabel className="label-txt">Amount</CFormLabel>
                <Input
                  type="text"
                  size="sm"
                  valid={expense.Amount !== ''}
                  name="Amount"
                  placeholder="Amount"
                  value={expense.Amount}
                  onChange={handleChange}
                />
              </Col>
              <Col span={12}>
                <CFormLabel className="label-txt">Description</CFormLabel>
                <Input
                  type="text"
                  size="sm"
                  valid={expense.Description !== ''}
                  name="Description"
                  placeholder="Description"
                  value={expense.Description}
                  onChange={handleChange}
                />
              </Col>
            </Row>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <hr />
                <div style={{ display: 'flex', justifyContent: 'end' }}>
                  <Button className="sb-3" size="sm" style={buttonStyle3} onClick={handleSubmit}>
                    Confirm
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateExpense;
