import { Table, Input, Col, Row } from 'antd';
import { Box, TableContainer } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Watermark, Button, Drawer, Space, DatePicker } from 'antd';
import avatar1 from 'assets/images/users/final.jpg';
import ContactExpert from './ContactExpert';
import { Search } from '@material-ui/icons';
const { RangePicker } = DatePicker;




export default function ExpertsTable() {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    // Check if the Geolocation API is available in the browser
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // If the user allows location access, set the location state
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });

          // Use OpenStreetMap Nominatim API for reverse geocoding
          fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`)
            .then((response) => response.json())
            .then((data) => {
              const formattedAddress = data.display_name;
              setAddress(formattedAddress);
            })
            .catch((error) => {
              console.error('Error fetching address:', error);
            });
        },
        (error) => {
          console.error('Error getting location:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported in this browser.');
    }
  }, []);

  const [experts, setExperts] = useState([
    {
      id: 1,
      firstName: 'Panashe',
      lastName: 'Budzinike',
      expertise: 'Disease',
      experienceYears: 10,
      contactEmail: 'pana@gmail.com',
      contactPhone: '+263786398208',
      locationCity: 'Centenary',
      locationState: 'Muzarabani',
      locationCountry: 'Zimbabwe'
    },

    {
      id: 2,
      firstName: 'Nyasha',
      lastName: 'Chaingeni',
      expertise: 'Pests',
      experienceYears: 9,
      contactEmail: 'nyashachaingeni@gmail.com',
      contactPhone: '00000000000',
      locationCity: 'Mutare',
      locationState: 'Mutare',
      locationCountry: 'Zimbabwe'
    },

    {
      id: 3,
      firstName: 'Panashe',
      lastName: 'Sunlight',
      expertise: 'Disease',
      experienceYears: 11,
      contactEmail: 'panashebudzinike@gmail.com.com',
      contactPhone: '0786398208',
      locationCity: 'Bulawayo',
      locationState: 'Matebelenand',
      locationCountry: 'Zimbabwe'
    }
  ]);
  useEffect(() => {
    axios
      .get(`http://localhost:3061/mongo/experts/create`)
      .then((response) => {
        setExperts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const expertColumn = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName'
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName'
    },
    {
      title: 'Expertise',
      dataIndex: 'expertise',
      key: 'expertise'
    },
    {
      title: 'Experience (Years)',
      dataIndex: 'experienceYears',
      key: 'experienceYears'
    },
    {
      title: 'Email',
      dataIndex: 'contactEmail',
      key: 'contactEmail'
    },
    {
      title: 'Phone',
      dataIndex: 'contactPhone',
      key: 'contactPhone'
    },
    {
      title: 'City',
      dataIndex: 'locationCity',
      key: 'locationCity'
    },
    {
      title: 'State',
      dataIndex: 'locationState',
      key: 'locationState'
    },
    {
      title: 'Country',
      dataIndex: 'locationCountry',
      key: 'locationCountry'
    },

    {
      title: 'Action',
      key: 'action',
      render: () => (
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button onClick={showDrawer} type="primary" ghost>
            Contact
          </Button>
        </div>
      )
    }
  ];

  return (
    <>
      <Drawer
        title="Contact"
        width={500}
        style={{ top: '15%' }}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button>Cancel</Button>
            <Button type="primary">OK</Button>
          </Space>
        }
      >
        <ContactExpert />
      </Drawer>
      <div style={{ marginLeft: '10px' }}>
        <h2>Current Location</h2>
        {location ? (
          <div>
            <p>
              Latitude: {location.latitude}, Longitude: {location.longitude}
            </p>
            {address && <p>Address: {address}</p>}
          </div>
        ) : (
          <p>Loading location...</p>
        )}
      </div>
      <div>
        <div style={{ marginBottom: '30px',marginLeft:'5px' }}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Input placeholder="Search expert here" prefix={<Search />} onChange={(e) => handleSearch(e.target.value)} />
            </Col>

            <Col span={12}>
              <div style={{ marginTop: '1px' }}> 
              <RangePicker  />
              </div>
             
            </Col>
          </Row>
        </div>
      </div>
      <Box>
        <Watermark>
          <TableContainer
            sx={{
              width: '100%',
              overflowX: 'auto',
              position: 'relative',
              display: 'block',
              maxWidth: '100%',
              '& td, & th': { whiteSpace: 'nowrap' }
            }}
          >
            <Table
              columns={expertColumn}
              dataSource={experts}
              size="small"
              pagination={{
                pageSize: 10
              }}
            />

            <img
              style={{
                zIndex: 10,
                maxWidth: 200,
                display: 'block',
                margin: '0 auto'
              }}
              src={avatar1}
              alt="示例图片"
            />
          </TableContainer>
        </Watermark>
      </Box>
    </>
  );
}
