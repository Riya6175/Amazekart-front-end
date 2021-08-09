import React,{useEffect,useState} from 'react'
import './style.css'
import {useSelector, useDispatch} from 'react-redux'
import { getAllCategory } from '../../actions';
import HamburgerButton from './HamburgerButton';
import Sidenav from '../../components/subheader/Sidenav'
import {Transition} from 'react-transition-group'
import { useAmazonContext } from '../../Context/AmazonContext'


export default function SubHeader() {

    const [navOpen, setnavOpen] = useState(false);
    const{entryStore} = useAmazonContext();

    const openNav = () =>{
        setnavOpen(true);
    }

    const closeNav = () => {
        setnavOpen(false);
    }

     const category = useSelector(state => state.category);
     const dispatch = useDispatch()


     useEffect(() => {
         dispatch(getAllCategory());
     },[])


    const renderCategories = (categories) => {
        let myCategories = [];
        for(let category of categories) {
            myCategories.push(
                <li key={category.name}>
                    {
                        category.parentId ? <a href={category.slug}> {category.name} </a> : 
                        
                        <button>{category.name}</button>
                    }
                    
                    
                </li>
            )
        }
        return myCategories;
    }

        return (
            <div className='menuHeader'>
                 
                <ul>
                <HamburgerButton click={openNav} /> <h4 style={{marginTop:'0.7%',fontWeight:'bold'}}>All</h4>
                {category.categories.length > 0 ? renderCategories(category.categories): null }
                <ul className="fake-list">
                <li>
                    New Releases
                </li>
                <li style={{padding:0}}>
                <div className="dropdown-fake">
                <button className="dropbtn">Prime</button>
                    <div className="dropbtn-list">
                        <img style={{padding:'2%'}}src="./images/prime.jpg"></img>
                    </div>
                </div>
                </li>
                <li>
                    Customer Service
                </li>
                <li>
                    Amazon Pay
                </li>
                <li>
                    Best Sellers
                </li>
                </ul>
                </ul>
                <Transition 
                in={navOpen && entryStore}
                timeout={300}
                mountOnEnter
                unmountOnExit>
                    {state => {
                        return(
                            <>
                            <Sidenav state={state}/>
                            <div className="overlay" 
                                style={state === "entering" ? {animation: "show .3s forwards"} 
                                : state === "entered" ? {opacity: "1"} : {animation: "show .3s backwards reverse"}}
                                onClick={closeNav}>

                            </div>
                            <div className="closeBtn" style={state === "entering" ? {animation: "show .3s forwards"} 
                                : state === "entered" ? {opacity: "1"} : {animation: "show .3s backwards reverse"}}
                                onClick={closeNav}>&times;
                            </div>
                            </>
                        )
                    }}
                </Transition>
                
            </div>
        )
}

