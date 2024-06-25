import React from 'react'
import { DNA } from 'react-loader-spinner';

// eslint-disable-next-line import/newline-after-import
import './loader.css'
const Loader = () => {
    console.log('Loading');
  return (
    <div className='loader'><DNA
    // eslint-disable-next-line react/jsx-boolean-value
    visible={true}
    height="100"
    width="100"
    ariaLabel="dna-loading"
    wrapperStyle={{}}
    wrapperClass="dna-wrapper"
    /></div>
  );
}

export default Loader;