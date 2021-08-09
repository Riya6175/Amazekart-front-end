import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getProductBySlug } from '../../actions/product.action'
import Carousel from "react-elastic-carousel";
import Layout from '../../components/Layout/layout'
import { generatePublicUrl } from '../../urlConfig';
import Button from '@material-ui/core/Button';
import './style.css';
import Item from "./Item";
import { getAllCategory } from '../../actions';
import { Link} from 'react-router-dom';

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
];

export default function ProductListPage(props) {
    window.sessionStorage.setItem("location", window.location.pathname);

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
                
                {if(product.productsByPrice[key].length != 0)
                    { 
                
                return (
                    <div>
                        
                            <div className="cardHeader">
                            <div>{`${props.match.params.slug} ${priceRange[key]}`}</div>
                            
                    </div>
                    <Carousel breakPoints={breakPoints} disableArrowsOnEnd={false} style={{marginBottom:"1%"}}>
                            {
                                product.productsByPrice[key].map(product => 
                                   <Item>
                                        <div>
                                            <img src={generatePublicUrl(product.productPictures[0].img)} style={{height:"40vh"}} />

                                        </div>
                                        <div>
                                            <div style={{margin:"4%"}}>
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
                                            <Link to={`/${product.slug}/${product._id}/p`}>
                                            <Button variant="outlined">view Details</Button>
                                            </Link>
                                        </div>
                                    </Item>
                                )
                            } 
                    </Carousel>
                    </div>
                )
            }
            }
        }  )
        }
        </Layout>
    )
}
