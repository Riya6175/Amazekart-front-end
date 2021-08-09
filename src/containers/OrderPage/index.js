import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrders } from "../../actions";
import Layout from "../../components/Layout/layout";
import Card from "../../components/UI/Card";
import { BiRupee } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import { generatePublicUrl } from "../../urlConfig";
import "./style.css";
import { Breed } from "../../components/MaterialUi";

/**
 * @author
 * @function OrderPage
 **/

const OrderPage = (props) => {
  window.sessionStorage.setItem("location", window.location.pathname);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  console.log(user);

  return (
    <Layout>
      {!auth.authenticate ? 
      <div style={{display:"flex",justifyContent:"center",marginTop:"10%"}}>
        <Link to="/signin">
      <button className="login">Login</button></Link> 
      <p style={{fontSize:"2rem",marginLeft:"4%",marginTop:"0.5%"}}> To see Your Orders</p>
      </div> :
        <>
          <div style={{ maxWidth: "1160px", margin: "5px auto" }}>
            <Breed
              breed={[
                { name: "Home", href: "/" },
                { name: "My Account", href: "/account" },
                { name: "My Orders", href: "/account/orders" },
              ]}
              breedIcon={<IoIosArrowForward />}
            />
            {user.orders.map((order) => {
              return order.items.map((item) => (
                <Card style={{ display: "block", margin: "5px 0" }}>
                  <Link
                    to={`/order_details/${order._id}`}
                    className="orderItemContainer"
                  >
                    <div className="orderImgContainer">
                      <img
                        className="orderImg"
                        src={generatePublicUrl(item.productId.productPictures[0].img)}
                      />
                    </div>
                    <div className="orderRow">
                      <div className="orderName">{item.productId.name}</div>
                      <div className="orderPrice">
                        <BiRupee />
                        {item.payablePrice}
                      </div>
                      <p className="paymentType">Payment Status: {order.paymentStatus}</p>
                      <p className="paymentType">Payment Type: {order.paymentType}</p>
                    </div>
                  </Link>
                </Card>
              ));
            })}
          </div>
        </>

      }
    </Layout>
  );


};

export default OrderPage;