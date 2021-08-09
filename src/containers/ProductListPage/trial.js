import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getProductBySlug } from '../../actions/product.action'
import Carousel from "react-elastic-carousel";
import Layout from '../../components/Layout/layout'
import Sidebar from '../../components/products/sidebar';
import { generatePublicUrl } from '../../urlConfig';
import Button from '@material-ui/core/Button';
import './style.css';
import Item from "./Item";
import { getAllCategory } from '../../actions';

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
];

export function CheckEmpty(props){
        
    console.log(props.key)
    if (props.key != null) {
        return
        (
        <div>
            <div>
                <div className="cardHeader">
                    <div>{`${props.match.params.slug} mobile ${priceRange[props.key]}`}</div>
                </div>
                <Carousel breakPoints={breakPoints} disableArrowsOnEnd={false} style={{ marginBottom: "1%" }}>
                    {
                        product.productsByPrice[props.key].map(product =>
                            <Item>
                                <div>
                                    <img src={generatePublicUrl(product.productPictures[0].img)} style={{ height: "40vh" }} />

                                </div>
                                <div>
                                    <div style={{ margin: "4%" }}>
                                        {product.name}
                                    </div>
                                    <div>
                                        <span>
                                            4.3
                                        </span>&nbsp;
                                        <span>
                                            3353
                                        </span>
                                    </div>
                                    <div> Rs. {product.price} </div>
                                    <Button variant="outlined">view Details</Button>
                                </div>
                            </Item>
                        )
                    }
                </Carousel>
            </div>
        </div>
        )
    }
}

export default function ProductListPage(props) {

    const dispatch = useDispatch();
    const product = useSelector((state) => state.product);


    const [priceRange, setpriceRange] = useState({

        under5k: 'under 5000',
        under10k: 'under 10000',
        under20k: 'under 20000',
        under30k: 'under 30000',
        above30k: "above 30000"
    }
    )

    useEffect(() => {
        const { match } = props
        dispatch(getProductBySlug(match.params.slug))
    }, [])

    
                return (
                <Layout>

                    {Object.keys(product.productsByPrice).map((key, index) => {

                        return (
                            <div>
                                <CheckEmpty arr={key} />
                            </div>
                )
            })}
        </Layout>

    )
}
