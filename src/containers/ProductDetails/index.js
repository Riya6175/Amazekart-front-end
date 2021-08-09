import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetailsById } from '../../actions';
import Layout from '../../components/Layout/layout'
import { IoIosArrowForward, IoIosStar, IoMdCart } from "react-icons/io";
import { BiRupee } from "react-icons/bi";
import { MaterialButton } from "../../components/MaterialUi";
import Button from '@material-ui/core/Button';
import { generatePublicUrl } from '../../urlConfig';
import "./style.css";
import { addToCart } from "../../actions";
import TemporaryDrawer from "../cart/sideslider";
import ReactImageMagnify from 'react-image-magnify';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css'
import InnerImageZoom from 'react-inner-image-zoom'

export default function ProductDetails(props) {
    window.sessionStorage.setItem("location", window.location.pathname);

    const dispatch = useDispatch();
    const [slider, setSlider] = useState()
    const product = useSelector(state => state.product)
    useEffect(() => {
        const { productId } = props.match.params;
        const payload = {
            params: {
                productId
            }
        }
        dispatch(getProductDetailsById(payload))
    }, [])
    if (Object.keys(product.productDetails).length === 0) {
        return null;
    }

    const imageProps = {

    };

    return (
        <Layout>
            {/* <div>{product.productDetails.name}</div> */}
            <div className="productDescriptionContainer">
                <div className="flexRow">
                    <div className="verticalImageStack">
                        {product.productDetails.productPictures.map((thumb, index) => (
                            <div className="thumbnail">
                                <img src={generatePublicUrl(thumb.img)} alt={thumb.img} />
                            </div>
                        ))}
                    </div>
                    <div className="productDescContainer">
                        <div className="productDescImgContainer">
                            <img id="myimage"
                                src={generatePublicUrl(product.productDetails.productPictures[0].img)}
                                alt={`${product.productDetails.productPictures[0].img}`}
                            />
                            {/* <ReactImageMagnify {...{
                                smallImage: {
                                    alt: 'Phasellus laoreet',
                                    isFluidWidth: true,
                                    src: generatePublicUrl(product.productDetails.productPictures[0].img),
                                    
                                },
                                largeImage: {
                                    src: generatePublicUrl(product.productDetails.productPictures[1].img),
                                    width: 1200,
                                    height: 1800
                                },
                                isHintEnabled: true
                            }} /> */}
                            {/* <InnerImageZoom src={generatePublicUrl(product.productDetails.productPictures[0].img)} /> */}
                        </div>

                        {/* action buttons */}
                        <div className="flexRowbtns">
                            <button
                                className="buynow"
                            >
                                Buy Now</button>
                            {/* <MaterialButton
                                    title="ADD TO CART"
                                    bgColor="#ff9f00"
                                    textColor="#ffffff"
                                    style={{
                                    marginRight: "5px",
                                    }}
                                    icon={<IoMdCart />}
                                    onClick={() => {
                                    const { _id, name, price } = product.productDetails;
                                    const img = product.productDetails.productPictures[0].img;
                                    dispatch(addToCart({ _id, name, price, img }));
                                    props.history.push(`/cart`);
                                    }}
                                    
                                /> */}
                            <TemporaryDrawer />
                        </div>
                    </div>
                </div>
                <div>
                    {/* home > category > subCategory > productName */}
                    <div className="breed">
                        <ul>
                            <li>
                                <a href="#">Home</a>
                                <IoIosArrowForward />
                            </li>
                            <li>
                                <a href="#">Mobiles</a>
                                <IoIosArrowForward />
                            </li>
                            <li>
                                <a href="#">Samsung</a>
                                <IoIosArrowForward />
                            </li>
                            <li>
                                <a href="#">{product.productDetails.name}</a>
                            </li>
                        </ul>
                    </div>
                    {/* product description */}
                    <div className="productDetails">
                        <p className="productTitle">{product.productDetails.name}</p>
                        <div>
                            <span className="ratingCount">
                                4.3 <IoIosStar />
                            </span>
                            <span className="ratingNumbersReviews">
                                72,234 Ratings & 8,140 Reviews
                            </span>
                        </div>
                        <div className="extraOffer">
                            Extra <BiRupee />
                            4500 off{" "}
                        </div>
                        <div className="flexRow priceContainer">
                            <span className="price">
                                <BiRupee />
                                {product.productDetails.price}
                            </span>
                            <span className="discount" style={{ margin: "0 10px" }}>
                                22% off
                            </span>
                            {/* <span>i</span> */}
                        </div>
                        <div>
                            <p
                                style={{
                                    color: "#212121",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                }}
                            >
                                Available Offers
                            </p>
                            <p style={{ display: "flex" }}>
                                <span
                                    style={{
                                        width: "100px",
                                        fontSize: "12px",
                                        color: "#878787",
                                        fontWeight: "600",
                                        marginRight: "20px",
                                    }}
                                >
                                    Description
                                </span>
                                <span
                                    style={{
                                        fontSize: "12px",
                                        color: "#212121",
                                    }}
                                >
                                    {product.productDetails.description}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

