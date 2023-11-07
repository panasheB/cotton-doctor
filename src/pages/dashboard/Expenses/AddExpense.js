import React, { useState } from 'react';
import { CFormLabel } from '@coreui/react';
import { Button, Input, Row, Col } from 'antd';
import axios from 'axios';
import swal from 'sweetalert';

function AddExpense() {
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
      text: 'Expense Added!',
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
    const data = {
      Name: expense.Name,
      Category: expense.Category,
      Amount: Number(expense.Amount),
      Description: expense.Description
    };
    axios
      .post(process.env.REACT_APP_API_BASE_URL + '/expenses', data)
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
          <h3>Add Expense</h3>
          <div style={{ marginBottom: '30px' }}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <CFormLabel>Expense Name</CFormLabel>
                <Input type="text" size="sm" name="Name" placeholder="Expense Name" value={expense.Name} onChange={handleChange} />
              </Col>
              <Col span={12}>
                <CFormLabel className="label-txt">Category</CFormLabel>
                <Input type="text" size="sm" name="Category" placeholder="Category" value={expense.Category} onChange={handleChange} />
              </Col>
            </Row>
          </div>
          <div style={{ marginBottom: '30px' }}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <CFormLabel className="label-txt">Amount</CFormLabel>
                <Input type="text" size="sm" name="Amount" placeholder="Amount" value={expense.Amount} onChange={handleChange} />
              </Col>
              <Col span={12}>
                <CFormLabel className="label-txt">Description</CFormLabel>
                <Input
                  type="text"
                  size="sm"
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

export default AddExpense;
