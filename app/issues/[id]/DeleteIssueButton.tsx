'use client';
import Spinner from '@/app/components/Spinner';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

// !This is very good example how you make deletion with confirmation its simple see the radix doc you can even understand by only looking here
// !  perfect Example !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color='red' disabled={isDeleting}>
            Delete Issue
            {isDeleting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this issue? This action can't be
            undone.
          </AlertDialog.Description>
          <Flex gap='3' mt='4' justify='end'>
            <AlertDialog.Cancel>
              <Button variant='soft' color='gray'>
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                variant='solid'
                color='red'
                onClick={async () => {
                  try {
                    setIsDeleting(true);
                    await axios.delete(`/api/issues/${issueId}`);
                    router.push('/issues/list');
                    router.refresh();
                  } catch (error) {
                    setIsDeleting(false);
                    setError(true);
                  }
                }}
              >
                Confirm Deletion
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      {error && (
        <AlertDialog.Root open={error}>
          <AlertDialog.Content>
            <AlertDialog.Title>Error Occurred</AlertDialog.Title>
            <AlertDialog.Description>
              Failed to delete the issue, please try again later.
            </AlertDialog.Description>
            <Flex gap='3' mt='4' justify='end'>
              <Button
                variant='soft'
                color='gray'
                onClick={() => setError(false)}
              >
                Close
              </Button>
            </Flex>
          </AlertDialog.Content>
        </AlertDialog.Root>
      )}
    </>
  );
};

export default DeleteIssueButton;
