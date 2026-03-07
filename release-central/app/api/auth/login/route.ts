import { NextResponse } from 'next/server';
import clientPromise, { databaseName } from '@/lib/mongodb';
import bcrypt from 'bcryptjs';
import { createSession } from '@/lib/session';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(databaseName);
    const usersCollection = db.collection('users');

    const user = await usersCollection.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const passwordsMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordsMatch) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    await createSession(
      user._id.toString(),
      user.email,
      user.admin,
      user.name
    );

    return NextResponse.json(
      { message: 'Logged in successfully', admin: user.admin },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in /api/auth/login:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
