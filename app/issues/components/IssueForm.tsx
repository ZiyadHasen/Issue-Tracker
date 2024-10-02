'use client';
import ErrorMessage from '@/app/components/ErrorMessage'; //? error message showed using this component in style
import Spinner from '@/app/components/Spinner'; //?when submitting adding this is great
import { IssueSchema } from '@/app/validationSchema'; //?this is front end validation using Zod/Go check it out
import { zodResolver } from '@hookform/resolvers/zod'; //?bridge between Zod and RHF before submitting client side validation there
import { Issue } from '@prisma/client'; //?we need this model to make it type for coming issue in case of editing
import { Button, Callout, TextField } from '@radix-ui/themes'; //?this are imports from radix ui
import axios from 'axios'; //? axios is axios our old friend
import 'easymde/dist/easymde.min.css'; //?we need this css for the Editor to work properly
import { useRouter } from 'next/navigation'; //?we need this to navigate through the routes
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form'; //?Controller is special case which we will discuss later
import SimpleMDE from 'react-simplemde-editor'; //?it is the editor component
import { z } from 'zod';

type IssueFormData = z.infer<typeof IssueSchema>;
interface Props {
  issue?: Issue;
}

// ********************************
const IssueForm = ({ issue }: Props) => {
  const router = useRouter();
  const {
    register, //*This method  is used to connect form inputs to the form state. It ensures that the values entered in the form fields are tracked and can be validated.
    control, //*The control object is another essential part of React Hook Form. It manages the form state and provides methods for interacting with form fields.
    handleSubmit,
    formState: { errors }, //*The formState object provides information about the form’s state.including error as we see here
  } = useForm<IssueFormData>({
    resolver: zodResolver(IssueSchema),
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className='max-w-xl'>
      {error && (
        <Callout.Root color='red' className='mb-5'>
          <Callout.Text>Error Occurred</Callout.Text>
        </Callout.Root>
      )}
      <form
        className='space-y-3'
        onSubmit={handleSubmit(async (data) => {
          try {
            setIsSubmitting(true);
            if (issue) await axios.patch(`/api/issues/${issue.id}`, data);
            else await axios.post('/api/issues', data);
            router.push('/issues/list');
          } catch (error) {
            setIsSubmitting(false);
            setError('an expected error occurred ');
          }
        })}
      >
        <TextField.Root
          defaultValue={issue?.title}
          placeholder='title'
          {...register('title')}
        >
          <TextField.Slot></TextField.Slot>
        </TextField.Root>
        {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}

        {/* The <Controller> component comes to the rescue when we’re dealing with third-party
         custom components or situations where we don’t have a standard input field available. 
         It’s like the mediator between React Hook Form and those custom areas of your form. */}
        <Controller
          name='description'
          defaultValue={issue?.description}
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder='description' {...field} />
          )}
        />
        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}

        <Button disabled={isSubmitting}>
          {issue ? 'update issue' : 'Submit new issue'}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
