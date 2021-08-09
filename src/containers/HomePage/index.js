import React, { useState } from 'react'
import './style.css'
import Layout from '../../components/Layout/layout'
import {Product,RealProduct} from "./dummyProducts.js";
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom"

export default function HomePage(props) {

  window.sessionStorage.setItem("location", window.location.pathname);
  const history = useHistory();
    return (
        <Layout>
            <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          alt=""
        />

        <div className="home__row">
          <Product
            id="12321341"
            title="The Lean Startup: How Constant Innovation Creates Radically Successful Businesses Paperback"
            price={11.96}
            rating={5}
            image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg"
          />
          <Product
            id="49538094"
            title="Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl"
            price={239.0}
            rating={4}
            image="https://images-na.ssl-images-amazon.com/images/I/81O%2BGNdkzKL._AC_SX450_.jpg"
          />
        </div>

        <div className="home__row">
          <Product
            id="4903850"
            title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor"
            price={199.99}
            rating={3}
            image="https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg"
          />
          <Product
            id="23445930"
            title="Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric"
            price={98.99}
            rating={5}
            image="https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$"
          />
          <Product
            id="3254354345"
            title="New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)"
            price={598.99}
            rating={4}
            image="https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg"
          />
        </div>
        <div className="title_row">
          Electronics- Mobile Phones
        </div>
        <div className="home__row">
          
          <RealProduct
            id="90829332"
            image="./images/Samsung-logo.jpg"
            link="/Samsung"
          />
          <RealProduct
            id="90829332"
            image="./images/vivo.PNG"
            link="/vivo"
          />
          <RealProduct
            id="90829332"
            image="./images/oppo.PNG"
            link="oppo"
          />    



        </div>
        <div className="title_row">
          Electronics- Laptops
        </div>
        <div className="home__row">
          <RealProduct
            id="90829332"
            image="./images/dell-logo.jpg"
            link="/Dell"
          />
          <RealProduct
            id="90829332"
            image="./images/hp-logo.jpg"
            link="/HP"
          />
          <RealProduct
            id="90829332"
            image="./images/msi-logo.jpg"
            link="/MSI"
          />          
        </div>
      </div>
    </div>
        </Layout>
    )
}
