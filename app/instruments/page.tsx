import { createClient } from '@/lib/supabase/server';

export default async function Instruments() {
  const supabase = await createClient();
  const { data: users } = await supabase.from("users").select();

  console.log(users)
  return <pre>{JSON.stringify(users, null, 2)}</pre>
}