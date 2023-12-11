import { useState } from 'react';
import { CFormLabel } from '@coreui/react';
import { Button, Input, Row, Col } from 'antd';
import axios from 'axios';
import swal from 'sweetalert';

function AddExpert() {
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
    id: "",
    firstName: '',
    lastName: '',
    expertise: '',
    experienceYears: "",
    contactEmail: '',
    contactPhone: '',
    locationCity: '',
    locationState: '',
    locationCountry: '',
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
      text: 'Expert Added Successfully!',
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
      expertise: expert.expertise,
      experienceYears: expert.experienceYears,
      contactEmail: expert.contactEmail,
      contactPhone: expert.contactPhone,
      locationCity: expert.locationCity,
      locationState: expert.locationState,
      locationCountry: expert.locationCountry,
    };
    axios
      .post((`http://localhost:3061/mongo/experts/create`), data)
      .then((response) => {
        console.log(response);
        sessionSuccess();
      })
      .catch((error) => {
        console.log(error);
        sessionError();
      });
  }


  //container style
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
              <h3> Add Expert</h3>
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
                    <CFormLabel className="label-txt">National ID</CFormLabel>
                    <Input
                      type="text"
                      size="sm"
                      valid={expert.id !== ''}
                      name="id"
                      placeholder="National ID"
                      value={expert.id}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col span={12}>
                    <CFormLabel className="label-txt">Expertise</CFormLabel>
                    <Input
                      type="text"
                      size="sm"
                      valid={expert.expertise !== ''}
                      name="expertise"
                      placeholder="Expertise"
                      value={expert.expertise}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
              </div>

              <div style={{ marginBottom: '30px' }}>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <CFormLabel className="label-txt">Experience</CFormLabel>
                    <Input
                      type="number"
                      size="sm"
                      valid={expert.experienceYears !== ''}
                      name="experienceYears"
                      placeholder="Experience Years"
                      value={expert.experienceYears}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col span={12}>
                    <CFormLabel className="label-txt">Email</CFormLabel>
                    <Input
                      type="text"
                      size="sm"
                      valid={expert.contactEmail !== ''}
                      name="contactEmail"
                      placeholder="Contact Email"
                      value={expert.contactEmail}
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
                      valid={expert.contactPhone !== ''}
                      name="contactPhone"
                      placeholder="Phone Number"
                      value={expert.contactPhone}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col span={12}>
                    <CFormLabel className="label-txt">City</CFormLabel>
                    <Input
                      type="text"
                      size="sm"
                      valid={expert.locationCity !== ''}
                      name="locationCity"
                      placeholder="Location City"
                      value={expert.locationCity}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
              </div>

              <div style={{ marginBottom: '30px' }}>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <CFormLabel className="label-txt">State</CFormLabel>
                    <Input
                      type="text"
                      size="sm"
                      valid={expert.locationState !== ''}
                      name="locationState"
                      placeholder="Location State"
                      value={expert.locationState}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col span={12}>
                    <CFormLabel className="label-txt">Country</CFormLabel>
                    <Input
                      type="text"
                      size="sm"
                      valid={expert.locationCountry !== ''}
                      name="locationCountry"
                      placeholder="Location Country"
                      value={expert.locationCountry}
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
                        Submit
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
export default AddExpert;
