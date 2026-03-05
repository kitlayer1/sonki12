// src/routes/settings/delete-account.ts
import { server$ } from '@builder.io/qwik-city';
import { createClient } from '@supabase/supabase-js';

export const deleteAccount = server$(async (userId: string) => {
  console.log("Server$: deleteAccount çağrıldı, userId:", userId);

  const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error("ENV eksik:", { supabaseUrl, serviceRoleKey });
    throw new Error("Supabase yapılandırma hatası: ENV eksik");
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  const { data, error } = await supabaseAdmin.auth.admin.deleteUser(userId);

  if (error) {
    console.error("Supabase admin delete error:", error);
    throw new Error(error.message);
  }

  console.log("Kullanıcı silindi:", data);
  return { success: true };
});