import React from 'react';
import Head from 'next/head';

export default (): JSX.Element => (
  <React.Fragment>
    <Head>
      <title>Hello BinPar!</title>
      <link rel="stylesheet" type="text/css" href="/styles.css" />
    </Head>
    <h1>Hello BinPar</h1>
  </React.Fragment>
);
