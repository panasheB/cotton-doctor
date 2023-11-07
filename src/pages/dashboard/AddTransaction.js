import { useState, useEffect } from 'react';
import { CFormLabel } from '@coreui/react';
import { CTableHeaderCell, CTableDataCell, CTableRow } from '@coreui/react';
import { CTableFoot } from '@coreui/react';
import { BsTrashFill } from 'react-icons/bs';
import { Button, Input, Row, Col, Select, Table, Space } from 'antd';
import axios from 'axios';
import swal from 'sweetalert';

function AddTransaction() {
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [currency, setCurrency] = useState('USD');
  const [mode, setMode] = useState();

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

  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + '/items/get')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const selectedProduct = products?.find((item) => item.name === product);
  const price =
    currency === 'USD' ? selectedProduct?.priceUSD : currency === 'ZIMDOLLAR' ? selectedProduct?.priceZIMDOLLAR : selectedProduct?.priceUSD;
  const [productsInCart, setProductsInCart] = useState([]);
  const currencyOptions = [{ value: 'USD', label: 'USD' }];

  const paymentMode = [
    { value: 'Cash', label: 'Cash' },
    { value: 'Ecocash', label: 'Ecocash' },
    { value: 'Transfer', label: 'Transfer' }
  ];

  const handleGenerateQuotation = () => {
    const productInCart = {
      name: product,
      price,
      quantity
    };
    setProductsInCart([...productsInCart, productInCart]);
  };

  const removeItemFromCart = (index) => {
    const updatedCart = productsInCart.filter((_, i) => i !== index);
    setProductsInCart(updatedCart);
  };

  const handleChangeProduct = (value) => {
    setProduct(value);
  };

  const handleChangeQuantity = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleChangeCurrency = (value) => {
    setCurrency(value);
  };

  const handleModeOfPayment = (value) => {
    setMode(value);
  };
  const getCurrencySymbol = () => {
    if (currency === 'ZIMDOLLAR') {
      return 'ZWL';
    } else {
      return '$';
    }
  };

  //calculator
  const computeTotalAndSubtotal = () => {
    let subtotal = 0;
    let total = 0;

    for (const product of productsInCart) {
      subtotal += product.price * product.quantity;
      total += product.price * product.quantity;
    }
    return { subtotal, total };
  };

  const [transaction, setTranscaction] = useState({
    amountTendered: '',
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    product: '',
    price: '',
    quantity: '',
    availableQuantity: '',
    subtotal: '',
    total: '',
    cumulativeAmount: ''
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
      text: 'Transcation Completed!',
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
    const { subtotal, total } = computeTotalAndSubtotal();
    const data = {
      products: productsInCart,
      price: selectedProduct.price,
      subtotal: subtotal,
      total: total,
      currency: currency,
      customerEmail: transaction.customerEmail,
      ustomerName: transaction.customerName,
      customerPhone: transaction.customerPhone,
      amountTendered: transaction.amountTendered,
      availableQuantity: selectedProduct?.availableQuantity,
      paymentMode: mode,
      change: '',
      cumulativeAmount: subtotal,
      casenumber: 'CSE' + Math.floor(Math.random() * 9999999),
      transactionid: 'T' + Math.floor(Math.random() * 9999999)
    };
    axios
      .post(process.env.REACT_APP_API_BASE_URL + `/transactions/create`, data)
      .then((response) => {
        console.log(response);
        sessionSuccess();
      })
      .catch((error) => {
        console.log(error);
        sessionError();
      });
  }

  function handleSubmit1() {
    const quantity = -1 * Number(productsInCart?.['0']?.quantity);

    const code = products?.['0']?.code;

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
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleButtonClick = () => {
    handleSubmit();
    handleSubmit1();
  };

  const containerStyle = {
    border: '0.5px solid lightgrey',
    padding: '10px'
  };

  const columns = [
    {
      title: 'Item',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: currency === 'ZIMDOLLAR' ? 'Price(ZWL)' : 'Price($)',
      dataIndex: 'price',
      key: 'price',
      render: (text) => text?.toLocaleString()
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity'
    },
    {
      title: currency === 'ZIMDOLLAR' ? 'Total(ZWL)' : 'Total($)',
      dataIndex: 'total',
      key: 'total',
      render: (text, record) => record.price * record.quantity
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record, index) => (
        <Space size="middle">
          <BsTrashFill size={18} color="#69a3de" style={{ cursor: 'pointer' }} onClick={() => removeItemFromCart(index)} />
        </Space>
      )
    }
  ];

  const CartTable = () => {
    const dataSource = productsInCart.map((product, index) => ({
      key: index,
      name: product.name,
      price: product.price,
      quantity: product.quantity
    }));

    return <Table columns={columns} dataSource={dataSource} pagination={false} />;
  };

  const items = [{ text: 'Item', value: '' }]?.concat(
    products?.map((product) => ({
      text: product?.name,
      value: product?.name
    }))
  );

  const currencyOptions1 = [{ text: 'Currency', value: '' }]?.concat(
    currencyOptions?.map((product) => ({
      text: product?.value,
      value: product?.value
    }))
  );

  const modeOfPayments = [{ text: 'Payments', value: '' }]?.concat(
    paymentMode?.map((product) => ({
      text: product?.value,
      value: product?.value
    }))
  );

  function calculateChange() {
    const amountTendered = transaction?.amountTendered || 0;
    const total = computeTotalAndSubtotal()?.subtotal || 0;
    const change = amountTendered - total;

    return change;
  }

  return (
    <>
   
        <div style={containerStyle}>
          <>
            <div style={{ backgroundColor: 'white' }}>
              <div style={{ marginLeft: '10px' }}>
                <h5> Add Transaction</h5>
                <div style={{ marginBottom: '30px' }}>
                  <Row gutter={[16, 16]}>
                    <Col span={8}>
                      <CFormLabel>Item</CFormLabel>

                      <Select
                        defaultValue=""
                        style={{
                          width: '100%'
                        }}
                        onChange={handleChangeProduct}
                      >
                        {items.map((type, index) => (
                          <option key={index} value={type.value}>
                            {' '}
                            {type.text}{' '}
                          </option>
                        ))}
                      </Select>
                    </Col>
                    <Col span={8}>
                      <CFormLabel>Available Quantity</CFormLabel>

                      <Input type="number" min={0} value={selectedProduct?.availableQuantity} />
                    </Col>
                    <Col span={8}>
                      <CFormLabel>Unity Price</CFormLabel>
                      <Input type="number" min={0} value={selectedProduct?.priceUSD} />
                    </Col>
                  </Row>
                </div>

                <div style={{ marginBottom: '30px' }}>
                  <Row gutter={[16, 16]}>
                    <Col span={8}>
                      <CFormLabel>Quantity</CFormLabel>
                      <Input type="number" min={0} value={quantity} onChange={handleChangeQuantity} />
                    </Col>
                    <Col span={8}>
                      <CFormLabel>Currency</CFormLabel>
                      <Select
                        defaultValue=""
                        style={{
                          width: '100%'
                        }}
                        onChange={handleChangeCurrency}
                      >
                        {currencyOptions1.map((type, index) => (
                          <option key={index} value={type.value}>
                            {' '}
                            {type.text}{' '}
                          </option>
                        ))}
                      </Select>
                    </Col>
                    <Col span={8}>
                      <CFormLabel>Mode of Payment</CFormLabel>
                      <Select
                        defaultValue=""
                        style={{
                          width: '100%'
                        }}
                        onChange={handleModeOfPayment}
                      >
                        {modeOfPayments.map((type, index) => (
                          <option key={index} value={type.value}>
                            {' '}
                            {type.text}{' '}
                          </option>
                        ))}
                      </Select>
                    </Col>
                  </Row>
                </div>

                <div style={{ marginBottom: '30px' }}>
                  <Row gutter={[16, 16]}>
                    <Col span={8}>
                      <CFormLabel className="label-txt">Amount Tendered</CFormLabel>

                      <Input
                        type="text"
                        size="sm"
                        valid={transaction.amountTendered !== ''}
                        name="amountTendered"
                        placeholder="Amount Tendered"
                        value={transaction.amountTendered}
                        onChange={handleChange}
                      />
                    </Col>

                    <Col span={8}>
                      <CFormLabel className="label-txt">Customer Name</CFormLabel>

                      <Input
                        type="text"
                        size="sm"
                        valid={transaction.customerName !== ''}
                        name="customerName"
                        placeholder="Customer Name"
                        value={transaction.customerName}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </div>

                <div style={{ marginBottom: '30px' }}>
                  <Row gutter={[16, 16]}>
                    <Col span={8}>
                      <CFormLabel className="label-txt">Customer Phone</CFormLabel>
                      <Input
                        type="text"
                        size="sm"
                        valid={transaction.customerPhone !== ''}
                        name="customerPhone"
                        placeholder="Customer Phone"
                        value={transaction.customerPhone}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col span={8}>
                      <CFormLabel className="label-txt">Customer Email</CFormLabel>
                      <Input
                        type="text"
                        size="sm"
                        valid={transaction.customerEmail !== ''}
                        name="customerEmail"
                        placeholder="Customer Email"
                        value={transaction.customerEmail}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col span={8}>
                      <div style={{ display: 'flex', justifyContent: 'start', gap: '10px', marginTop: '20px' }}>
                        <Button
                          style={{ color: '#fff', border: 'none', backgroundColor: '#69a3de' }}
                          size="sm"
                          onClick={handleGenerateQuotation}
                        >
                          Add Order
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </div>

                <div style={{ marginBottom: '30px' }}>
                  <Row gutter={[16, 16]}>
                    <Col span={16}>
                      <CartTable />
                      <hr />

                      <div style={{ display: 'flex', justifyContent: 'end', gap: '10px', marginTop: '0px' }}>
                        <CTableFoot>
                          <CTableRow>
                            <CTableHeaderCell colSpan="3" className="text-end">
                              Cumulative Ammount:
                            </CTableHeaderCell>
                            <CTableDataCell>
                              <span style={{ color: '#69a3de' }}>${computeTotalAndSubtotal()?.subtotal?.toLocaleString()}</span>
                            </CTableDataCell>
                          </CTableRow>
                          <CTableRow>
                            <CTableHeaderCell colSpan="3" className="text-end">
                              Amount Tendered:
                            </CTableHeaderCell>
                            <CTableDataCell>
                              {getCurrencySymbol()}
                              <span style={{ color: '#69a3de' }}>{transaction?.amountTendered}</span>
                            </CTableDataCell>
                          </CTableRow>
                          <CTableRow>
                            <CTableHeaderCell colSpan="3" className="text-end">
                              Total Price:
                            </CTableHeaderCell>
                            <CTableDataCell>
                              <span style={{ color: '#69a3de' }}>
                                {getCurrencySymbol()}
                                {computeTotalAndSubtotal()?.subtotal?.toLocaleString()}
                              </span>
                            </CTableDataCell>
                          </CTableRow>

                          <CTableRow>
                            <CTableHeaderCell colSpan="3" className="text-end">
                              Change:
                            </CTableHeaderCell>
                            <CTableDataCell>
                              <span style={{ color: '#69a3de' }}>
                                {getCurrencySymbol()}
                                {calculateChange()?.toLocaleString()}
                              </span>
                            </CTableDataCell>
                          </CTableRow>
                        </CTableFoot>
                      </div>
                      <hr />
                      <div style={{ display: 'flex', justifyContent: 'end' }}>
                        <Button className="sb-3" size="sm" style={buttonStyle3} onClick={handleButtonClick}>
                          Confirm Order
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
export default AddTransaction;
