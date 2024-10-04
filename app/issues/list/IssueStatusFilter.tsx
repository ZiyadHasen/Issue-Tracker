'use client';
import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';

import React from 'react';

const IssueStatusFilter = () => {
  const statuses: { label: string; value: Status | 'all' }[] = [
    { label: 'All', value: 'all' }, // Use 'all' as a valid fallback value
    { label: 'Open', value: 'OPEN' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Closed', value: 'CLOSED' },
  ];

  const router = useRouter();

  return (
    <Select.Root
      onValueChange={(status) => {
        const query = status === 'all' ? '' : `?status=${status}`; // If 'all', no filter
        router.push('/issues/list/' + query);
      }}
    >
      <Select.Trigger variant='soft' placeholder='Filter by Status ...' />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.value} value={status.value}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
