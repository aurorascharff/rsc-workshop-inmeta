'use client';

import React, { useTransition } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import LinkButton from '@/components/ui/LinkButton';
import TextArea from '@/components/ui/TextArea';
import { updateContact } from '@/data/actions/updateContact';
import type { Contact } from '@prisma/client';

export default function ContactForm({ contact }: { contact: Contact }) {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      onSubmit={async e => {
        e.preventDefault();
        startTransition(async () => {
          const formData = new FormData(e.currentTarget);
          await updateContact(contact.id, formData);
        });
      }}
      className="flex max-w-[40rem] flex-col gap-4 @container"
    >
      <div className="grip-rows-6 grid grid-cols-1 items-center gap-2 @sm:grid-cols-[1fr_4fr] @sm:gap-4">
        <span className="flex">Name</span>
        <div className="flex gap-4">
          <Input
            defaultValue={contact.first || undefined}
            aria-label="First name"
            name="first"
            type="text"
            placeholder="First"
          />
          <Input
            aria-label="Last name"
            defaultValue={contact.last || undefined}
            name="last"
            placeholder="Last"
            type="text"
          />
        </div>
        <label htmlFor="position">Position</label>
        <Input defaultValue={contact.position || undefined} name="position" placeholder="Konsulent" type="text" />
        <label htmlFor="email">Email</label>
        <Input defaultValue={contact.email || undefined} name="email" placeholder="moa@inmeta.no" type="text" />
        <label htmlFor="github">Github</label>
        <Input defaultValue={contact.github || undefined} name="github" placeholder="@moa" type="text" />
        <label htmlFor="avatar">Avatar URL</label>
        <Input
          defaultValue={contact.avatar || undefined}
          name="avatar"
          placeholder="https:// media.licdn.com/dms/image/example"
          type="text"
        />
        <label className="self-start" htmlFor="notes">
          Notes
        </label>
        <TextArea className="grow" defaultValue={contact.notes || undefined} name="notes" rows={6} />
      </div>
      <div className="flex gap-2 self-end">
        <LinkButton theme="secondary" href={`/contacts/${contact.id}`}>
          Cancel
        </LinkButton>
        <Button disabled={isPending} theme="primary" type="submit">
          {isPending ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  );
}
