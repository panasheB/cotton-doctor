import { useState } from 'react';
import { CFormLabel } from '@coreui/react';
import { Button, Input, Row, Col } from 'antd';
import axios from 'axios';
import swal from 'sweetalert';
import PropTypes from 'prop-types';

function UpdateInformation({ itemDetails }) {
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

  const [assetT, setAsset] = useState({
    Name: '',
    Category: '',
    Value: '',
    PurchaseDate: '',
    SerialNumber: '',
    Description: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAsset((prevRequest) => ({
      ...prevRequest,
      [name]: value
    }));
  };

  UpdateInformation.propTypes = {
    itemDetails: PropTypes.any
  };
  const sessionSuccess = () => {
    swal({
      title: 'Successful!',
      text: 'Maintenance Updated!',
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
    const code = itemDetails?._id;
    const data = {
      AssetID: code,
      Description: assetT.Description
    };
    axios
      .put(process.env.REACT_APP_API_BASE_URL + `/assetMaintenance/${code}`, data)
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
              <h3> Add Item</h3>

              <div style={{ marginBottom: '30px' }}>
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <CFormLabel className="label-txt">Description</CFormLabel>
                    <Input
                      type="text"
                      size="sm"
                      valid={assetT.Description !== ''}
                      name="Description"
                      placeholder="Description"
                      value={assetT.Description}
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
export default UpdateInformation;
