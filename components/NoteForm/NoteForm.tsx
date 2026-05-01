import { useMutation, useQueryClient } from '@tanstack/react-query';
import css from './NoteForm.module.css';

import { Field, Form, Formik, type FormikHelpers, ErrorMessage } from 'formik';

// namespace import
import * as Yup from 'yup';
import type { CreateNoteProps, NoteTag } from '../../types/note';
import { createNote } from '@/lib/api';

interface NoteFormProps {
  onEnd: () => void;
}

const NoteFormSchema = Yup.object().shape({
  title: Yup.string().min(3).max(50).required(),
  content: Yup.string().max(500),
  tag: Yup.string().oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping']).required(),
});

const initialValues: CreateNoteProps = {
  title: '',
  content: '',
  tag: '' as NoteTag,
};

export default function NoteForm({ onEnd }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onEnd();
    },
  });

  const handleSubmit = (values: CreateNoteProps, action: FormikHelpers<CreateNoteProps>) => {
    mutation.mutate({
      title: values.title,
      content: values.content,
      tag: values.tag,
    });
    action.resetForm();
  };

  // const handleSubmit = (formData: FormData) => {
  //   mutation.mutate({
  //     title: formData.get("title") as string,
  //     content: formData.get("content") as string,
  //     tag: formData.get("tag") as string,
  //   });
  // };
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={NoteFormSchema}>
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field as="textarea" id="content" name="content" rows={8} className={css.textarea} />
          <ErrorMessage name="content" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field as="select" id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onEnd}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}
