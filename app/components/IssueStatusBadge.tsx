import { Status } from '@prisma/client';
import { Badge } from '@radix-ui/themes';
import React from 'react';

interface Props {
  status: Status;
}

const IssueStatusBadge = ({ status }: Props) => {
  if (status === 'OPEN') return <Badge color='red'>Open</Badge>;
  if (status === 'CLOSED') return <Badge color='green'>Closed</Badge>;
  if (status === 'IN_PROGRESS')
    return <Badge color='violet'>In Progress</Badge>;

  return null;
};

export default IssueStatusBadge;
