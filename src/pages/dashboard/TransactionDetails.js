import { CCallout } from '@coreui/react';
import { Col, Row } from 'reactstrap';
import { CTableHeaderCell, CTableDataCell, CTableRow } from '@coreui/react';
import { CTableFoot } from '@coreui/react';
import { cilPrint } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { Table } from 'antd';
import PropTypes from 'prop-types';

function TranscationDetails({ transaction }) {
  const transactions = [transaction];
  const transactionColumn = [
    {
      title: 'Items',
      key: 'action',
      render: (record) => (
        <div style={{ display: 'flex', gap: '10px' }}>
          {record?.products?.map((product, index) => (
            <span key={index}>
              {product?.name}
              {index !== record?.products?.length - 1 ? ', ' : ''}
            </span>
          ))}
        </div>
      )
    },

    {
      title: 'Payment',
      dataIndex: 'paymentMode',
      key: 'paymentMode'
    },

    {
      title: 'Amount',
      key: 'action',
      render: (record) => (
        <div style={{ display: 'flex', gap: '10px' }}>
          {record?.currency} {record?.subtotal}
        </div>
      )
    },
    {
      title: 'Creation Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt) => createdAt?.slice(0, 10)
    }
  ];
  return (
    <>
      <div style={{ marginTop: '20px' }}>
        <Row>
          <Col sm="12">
            <>
              <CCallout style={{ backgroundColor: '#ffffff' }} color="light" className="px-3 py-2">
                <Row style={{ paddingRight: '30px', paddingBottom: '0px', paddingTop: '0px', justifyContent: 'flex-end' }}>
                  <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                        <Row>
                          <Col>
                            <span style={{ fontStyle: 'italic' }}>Gas Specialists</span>
                            <br />
                            <p>Bulawayo Harare</p>
                            <p>Zimbabwe</p>
                            <p style={{ marginTop: '20px' }}>027749779640</p>
                          </Col>
                        </Row>
                      </div>
                      <div>
                        <CIcon
                          onClick={() => window.print()}
                          icon={cilPrint}
                          height={20}
                          width={20}
                          style={{ cursor: 'pointer', marginRight: '5px' }}
                        />
                      </div>
                      <div>
                        <h4>Transaction</h4>
                        <p style={{ fontWeight: 'bold', color: 'black' }}>Gas SPecailists</p>
                        <p>Reg: K2018252309</p>
                        <p>Bulaway0 12 Kumalo</p>
                      </div>
                    </div>
                    <hr style={{ margin: '20px 0' }} /> {/* Faint horizontal line */}
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div style={{ textAlign: 'left' }}>
                        <p>
                          <span style={{ color: 'black' }}> Full Name</span>: {transaction?.['customerName']}
                        </p>
                        <p>
                          <span style={{ color: 'black' }}> Phone Number</span>: {transaction?.['customerPhone']}
                        </p>
                        <p>
                          <span style={{ color: 'black' }}> Email</span>: {transaction?.['customerEmail']}
                        </p>
                      </div>
                      <div>
                        <p>
                          <span style={{ color: 'black' }}> ID</span>: {`${'T' + transaction?.['_id']?.slice(12, 24)}`}
                        </p>
                        <p>
                          <span style={{ color: 'black' }}> Date</span>: {transaction?.['createdAt']?.slice(0, 10)}
                        </p>
                        <p>
                          <span style={{ color: 'black' }}> Amount Due {transaction?.['currency']}</span>
                          {transaction?.['total']?.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div style={{ marginTop: '40px' }}>
                    <Table
                      columns={transactionColumn}
                      dataSource={transactions}
                      size="small"
                      pagination={{
                        pageSize: 10
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'end', gap: '10px', marginTop: '0px' }}>
                    <CTableFoot>
                      <CTableRow>
                        <CTableHeaderCell colSpan="3" className="text-end">
                          Subtotal:
                        </CTableHeaderCell>
                        <CTableDataCell>
                          {' '}
                          <span style={{ color: '#69a3de', marginLeft: '30px' }}>
                            {' '}
                            {transaction?.['currency']} {transaction?.['subtotal']?.toLocaleString()}
                          </span>
                        </CTableDataCell>
                      </CTableRow>
                      <hr style={{ margin: '20px 0' }} />

                      <CTableRow>
                        <CTableHeaderCell colSpan="3" className="text-end">
                          Amount Due:
                        </CTableHeaderCell>
                        <CTableDataCell>
                          {' '}
                          <span style={{ color: '#69a3de', marginLeft: '10px' }}>
                            {' '}
                            {transaction?.['currency']}
                            {transaction?.['subtotal']?.toLocaleString()}{' '}
                          </span>
                        </CTableDataCell>
                      </CTableRow>
                    </CTableFoot>
                  </div>
                </Row>
              </CCallout>
            </>
          </Col>
        </Row>
      </div>
    </>
  );
}
TranscationDetails.propTypes = {
  transaction: PropTypes.any // You can specify a more specific type if needed
};

export default TranscationDetails;
