import { createClient } from "@/lib/supabase/server";

export async function Username() {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    return user ? <div>{user.email}</div> : <div>Loading...</div>
}