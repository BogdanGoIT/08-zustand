'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import css from './NoteForm.module.css';

// import { Field, Form, Formik, type FormikHelpers, ErrorMessage } from 'formik';

// namespace import
// import * as Yup from 'yup';
import type { CreateNoteProps, NoteTag } from '../../types/note';
import { createNote } from '@/lib/api';
import { useRouter } from 'next/navigation';

// interface NoteFormProps {
//   onEnd: () => void;
// }

// const NoteFormSchema = Yup.object().shape({
//   title: Yup.string().min(3).max(50).required(),
//   content: Yup.string().max(500),
//   tag: Yup.string().oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping']).required(),
// });

const initialValues: CreateNoteProps = {
  title: '',
  content: '',
  tag: '' as NoteTag,
};

export default function NoteForm() {
  const router = useRouter();

  const handleCancel = () => {
    router.push('/notes/filter/all');
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      handleCancel();
    },
  });

  const handleSubmit = (formData: FormData) => {
    mutation.mutate({
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      tag: formData.get('tag') as NoteTag,
    });
  };
  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          defaultValue={initialValues.title}
        />
        <span className={css.error}></span>
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          defaultValue={initialValues.content}
        />
        {/* <ErrorMessage name="content" component="span" className={css.error} /> */}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select id="tag" name="tag" className={css.select} defaultValue={initialValues.tag}>
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        {/* <ErrorMessage name="tag" component="span" className={css.error} /> */}
      </div>

      <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={handleCancel}>
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={false}>
          Create note
        </button>
      </div>
    </form>
  );
}
