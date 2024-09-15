'use client';

import React, { useActionState } from 'react';
import Input from '@/components/ui/Input';
import LinkButton from '@/components/ui/LinkButton';
import SubmitButton from '@/components/ui/SubmitButton';
import TextArea from '@/components/ui/TextArea';
import { updateContact } from '@/data/actions/updateContact';
import type { ContactSchemaErrorType } from '@/validations/contactSchema';
import type { Contact } from '@prisma/client';

export default function ContactForm({ contact }: { contact: Contact }) {
  const updateContactById = updateContact.bind(null, contact.id);
  const [state, updateContactAction] = useActionState(updateContactById, {
    errors: {} as ContactSchemaErrorType,
  });

  return (
    <form action={updateContactAction} className="flex max-w-[40rem] flex-col gap-4 @container">
      <div className="grip-rows-6 grid gap-2 @sm:grid-cols-[1fr_4fr] @sm:gap-4">
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
        <Input
          errors={state.errors?.fieldErrors?.email}
          defaultValue={contact.email || undefined}
          name="email"
          placeholder="moa@inmeta.no"
          type="text"
        />
        <label htmlFor="github">Github</label>
        <Input defaultValue={contact.github || undefined} name="github" placeholder="@moa" type="text" />
        <label htmlFor="avatar">Avatar URL</label>
        <Input
          defaultValue={contact.avatar || undefined}
          name="avatar"
          errors={state.errors?.fieldErrors?.avatar}
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
        <SubmitButton theme="primary">Save</SubmitButton>
      </div>
    </form>
  );
}
