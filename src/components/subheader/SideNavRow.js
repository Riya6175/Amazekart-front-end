import React,{useEffect} from 'react'
import './style.css'
import {useAmazonContext} from '../../Context/AmazonContext';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {useSelector, useDispatch} from 'react-redux'
import { getAllCategory } from '../../actions';

function SideNavRow(props) {

    const {setSubContainer, setSubContainerEntries} = useAmazonContext();

    const openRow = () => {
        setSubContainer(true);
        setSubContainerEntries(props.entries);
    }

    return (
        <>
        
        <div className="sidenavRow" onClick={() => (props.entries && openRow())}>
            <div>{props.text}</div>
            <i className="fas fa-chevron-right"></i>
        </div>
        
        </>
    );
}

export default SideNavRow;