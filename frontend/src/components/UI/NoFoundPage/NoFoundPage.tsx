import React from 'react';
import notFoundImage from '../../../assets/images/notFound.jpg';

const NoFoundPage = () => {
  return <img src={notFoundImage} alt="not found" style={{ marginTop: '7px', width: '100%', height: 'auto' }} />;
};

export default NoFoundPage;
