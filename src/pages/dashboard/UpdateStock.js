import { useState } from 'react';
import { CFormLabel } from '@coreui/react';
import { Button, Input, Row, Col } from 'antd';
import axios from 'axios';
import swal from 'sweetalert';
import PropTypes from 'prop-types';

function UpdateStock({ itemDetails }) {
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
    stock: null, //Add new stock
    password: '' // Add a password field
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTransaction((prevRequest) => ({
      ...prevRequest,
      [name]: value
    }));
  };

  const sessionSuccess = () => {
    swal({
      title: 'Successful!',
      text: 'Stock Successfully Updated!',
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

  const code = itemDetails?.code;

  function handleSubmit() {
    const quantity = Number(transaction?.stock);
    const password = transaction.password;

    // Check if the entered password matches "admin@gmail.com"
    if (password === process.env.REACT_APP_ADMIN_PASSWORD) {
      axios
        .put(
          process.env.REACT_APP_API_BASE_URL + '/items/updateItemQuantity',
          {
            code: code, // Assuming 'code' is defined elsewhere
            quantity: quantity
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        .then((response) => {
          console.log(response);
          sessionSuccess();
        })
        .catch((error) => {
          console.log(error);
          sessionError();
        });
    } else {
      // Password doesn't match, show an error message or take appropriate action
      sessionError();
    }
  }
  UpdateStock.propTypes = {
    itemDetails: PropTypes.any
  };

  const containerStyle = {
    border: '0.5px solid light grey',
    padding: '10px'
  };

  return (
    <>
      <div style={containerStyle}>
        <>
          <div style={{ backgroundColor: 'white' }}>
            <div style={{ marginLeft: '10px' }}>
              <h3>Update Stock</h3>

              <div style={{ marginBottom: '30px' }}>
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <CFormLabel>New Stock (kgs)</CFormLabel>

                    <Input
                      type="number"
                      size="sm"
                      valid={transaction.stock !== ''}
                      name="stock"
                      placeholder="Update Stock"
                      value={transaction.stock}
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
                      </Button>{' '}
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </>
      </div>
    </>
  );
}
export default UpdateStock;
