import { Pencil2Icon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Link href={`/issues/edit/${issueId}`} className='w-full'>
      <Button asChild className='w-full flex justify-center items-center'>
        <span>
          <Pencil2Icon className='mr-2' />
          Edit Issue
        </span>
      </Button>
    </Link>
  );
};

export default EditIssueButton;
