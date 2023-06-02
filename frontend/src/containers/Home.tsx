import React from 'react';
import { Outlet } from 'react-router-dom';
import {CssBaseline, Typography} from '@mui/material';
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
