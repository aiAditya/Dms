import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import './breadcrumb.css'
// eslint-disable-next-line import/newline-after-import
import { Typography } from "@mui/material";
export default function Breadcrumb({path,handlePathClick}){
    return (
        <nav>
          {path.map((paths, index) => (
            <span key={index}>
              <Link to="#" onClick={()=>{handlePathClick(index,paths);console.log(paths)}}>{`${paths.title}`} </Link>
              {index < path.length - 1 && ' / '}
            </span>
          ))}
        </nav>
      );
}
Breadcrumb.propTypes={
    path: PropTypes.any,
    handlePathClick: PropTypes.func
}