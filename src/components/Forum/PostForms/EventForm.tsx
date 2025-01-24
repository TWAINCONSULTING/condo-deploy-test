import React from 'react';
import { BasePostForm } from './BasePostForm';
import { Input } from '../../ui/Input';
import { POST_CATEGORIES } from '../../../config/postCategories';
import type { PostFormProps } from '../../../types/forum';

export function EventForm({ onSubmit, onCancel }: PostFormProps) {
  const handleSubmit = (data: any) => {
    onSubmit({
      type: 'event',
      ...data
    });
  };

  return (
    <BasePostForm
      onSubmit={handleSubmit}
      onCancel={onCancel}
      categories={POST_CATEGORIES.event}
    >
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Dato"
          type="date"
          required
        />
        <Input
          label="Tidspunkt"
          type="time"
          required
        />
      </div>
    </BasePostForm>
  );
}