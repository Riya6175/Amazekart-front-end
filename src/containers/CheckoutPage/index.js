import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOrder, getAddress, getCartItems,getOrders  } from "../../actions";
import Layout from "../../components/Layout/layout";
import {
  Anchor,
  MaterialButton,
  MaterialInput,
} from "../../components/MaterialUi";
import PriceDetails from "../../components/priceDetails";
import CartPage from "../cart/cartPage";
import AddressForm from "./AddressForm";
import Card from "../../components/UI/Card";
import "./style.css";
import EditIcon from '@material-ui/icons/Edit';
import { Link } from "react-router-dom";
import shortid from "shortid";

/**
 * @author
 * @function CheckoutPage
 **/

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = src
    
    script.onload =  () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }
    document.body.appendChild(script)
  })

}

const CheckoutStep = (props) => {


  return (
    <div className="checkoutStep">
      <div
        onClick={props.onClick}
        className={`checkoutHeader ${props.active && "active"}`}
      >
        <div>
          <span className="stepNumber">{props.stepNumber}</span>
          <span className="stepTitle">{props.title}</span>
        </div>
      </div>
      {props.body && props.body}
    </div>
  );
};

const Address = ({
  adr,
  selectAddress,
  enableAddressEditForm,
  confirmDeliveryAddress,
  onAddressSubmit,
}) => {
  return (
    <div className="flexRow addressContainer">
      <div>
        <input name="address" onClick={() => selectAddress(adr)} type="radio" />
      </div>
      <div className="flexRow sb addressinfo">
        {!adr.edit ? (
          <div style={{ width: "100%" }}>
            <div className="addressDetail">
              <div>
                <span className="addressName">{adr.name}</span>
                <span className="addressType">{adr.addressType}</span>
                <span className="addressMobileNumber">{adr.mobileNumber}</span>
              </div>
              {adr.selected && (

                <EditIcon onClick={() => enableAddressEditForm(adr)} />
              )}

            </div>
            <div className="fullAddress">
              {adr.address} <br /> {`${adr.state} - ${adr.pinCode}`}
            </div>
            {adr.selected && (
              <MaterialButton
                title="DELIVER HERE"
                onClick={() => confirmDeliveryAddress(adr)}
                style={{
                  width: "150px",
                  margin: "10px 0",
                  bgcolor: "#cd9042",
                  fontSize: '10px'
                }}
              />
            )}
          </div>
        ) : (
          <AddressForm
            withoutLayout={true}
            onSubmitForm={onAddressSubmit}
            initialData={adr}
            onCancel={() => { }}
          />
        )}
      </div>
    </div>
  );
};

