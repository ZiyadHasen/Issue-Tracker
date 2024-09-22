import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import prisma from '@/prisma/client';
import { Box, Button, Card, Grid, Heading } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import delay from 'delay';
import Link from 'next/link';
import { Pencil2Icon } from '@radix-ui/react-icons';

interface Prop {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Prop) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) notFound();
  await delay(5000);

  return (
    <>
      <Grid gap='5' columns={{ initial: '1', md: '2' }}>
        <Box>
          <Heading>{issue.title}</Heading>
          <div className='flex space-x-3 my-2'>
            <IssueStatusBadge status={issue.status} />
            <p className=''>{issue.createdAt.toDateString()}</p>
          </div>
          <Card className='prose mt-4 '>
            <ReactMarkdown>{issue.description}</ReactMarkdown>
          </Card>
        </Box>
        <Box>
          <Button>
            <Pencil2Icon />
            <Link href={`/issue/${issue.id}/edit`}>Edit Button</Link>
          </Button>
        </Box>
      </Grid>
    </>
  );
};

export default IssueDetailPage;
