import { NextRequest, NextResponse } from 'next/server';
import { IssueSchema } from '@/app/validationSchema';
import prisma from '@/prisma/client';

import delay from 'delay';
import authOptions from '@/app/Auth/authOptions';
import { getServerSession } from 'next-auth';

export async function PATCH(
  request: NextRequest,

  {
    params,
  }: {
    params: { id: string };
  }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  const body = await request.json();
  const validations = IssueSchema.safeParse(body);

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

export async function DELETE(
  request: NextRequest,

  {
    params,
  }: {
    params: { id: string };
  }
) {
  // delay(10000);
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue)
    return NextResponse.json({ error: 'invalid issue' }, { status: 404 });
  await prisma.issue.delete({
    where: { id: parseInt(params.id) },
  });
  return NextResponse.json({});
}
