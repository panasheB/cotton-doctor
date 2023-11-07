import React, { useState } from 'react';
import { CFormLabel } from '@coreui/react';
import { Button, Input, Row, Col } from 'antd';
import axios from 'axios';
import swal from 'sweetalert';
import PropTypes from 'prop-types';

function DeleteExpense({ expenseDetails }) {
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

  const [transaction, setTransaction] = useState({
    reason: '',
    password: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTransaction((prevRequest) => ({
      ...prevRequest,
      [name]: value
    }));
  };

  DeleteExpense.propTypes = {
    expenseDetails: PropTypes.any
  };

  const sessionSuccess = () => {
    swal({
      title: 'Successful!',
      text: 'Expense Successfully Deleted!',
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

  const code = expenseDetails?._id;

  function handleSubmit() {
    const password = transaction.password;
    if (password === process.env.REACT_APP_ADMIN_PASSWORD) {
      axios
        .delete(process.env.REACT_APP_API_BASE_URL + `/expenses/${code}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((response) => {
          console.log(response);
          sessionSuccess();
        })
        .catch((error) => {
          console.log(error);
          sessionError();
        });
    } else {
      sessionError();
    }
  }

  const containerStyle = {
    border: '0.5px solid lightgrey',
    padding: '10px'
  };

  return (
    <div style={containerStyle}>
      <div style={{ backgroundColor: 'white' }}>
        <div style={{ marginLeft: '10px' }}>
          <h3>Delete Expense</h3>

          <div style={{ marginBottom: '30px' }}>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <CFormLabel>Reason for deleting</CFormLabel>

                <Input
                  type="text"
                  size="sm"
                  valid={transaction.reason !== ''}
                  name="reason"
                  placeholder="Reason for deleting"
                  value={transaction.reason}
                  onChange={handleChange}
                />
              </Col>
            </Row>
          </div>

          {/* Password Input */}
          <div style={{ marginBottom: '30px' }}>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <CFormLabel>Password</CFormLabel>

                <Input
                  type="password"
                  size="sm"
                  valid={transaction.password !== ''}
                  name="password"
                  placeholder="Enter Password"
                  value={transaction.password}
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

export default DeleteExpense;