import React, {useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetailsById } from "../../actions";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import RemoveShoppingCartOutlinedIcon from '@material-ui/icons/RemoveShoppingCartOutlined';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link, withRouter } from "react-router-dom";
import { addToCart } from "../../actions";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { generatePublicUrl } from '../../urlConfig';
import { BiRupee } from "react-icons/bi";
import './style.css'
import Cart from "../../components/UI/Cart";

const useStyles = makeStyles((theme) => ({
    list: {
        width: 500,
    },
    fullList: {
        width: 'auto',
    },
    Buttons: {
        width: '180%',
        display: 'inline-block',
        padding: '15px',
        fontSize: '15px',
        outline: 'none',
        backgroundColor: '#fb641b',
        color: '#000',
        boxShadow: '0 1px 2px 0 rgba(0,0,0,.2)',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '30px',
        '&:hover': {
            backgroundColor: '#fb641b'
        },
    },
    button1: {
        margin: theme.spacing(1),
        background: 'internal-light-dark(rgb(239, 239, 239), rgb(59, 59, 59))',
        border: '1px solid',
        borderColor: 'internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133))'
    },
    button2: {
        margin: theme.spacing(1),
        background: 'linear-gradient(to bottom, #f8e3ad,#eeba37)',
        border: '1px solid',
        borderColor: '#c89411 #b0820f #99710d'
    },
}));


 const TemporaryDrawer = (props) => {
    window.sessionStorage.setItem("location", window.location.pathname);
    const classes = useStyles();
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product);
    const [state, setState] = React.useState({
        'right': false,
    });
    const cart = useSelector((state) => state.cart);

    useEffect(() => {
        const { productId } = props.match.params;
        const payload = {
            params: {
                productId
            }
        }
        dispatch(getProductDetailsById(payload))
    }, [])
    

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
        
    };

    

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <>
                <p className="cartTitle"> <CheckCircleIcon style={{color:"green", paddingRight:"2%"}}/> Added To Cart</p>
                    <div className="display-product">
                        <img
                            src={generatePublicUrl(product.productDetails.productPictures[0].img)}
                            alt={`${product.productDetails.productPictures[0].img}`}
                        />
                        <div>
                        <p className="slide-productTitle">{product.productDetails.name}</p>
                        <span className="slide-price">
                                <BiRupee />
                                {product.productDetails.price}
                            </span>
                        </div>
                        
                    </div>
                    <Cart count={Object.keys(cart.cartItems).length} style={{color:"black",display:"block"}} />
                </>
            </List>
            <Divider />
            <List>
            {/* component={Link} to="/cart" */}
                <Button
                    variant="contained"
                    className={classes.button1}
                    startIcon={<ShoppingCartIcon />}
                    onClick={() => {
                        
                        const { _id, name, price } = product.productDetails;
                        const img = product.productDetails.productPictures[0].img;
                        dispatch(addToCart({ _id, name, price, img }));
                        props.history.push(`/cart`);
                        }}
                >
                   View Cart
                </Button>
                {/* <Link to="/checkout">
                <Button
                    variant="contained"
                    className={classes.button2}
                    startIcon={<RemoveShoppingCartOutlinedIcon />}
                >
                    Proceed to Checkout
                </Button>
                </Link> */}
            </List>
        </div>
    );

    return (
        <div>
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button className={classes.Buttons} onClick={toggleDrawer(anchor, true)}>Add to Cart</Button>
                    <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}


export default withRouter(TemporaryDrawer);

//={toggleDrawer(anchor, true)} 