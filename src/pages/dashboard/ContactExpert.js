import { useState } from 'react';
import { CFormLabel } from '@coreui/react';
import { Button, Input, Row, Col } from 'antd';
import axios from 'axios';
import swal from 'sweetalert';

function ContactExpert() {
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
  

  const [expert, setExpert] = useState({
    id: '',
    firstName: '',
    lastName: '',
    phonenumber: '',
    message: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setExpert((prevRequest) => ({
      ...prevRequest,
      [name]: value
    }));
  };

  const sessionSuccess = () => {
    swal({
      title: 'Successful!',
      text: ' Successfully!',
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

  //handle submit function
  function handleSubmit() {
    const data = {
      id: expert.id,
      firstName: expert.firstName,
      lastName: expert.lastName,
      phonenumber: expert.phonenumber,
      message: expert.message
    };
    axios
      .post(`http://localhost:3061/mongo/experts/create`, data)
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
              <h3> Contact Expert</h3>
              <hr />

              <div style={{ marginBottom: '30px' }}>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <CFormLabel>First Name</CFormLabel>

                    <Input
                      type="text"
                      size="sm"
                      valid={expert.firstName !== ''}
                      name="firstName"
                      placeholder="First Name"
                      value={expert.firstName}
                      onChange={handleChange}
                    />
                  </Col>

                  <Col span={12}>
                    <CFormLabel className="label-txt">Last Name</CFormLabel>
                    <Input
                      type="text"
                      size="sm"
                      valid={expert.lastName !== ''}
                      name="lastName"
                      placeholder="Last Name"
                      value={expert.lastName}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
              </div>

              <div style={{ marginBottom: '30px' }}>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <CFormLabel className="label-txt">Phone Number</CFormLabel>
                    <Input
                      type="text"
                      size="sm"
                      valid={expert.phonenumber !== ''}
                      name="phonenumber"
                      placeholder="Phone Number"
                      value={expert.phonenumber}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
              </div>
              <div style={{ marginBottom: '30px' }}>
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <CFormLabel className="label-txt">Message</CFormLabel>
                    <textarea
                      style={{
                        width: '100%',
                        height: '150px',
                        border: '0.1px solid grey'
                      }}
                      name="message"
                      placeholder="Write the message here"
                      value={expert.message}
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
                        Send
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
export default ContactExpert;
