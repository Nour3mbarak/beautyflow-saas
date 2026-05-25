import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, address, phone, email, description, opening_time, closing_time } = await request.json();

    // Authorization Header vom Frontend mitzuschicken
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];

    // Service Role Key für serverseitige Operationen
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!, // ← Service Role, nicht Anon Key
    );

    // Token verifizieren
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
    }

    const { data, error } = await supabase
      .from('salons')
      .insert([{
        user_id: user.id,
        name,
        address,
        phone,
        email,
        description,
        opening_time,
        closing_time,
      }])
      .select();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, salon: data[0] });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message ?? 'Unknown error' }, { status: 500 });
  }
}