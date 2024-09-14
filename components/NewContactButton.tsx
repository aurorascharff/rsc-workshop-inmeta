'use client';

import React from 'react';
import { createEmptyContact } from '@/data/actions/createEmptyContact';
import Button from './ui/Button';

export default function NewContactButton() {
  return (
    <Button
      onClick={async () => {
        await createEmptyContact();
      }}
      type="submit"
      theme="secondary"
    >
      New
    </Button>
  );
}
