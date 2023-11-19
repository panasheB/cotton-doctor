import { Table } from 'antd';
import { Box, TableContainer } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Watermark } from 'antd';
import avatar1 from 'assets/images/users/final.jpg';

export default function ExpertsTable() {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);

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
      firstName: 'John',
      lastName: 'Doe',
      expertise: 'Cotton Farming',
      experienceYears: 10,
      contactEmail: 'john.doe@example.com',
      contactPhone: '+1 (555) 123-4567',
      locationCity: 'Anytown',
      locationState: 'CA',
      locationCountry: 'USA'
    },

    {
      id: 2,
      firstName: 'Nyasha',
      lastName: 'CHaingeni',
      expertise: 'Cotton Farming',
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
      expertise: 'Cotton Farming',
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
    }
  ];


  return (
    <>
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
