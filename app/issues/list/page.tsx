import prisma from '@/prisma/client';
import { Table } from '@radix-ui/themes';
import IssueStatusBadge from '../../components/IssueStatusBadge';
import Link from '../../components/Link';
import IssueActions from '../../components/IssueActions';
import React from 'react';

const IssuesPage = async () => {
  //* Prisma Client Naming Convention: The Prisma client uses a lowercase version of your model
  //* name as its property to follow JavaScript/TypeScript conventions.
  //* This means Issue in your schema becomes issue
  const issues = await prisma.issue.findMany();
  return (
    <>
      {/* this is the New Issue Button on top of List of issues */}
      <IssueActions />
      {/* *************************************************************** */}
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>

                <div className='block md:hidden'>
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default IssuesPage;
