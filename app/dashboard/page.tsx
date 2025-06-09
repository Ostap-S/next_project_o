
// import { AuthButton } from '@/components/auth-button'
import Dashboard from '@/components/rpa-ai-dashboard'
import { createClient } from "@/lib/supabase/server";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  // const { data: users } = await supabase.from("users").select();

  return <>
    {/* <AuthButton /> */}
    <Dashboard email={user?.email ?? 'Loading...'} />
    </>
}