const CheckoutPage = (props) => {
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const [newAddress, setNewAddress] = useState(false);
  const [address, setAddress] = useState([]);
  const [confirmAddress, setConfirmAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [orderSummary, setOrderSummary] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(false);
  const [paymentOption, setPaymentOption] = useState(false);
  const [confirmOrder, setConfirmOrder] = useState(false);
  const [payment, setPayment] = useState(false);
  const[orderId, setOrderId] = useState("");
  const[paymentId, setPaymentId]=useState("");
  const [signature, setSignature] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("pending");

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  window.sessionStorage.setItem("location", window.location.pathname);
  

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const onAddressSubmit = (addr) => {
    setSelectedAddress(addr);
    setConfirmAddress(true);
    setOrderSummary(true);
  };

  const selectAddress = (addr) => {
    //console.log(addr);
    const updatedAddress = address.map((adr) =>
      adr._id === addr._id
        ? { ...adr, selected: true }
        : { ...adr, selected: false }
    );
    setAddress(updatedAddress);
  };

  const confirmDeliveryAddress = (addr) => {
    setSelectedAddress(addr);
    setConfirmAddress(true);
    setOrderSummary(true);
  };

  const enableAddressEditForm = (addr) => {
    const updatedAddress = address.map((adr) =>
      adr._id === addr._id ? { ...adr, edit: true } : { ...adr, edit: false }
    );
    setAddress(updatedAddress);
  };

  const userOrderConfirmation = () => {
    setOrderConfirmation(true);
    setOrderSummary(false);
    setPaymentOption(true);
  };

  const onConfirmOrder = () => {
    const totalAmount = Object.keys(cart.cartItems).reduce(
      (totalPrice, key) => {
        const { price, qty } = cart.cartItems[key];
        return totalPrice + price * qty;
      },
      0
    );

    let payId = shortid.generate();
    setPaymentId(payId);

    const items = Object.keys(cart.cartItems).map((key) => ({
      productId: key,
      payablePrice: cart.cartItems[key].price,
      purchasedQty: cart.cartItems[key].qty,
    }));
    const payload = {
      addressId: selectedAddress._id,
      totalAmount,
      items,
      paymentStatus: paymentStatus,
      paymentType: document.querySelector('input[name="paymentOption"]:checked').value,
      paymentId: paymentId
    };
    console.log(payload);
    dispatch(addOrder(payload));
    setConfirmOrder(true);
  };

  useEffect(() => {
    auth.authenticate && dispatch(getAddress());
    auth.authenticate && dispatch(getCartItems());
  }, [auth.authenticate]);

  useEffect(() => {
    const address = user.address.map((adr) => ({
      ...adr,
      selected: false,
      edit: false,
    }));
    setAddress(address);
    //user.address.length === 0 && setNewAddress(true);
  }, [user.address]);

  useEffect(() => {
    if (confirmOrder && user.placedOrderId) {
      props.history.push(`/order_details/${user.placedOrderId}`);
    }
  }, [user.placedOrderId]);

  


  async function displayRazorpay() {

    var totaldPrice=Object.keys(cart.cartItems).reduce((totalPrice, key) => {
      const { price, qty } = cart.cartItems[key];
      return totalPrice + price * qty;
    }, 0)
  

    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
    if(!res){
      alert("Check wheter you are online");
    }
    console.log(user.orders._id);

    const options = {
      "key": "rzp_test_VEREhdqakajV8s", // Enter the Key ID generated from the Dashboard //secret: jdHks6RLrtnwAOJA3GekMtvf
      "amount": totaldPrice * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "AmazeKart",
      "description": "Thank you for buying the products",
      "image": "./images/Amazon Logo.png",
      "order_id": user.orders.placedOrderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "handler": function (response){
          // alert(response.razorpay_payment_id);
          // alert(response.razorpay_order_id);
          // alert(response.razorpay_signature)
          setOrderId(response.razorpay_order_id);
          setPaymentId(response.razorpay_payment_id);
          setSignature(response.razorpay_signature);
          setPayment(true);
          setPaymentStatus("completed");
      },
      "prefill": {
          "name": auth.user.fullName,
          "email": auth.user.email,
          "contact": "9999999999"
      }
  };
  
  const paymentObject = new window.Razorpay(options);
  paymentObject.open();

  paymentObject.on('payment.failed', function (response){
    setPaymentStatus("cancelled");
    });
  }

  return (
    <Layout>
      <div className="cartContainer" style={{ alignItems: "flex-start" }}>
        <div className="checkoutContainer">
          {/* check if user logged in or not */}
          <CheckoutStep
            stepNumber={"1"}
            title={"LOGIN"}
            active={!auth.authenticate}
            body={
              auth.authenticate ? (
                <div className="loggedInId">
                  <span style={{ fontWeight: 500 }}>{auth.user.fullName}</span>
                  <span style={{ margin: "0 5px" }}>{auth.user.email}</span>
                </div>
              ) : (
                <div>

                  <Link to="/Signin">
                    <MaterialButton
                      title="Login"
                      style={{
                        width: "100px",
                        margin: "2%",
                      }}
                    />
                  </Link>
                </div>
              )
            }
          />
          <CheckoutStep
            stepNumber={"2"}
            title={"DELIVERY ADDRESS"}
            active={!confirmAddress && auth.authenticate}
            body={
              <>
                {confirmAddress ? (
                  <div className="stepCompleted">{`${selectedAddress.name} ${selectedAddress.address} - ${selectedAddress.pinCode}`}</div>
                ) : (
                  address.map((adr) => (
                    <Address
                      selectAddress={selectAddress}
                      enableAddressEditForm={enableAddressEditForm}
                      confirmDeliveryAddress={confirmDeliveryAddress}
                      onAddressSubmit={onAddressSubmit}
                      adr={adr}
                    />
                  ))
                )}
              </>
            }
          />

          {/* AddressForm */}
          {confirmAddress ? null : newAddress ? (
            <AddressForm onSubmitForm={onAddressSubmit} onCancel={() => { }} />
          ) : auth.authenticate ? (
            <CheckoutStep
              stepNumber={"+"}
              title={"ADD NEW ADDRESS"}
              active={false}
              onClick={() => setNewAddress(true)}
            />
          ) : null}

          <CheckoutStep
            stepNumber={"3"}
            title={"ORDER SUMMARY"}
            active={orderSummary}
            body={
              orderSummary ? (
                <CartPage onlyCartItems={true} />
              ) : orderConfirmation ? (
                <div className="stepCompleted">
                  {Object.keys(cart.cartItems).length} items
                </div>
              ) : null
            }
          />

          {orderSummary && (
            <Card
              style={{
                margin: "10px 0",
              }}
            >
              <div
                className="flexRow sb"
                style={{
                  padding: "20px",
                  alignItems: "center",
                }}
              >
                <p style={{ fontSize: "12px" }}>
                  Order confirmation email will be sent to{" "}
                  <strong>{auth.user.email}</strong>
                </p>
                <MaterialButton
                  title="CONTINUE"
                  onClick={userOrderConfirmation}
                  style={{
                    width: "200px",
                  }}
                />
              </div>
            </Card>
          )}

          <CheckoutStep
            stepNumber={"4"}
            title={"PAYMENT OPTIONS"}
            active={paymentOption}
            body={
              paymentOption && (
                <div>
                  <div
                    className="flexRow"
                    style={{
                      alignItems: "center",
                      padding: "20px",
                    }}
                  >
                    <input type="radio" id="cod" name="paymentOption" value="cod" />
                    <label for="cod" style={{marginRight:"3%"}}>Cash on delivery</label>
                    <input type="radio" id="online" name="paymentOption" value="online" onClick={displayRazorpay} />
                    <label for="online"  >Pay via Razorpay</label>
                  </div>
                  <div>
                    {payment && (
                      <>
                      <p style={{margin:"3%"}}>Your Payment Id is: {paymentId}</p>
                      </>
                    )}
                  </div>
                  <MaterialButton
                    title="CONFIRM ORDER"
                    onClick={onConfirmOrder}
                    style={{
                      width: "150px",
                      margin: "0 0 20px 20px",
                    }}
                  />
                </div>
              )
            }
          />
        </div>

        {/* Price Component */}
        <PriceDetails
          totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
            return qty + cart.cartItems[key].qty;
          }, 0)}
          totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
            const { price, qty } = cart.cartItems[key];
            return totalPrice + price * qty;
          }, 0)}
        />
      </div>
    </Layout>
  );
};

export default CheckoutPage;