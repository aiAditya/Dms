import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
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