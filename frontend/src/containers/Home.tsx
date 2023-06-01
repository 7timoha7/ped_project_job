import React from 'react';
import { Outlet } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Layout from '../components/UI/Layout/Layout';
import WhatsAppButton from '../components/UI/WhatsAppButton/WhatsAppButton';

const Home = () => {
  return (
    <>
      <CssBaseline />
      <Layout>
        <WhatsAppButton />
        <Outlet />
      </Layout>
    </>
  );
};

export default Home;
