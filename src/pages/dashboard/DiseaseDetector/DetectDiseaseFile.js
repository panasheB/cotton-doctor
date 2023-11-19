import { useState } from 'react';
import { CFormLabel } from '@coreui/react';
import { Input, Row, Col, Button } from 'antd';
import axios from 'axios';
import swal from 'sweetalert';

function DetectDiseaseFile() {
  const containerStyle = {
    border: '0.5px solid lightgrey',
    padding: '10px'
  };

  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const sessionSuccess = () => {
    swal({
      title: 'Successful!',
      text: 'Image Uploaded!',
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

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Preview the selected image
    setPreviewImage(URL.createObjectURL(selectedFile));
  };

  const [predictionHtml, setPredictionHtml] = useState(null);
  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', file);

    axios
      .post(`http://localhost:5001/predict`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        console.log(response);
        const predictionHtml = response.data;

        // Set the prediction HTML to state
        setPredictionHtml(predictionHtml);

        // Display the prediction to the user
        swal({
          title: 'Prediction Result',
          text: 'Check the result below.',
          icon: 'info'
        });
        sessionSuccess();
      })
      .catch((error) => {
        console.log(error);
        sessionError();
      });
  };

  return (
    <>
      <div style={containerStyle}>
        <>
          <div style={{ backgroundColor: 'white' }}>
            <div style={{ marginLeft: '10px' }}>
              <h3> Upload Image</h3>
              <div style={{ marginBottom: '30px' }}>
                <Row gutter={[16, 16]}>
                  <Col span={8}>
                    <CFormLabel>Upload Image</CFormLabel>
                    <Input type="file" onChange={handleFileChange} />
                  </Col>
                  <Col span={8}>
                    {previewImage && <img src={previewImage} alt="" style={{ maxWidth: '100%', maxHeight: '100%', marginTop: '10px' }} />}
                  </Col>
                </Row>
              </div>
            </div>

            <div style={{ marginLeft: '10px' }}>
              <div style={{ marginBottom: '30px' }}>
                <Row gutter={[16, 16]}>
                  <Col span={8}>
                    <Button type="primary" ghost onClick={handleUpload}>
                      Upload Image
                    </Button>
                  </Col>
                </Row>
              </div>
            </div>



            {/* Conditionally render the prediction result HTML */}
            {predictionHtml && <div dangerouslySetInnerHTML={{ __html: predictionHtml }} />}
          </div>
        </>
      </div>
    </>
  );
}

export default DetectDiseaseFile;
