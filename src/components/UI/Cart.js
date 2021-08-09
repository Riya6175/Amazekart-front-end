import React from "react";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

/**
 * @author
 * @function Cart
 **/

const Cart = (props) => {
  return (
    <div style={{ fontSize: "20px", position: "relative" }}>
      <span
        style={{
          position: "absolute",
          width: "15px",
          height: "15px",
          fontSize: "14px",
          textAlign: "center",
          alignSelf: "center",
          top: "-11px",
          right: "15px",
          color:'white',
          // backgroundColor:"#f89501",
          // border: "1px solid #fff",
          // borderRadius: "5px",
        }}
      >
        {props.count}
      </span>
      <ShoppingCartIcon style={{ color:"white", paddingTop:"4%", fontSize:'2rem',width:'1.5em'}} />
    </div>
  );
};

export default Cart;