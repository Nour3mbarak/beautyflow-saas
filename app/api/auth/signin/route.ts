import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    );

    // Login
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    // Get Salon
    const { data: salonData, error: salonError } = await supabase
      .from('salons')
      .select('id, name')
      .eq('user_id', data.user?.id)
      .single();

    const salonSetup = salonData ? true : false;

    return NextResponse.json({ 
      success: true, 
      user: data.user,
      salonSetup: salonSetup,
      redirect: salonSetup ? '/dashboard' : '/setup'
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}