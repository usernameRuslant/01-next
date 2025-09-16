export const dynamic = 'force-dynamic';

import { NextResponse, NextRequest} from 'next/server';
import { api } from '@/app/api/api';
import { cookies } from 'next/headers';
import { logErrorResponse } from '@/app/api/_utils/utils';
import { isAxiosError } from 'axios';


export async function GET(request:NextRequest) {
  try {
    const cookieStore = await cookies();
    const page = Number(request.nextUrl.searchParams.get('page') ?? 1);
    const limit = Number(request.nextUrl.searchParams.get('limit') ?? 10);

      const res = await api.get('emotions', {
        params: {
        page,
        limit,
      },
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}