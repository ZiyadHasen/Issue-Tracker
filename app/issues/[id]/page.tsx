import prisma from '@/prisma/client';
import { Box, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIssueButton from './EditIssueButton';
import IssueDetail from './IssueDetail';
import DeleteIssueButton from './DeleteIssueButton';
import React from 'react';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/Auth/authOptions';
import AssigneeSelect from './AssigneeSelect';
interface Prop {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Prop) => {
  const session = await getServerSession(authOptions); //*since everything is wrapped by session provider we can fetch session in any component we wanted
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) notFound();

  return (
    <>
      <Grid gap='5' columns={{ initial: '1', sm: '5' }}>
        <Box className='md:col-span-4'>
          <IssueDetail issue={issue} />
        </Box>
        {session && (
          <Box>
            <div className='flex flex-col gap-3'>
              <AssigneeSelect />
              <EditIssueButton issueId={issue.id} />
              <DeleteIssueButton issueId={issue.id} />
            </div>
          </Box>
        )}
      </Grid>
    </>
  );
};

export default IssueDetailPage;
