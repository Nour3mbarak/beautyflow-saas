import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    );

    // Signup
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    // Auto-Create Salon
    if (data.user) {
      const { error: salonError } = await supabase
        .from('salons')
        .insert([{
          user_id: data.user.id,
          name: `${email.split('@')[0]}'s Salon`,
          email: email,
        }]);

      if (salonError) {
        console.error('Salon creation error:', salonError);
      }
    }

    return NextResponse.json({ 
      success: true, 
      user: data.user,
      message: 'Signup successful! Please check your email.' 
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}