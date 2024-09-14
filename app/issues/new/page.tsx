'use client';
import React, { useState } from 'react';
import { Button, Callout, TextField } from '@radix-ui/themes';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();

  const [error, setError] = useState('');
  return (
    <div className='max-w-xl'>
      {error && (
        <Callout.Root color='red' className='mb-5'>
          <Callout.Text>Error Occurred</Callout.Text>
        </Callout.Root>
      )}

      <form
        className=' space-y-3'
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post('/api/issues', data);
            router.push('/issues');
          } catch (error) {
            setError('an expected error occurred ');
            console.log(error);
          }
        })}
      >
        <TextField.Root placeholder='Title' {...register('title')}>
          <TextField.Slot></TextField.Slot>
        </TextField.Root>
        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder='description' {...field} />
          )}
        />

        <Button>Submit new issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
