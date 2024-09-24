import { NextRequest, NextResponse } from 'next/server';
import { IssueSchema } from '@/app/validationSchema';
import prisma from '@/prisma/client';

export async function PATCH(
  request: NextRequest,

  {
    params,
  }: {
    params: { id: string };
  }
) {
  const body = await request.json();
  const validations = IssueSchema.safeParse(body);
  console.log(validations);
  if (!validations.success)
    return NextResponse.json(validations.error.errors, { status: 400 });

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue)
    return NextResponse.json({ error: 'invalid issue' }, { status: 404 });
  const updatedIssue = await prisma.issue.update({
    where: { id: parseInt(params.id) },
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(updatedIssue);
}
