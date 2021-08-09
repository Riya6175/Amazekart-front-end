import React from 'react'
import {Route, withRouter} from 'react-router-dom'
import Header from '../Header'
import MenuHeader from '../subheader2'
import SubHeader from '../subheader'
import {BrowserRouter as Router,Switch} from 'react-router-dom'

 function Layout(props) {
    return (
        <>
                <div className="app-wrapper">
                {
                props.location.pathname!=='/signin' && props.location.pathname!=='/signup' ? 
                <>
                 <Header/>
                 <SubHeader/>
                <MenuHeader/>
                 </>
                  :null
                
                }
                </div>
            {props.children}
        </>
    )
}
export default withRouter(Layout);
