/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable autofix/no-unused-vars */
import React, { Suspense } from 'react';
import { slow } from '@/utils/slow';

async function getData(delay: number) {
  await slow();
  return delay;
}

async function FirstComponent() {
  const delay = await getData(1000);

  return <div>First component, delay: {delay}</div>;
}

async function SecondComponent() {
  const delay = await getData(2000);

  return <div>Second component, delay: {delay}</div>;
}

export default async function DataFetchingPage() {
  console.log('Start time: ' + new Date().getSeconds());

  // disse kjører sekvensielt, det må de fordi de avhenger av hverandre
  //   let data1 = await getData(1000);
  //   let data2 = await getData(data1);
  //   console.log('Sequential, time: ' + new Date().getSeconds());

  // functions are called in parallel
  //   const [data1, data2] = await Promise.all([getData(1000), getData(1000)]);
  //   console.log('Parallel, time: ' + new Date().getSeconds());

  return (
    <>
      <h1> Data Fetching</h1>
      {/* This will wait for all components to finish fetching before rendering, but fetches in parallel */}
      <Suspense fallback={<div>Loading...</div>}>
        <FirstComponent />
        <SecondComponent />
      </Suspense>
    </>
  );
}
