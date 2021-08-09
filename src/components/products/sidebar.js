import React from "react";
import {Link, withRouter} from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductListPage from "../../containers/ProductListPage";
import "./style.css";

export default function Sidebar() {
  return (
    <div>
      <div className={"sidebar"}>
        Search by Price: -
        <ul>
                <li>
                    <a> Under 5k </a>
                </li>
                <li>
                    Under 5k - 10k
                </li>
                <li>
                    Under 10k - 15k
                </li>
        </ul>
      </div>
    </div>
  );
}
