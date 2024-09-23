import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import { Issue } from '@prisma/client';
import { Card, Heading } from '@radix-ui/themes';
import ReactMarkdown from 'react-markdown';
interface Prop {
  issue: Issue;
}
const IssueDetail = ({ issue }: Prop) => {
  return (
    <div>
      <Heading>{issue.title}</Heading>
      <div className='flex space-x-3 my-2'>
        <IssueStatusBadge status={issue.status} />
        <p className=''>{issue.createdAt.toDateString()}</p>
      </div>
      <Card className='prose mt-4 '>
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default IssueDetail;
