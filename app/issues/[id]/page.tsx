import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import prisma from '@/prisma/client';
import { Box, Button, Card, Grid, Heading } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import delay from 'delay';
import Link from 'next/link';
import { Pencil2Icon } from '@radix-ui/react-icons';
import EditIssueButton from './EditIssueButton';
import IssueDetail from './IssueDetail';

interface Prop {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Prop) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) notFound();
  // await delay(5000);

  return (
    <>
      <Grid gap='5' columns={{ initial: '1', md: '2' }}>
        <Box>
          <IssueDetail issue={issue} />
        </Box>
        <Box>
          <EditIssueButton issueId={issue.id} />
        </Box>
      </Grid>
    </>
  );
};

export default IssueDetailPage;
