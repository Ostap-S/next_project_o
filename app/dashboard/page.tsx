
// import { AuthButton } from '@/components/auth-button'
import Dashboard from '@/components/rpa-ai-dashboard'
import { convertToWeeklyData } from '@/lib/getWeekly';
import { createClient } from "@/lib/supabase/server";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: sales } = await supabase.from("sales").select();


  return <>
    {/* <AuthButton /> */}
    {sales && <Dashboard weeklyData={convertToWeeklyData(sales)} email={user?.email ?? 'Loading...'} />}
    </>
}
