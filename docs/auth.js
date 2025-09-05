<script type="module">
  // ---------- Supabase bootstrapping ----------
  import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/+esm";

  // TODO: replace with your values
    const SUPABASE_URL = "https://acdlgvcxzxjvcwiqlydj.supabase.co";
    const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjZGxndmN4enhqdmN3aXFseWRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2Mjc5NzksImV4cCI6MjA3MjIwMzk3OX0.9ZUURjJT73Igd2tAOv8aSZUmlkEf7DIzmOAGBSjWqCI";

  export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  });

  // ---------- Small helpers ----------
  export async function getSession() {
    const { data } = await supabase.auth.getSession();
    return data.session || null;
  }

  export async function requireAuthOrRedirect() {
    const session = await getSession();
    if (!session) {
      window.location.href = "signin.html";
    }
    return session;
  }

  export async function signOutAndGoHome() {
    await supabase.auth.signOut();
    window.location.href = "signin.html";
  }

  // Expose helpers for in-page inline scripts
  window.__auth__ = { supabase, getSession, requireAuthOrRedirect, signOutAndGoHome };
</script>
