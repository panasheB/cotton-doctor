import { useState } from 'react';
import { CFormLabel } from '@coreui/react';
import { Button, Input, Row, Col } from 'antd';
import axios from 'axios';
import swal from 'sweetalert';

function AddItem() {
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

  const [transaction, setTranscaction] = useState({
    code: '',
    name: '',
    availableQuantity: '',
    priceUSD: '',
    description: '',
    cost: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTranscaction((prevRequest) => ({
      ...prevRequest,
      [name]: value
    }));
  };

  const sessionSuccess = () => {
    swal({
      title: 'Successful!',
      text: 'Item Added!',
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
    const data = {
      code: transaction.code,
      name: transaction.name,
      availableQuantity: Number(transaction?.availableQuantity),
      priceUSD: Number(transaction.priceUSD),
      description: transaction.description,
      cost: transaction.cost
    };
    axios
      .post(process.env.REACT_APP_API_BASE_URL + `/items/create`, data)
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
    <>
      <div style={containerStyle}>
        <>
          <div style={{ backgroundColor: 'white' }}>
            <div style={{ marginLeft: '10px' }}>
              <h6> Add Item</h6>

              <div style={{ marginBottom: '30px' }}>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <CFormLabel>Item Code</CFormLabel>

                    <Input
                      type="text"
                      size="sm"
                      valid={transaction.code !== ''}
                      name="code"
                      placeholder="Item Code"
                      value={transaction.code}
                      onChange={handleChange}
                    />
                  </Col>

                  <Col span={12}>
                    <CFormLabel className="label-txt">Item Name</CFormLabel>

                    <Input
                      type="text"
                      size="sm"
                      valid={transaction.name !== ''}
                      name="name"
                      placeholder="Item Name"
                      value={transaction.name}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
              </div>

              <div style={{ marginBottom: '30px' }}>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <CFormLabel className="label-txt">Available Quantity</CFormLabel>
                    <Input
                      type="number"
                      size="sm"
                      valid={transaction.availableQuantity !== ''}
                      name="availableQuantity"
                      placeholder="Available Quantity"
                      value={transaction.availableQuantity}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col span={12}>
                    <CFormLabel className="label-txt">Item Price</CFormLabel>
                    <Input
                      type="text"
                      size="sm"
                      valid={transaction.priceUSD !== ''}
                      name="priceUSD"
                      placeholder="Price"
                      value={transaction.priceUSD}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
              </div>

              <div style={{ marginBottom: '30px' }}>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <CFormLabel className="label-txt">Cost</CFormLabel>
                    <Input
                      type="number"
                      size="sm"
                      valid={transaction.cost !== ''}
                      name="cost"
                      placeholder="Cost"
                      value={transaction.cost}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col span={12}>
                    <CFormLabel className="label-txt">Description</CFormLabel>
                    <Input
                      type="text"
                      size="sm"
                      valid={transaction.description !== ''}
                      name="description"
                      placeholder="Description"
                      value={transaction.description}
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
export default AddItem;
