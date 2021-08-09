import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';

export default function HamburgerButton(props) {
    return (
        <div style={{marginTop:'0.5%'}} onClick={props.click}>
            <MenuIcon onClick={props.click} />
        </div>
    )
}
