'use client';

import React, { useTransition } from 'react';
import SubmitButton from '@/components/ui/SubmitButton';
import { deleteContact } from '@/data/actions/deleteContact';

export default function DeleteContactButton({ contactId }: { contactId: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <SubmitButton
      onClick={() => {
        const response = confirm('Please confirm you want to delete this record.');
        if (!response) {
          return;
        }
        startTransition(async () => {
          await deleteContact(contactId);
        });
      }}
      loading={isPending}
      theme="destroy"
    >
      Delete
    </SubmitButton>
  );
}
