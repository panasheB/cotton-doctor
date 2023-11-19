import { useState } from 'react';
import { CFormLabel } from '@coreui/react';
import { Input, Row, Col, Button } from 'antd';
import axios from 'axios';

function DetectDiseaseFile() {
  const containerStyle = {
    border: '0.5px solid lightgrey',
    padding: '10px'
  };

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', file);

    axios.post('http://localhost:5000/predict', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      // Handle the response, e.g., display the result or navigate to a new page
      console.log(response.data);
    })
    .catch(error => {
      // Handle errors
      console.error('Error uploading image:', error);
    });
  };

  return (
    <>
      <div style={containerStyle}>
        <>
          <div style={{ backgroundColor: 'white' }}>
            <div style={{ marginLeft: '10px' }}>
              <h5> Upload Image</h5>
              <div style={{ marginBottom: '30px' }}>
                <Row gutter={[16, 16]}>
                  <Col span={8}>
                    <CFormLabel>Upload Image</CFormLabel>
                    <Input type="file" onChange={handleFileChange} />
                  </Col>
                </Row>
                <Button type="primary" onClick={handleUpload}>Upload</Button>
              </div>
            </div>
          </div>
        </>
      </div>
    </>
  );
}

export default DetectDiseaseFile;
