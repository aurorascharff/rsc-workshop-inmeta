'use client';

import React, { useTransition } from 'react';
import { createEmptyContact } from '@/data/actions/createEmptyContact';
import Button from './ui/Button';

export default function NewContactButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await createEmptyContact();
        });
      }}
      type="submit"
      theme="secondary"
    >
      {isPending ? 'Creating...' : 'New'}
    </Button>
  );
}
