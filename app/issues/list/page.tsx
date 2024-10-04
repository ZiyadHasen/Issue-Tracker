import prisma from '@/prisma/client';
import { Table } from '@radix-ui/themes';
import IssueStatusBadge from '../../components/IssueStatusBadge';
import Link from '../../components/Link';
import IssueActions from './IssueActions';
import React from 'react';
import { Issue, Status } from '@prisma/client';
import { default as NextLink } from 'next/link'; // Alias Next.js Link
import { ArrowUpIcon } from '@radix-ui/react-icons';

//* Prisma Client Naming Convention: The Prisma client uses a lowercase version of your model
//* name as its property to follow JavaScript/TypeScript conventions.
//* This means Issue in your schema becomes issue

interface Props {
  searchParams: { status: Status; orderBy: keyof Issue };
}
const IssuesPage = async ({ searchParams }: Props) => {
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: 'Issue', value: 'title' },
    { label: 'Status', value: 'status', className: ' md:table-cell' },
    { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
  ];

  // *Object.values(Status) converts the enum into an array of the values.
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: 'asc' }
    : undefined;
  const issues = await prisma.issue.findMany({
    where: {
      status: status,
    },
    orderBy,
  });
  // console.log(searchParams);

  return (
    <>
      {/* this is the New Issue Button on top of List of issues */}
      <IssueActions />
      {/* *************************************************************** */}
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <NextLink
                  href={{ query: { ...searchParams, orderBy: column.value } }}
                >
                  {column.value}
                </NextLink>
                {column.value === searchParams.orderBy && (
                  <ArrowUpIcon className='inline' />
                )}
              </Table.ColumnHeaderCell>
            ))}
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
              <Table.Cell>
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
