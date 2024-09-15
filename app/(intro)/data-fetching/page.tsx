/* eslint-disable autofix/no-unused-vars */
import React from 'react';
import { slow } from '@/utils/slow';

async function getData(delay: number) {
  await slow();
  return delay;
}

export default async function DataFetchingPage() {
  console.log('Start time: ' + new Date().getSeconds());

  // disse kjører sekvensielt, det må de fordi de avhenger av hverandre
  const data1 = await getData(1000);
  const data2 = await getData(data1);
  console.log('Sequential, time: ' + new Date().getSeconds());

  return (
    <>
      <h1> Data Fetching</h1>
    </>
  );
}
