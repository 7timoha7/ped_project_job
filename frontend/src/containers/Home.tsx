import React from 'react';
import {Outlet} from 'react-router-dom';
import {CssBaseline} from '@mui/material';
import Layout from '../components/UI/Layout/Layout';

const Home = () => {
  return (
    <>
      <CssBaseline />
      <Layout>
        <Outlet />
      </Layout>
    </>
  );
};

export default Home;
