/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable autofix/no-unused-vars */
import React, { Suspense } from 'react';
import { slow } from '@/utils/slow';
import ClientComponent from './_components/ClientComponent';

async function getData(delay: number) {
  await slow(delay);
  return delay;
}

async function FirstComponent() {
  const delay = await getData(1000);

  return <div>First component, delay: {delay}</div>;
}

async function SecondComponent() {
  const delay = await getData(3000);

  // Sequential fetching. FirstComponent will not start fetching until SecondComponent is done.
  return (
    <div>
      Sequential data fetching, Second component, delay: {delay}
      <Suspense fallback={<div>Loading...</div>}>
        <FirstComponent />
      </Suspense>
    </div>
  );
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

  const data = await getData(3000);

  return (
    <>
      <h1> Data Fetching</h1>
      {/* This will wait for all components to finish fetching before rendering, but fetches in parallel */}
      {/* <Suspense fallback={<div>Loading...</div>}>
        <FirstComponent />
        <SecondComponent />
      </Suspense> */}
      {/* <Suspense fallback={<div>Loading...</div>}>
        <FirstComponent />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <SecondComponent />
      </Suspense> */}
      <ClientComponent />
    </>
  );
}
