import React from "react";
import "./style.css";

function Product({ id, title, image, price, rating, link }) {

  const onClick = (props) => {
    props.onClick && props.onClick();
  };
 
  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>Rs.</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>🌟</p>
            ))}
        </div>
      </div>

      <img src={image} alt="" />
      
      <button onClick={onClick}>Add to Basket</button>
    </div>
  );
}

function RealProduct({ id, title, image, price, rating,link }) {

  const onClick = (props) => {
    props.onClick && props.onClick();
  };
 
  return (
    <div className="product">
      <img src={image} alt="" />
      <a href={link}>View All Products</a>
    </div>
  );
}

export { Product, RealProduct};