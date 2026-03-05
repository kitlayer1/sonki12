// src/routes/settings/index.tsx
import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";
import { supabase } from "~/lib/supabaseClient";
import "./account.css";
import "../settings.css";
import { SettingsBar } from "~/components/settings/settingsbar/settingsBar";
import { DashboardHeader } from "~/components/dashboard/header/dashboardHeader";

export default component$(() => {
  const name = useSignal("");
  const surname = useSignal("");
  const email = useSignal("");
  const loading = useSignal(false);
  const success = useSignal(false);
  const error = useSignal<string | null>(null);

  useVisibleTask$(async () => {
    loading.value = true;
    error.value = null;

    const { data: userData, error: userErr } = await supabase.auth.getUser();
    if (userErr || !userData?.user) {
      window.location.href = "/login";
      return;
    }

    const user = userData.user;
    email.value = user.email ?? "";

    const { data: profileData, error: profileErr } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("id", user.id)
      .single();

    if (profileErr && profileErr.code !== "PGRST116") {
      error.value = profileErr.message;
    } else if (profileData) {
      const parts = profileData.full_name?.split(" ") ?? [];
      name.value = parts[0] ?? "";
      surname.value = parts.slice(1).join(" ");
    }

    loading.value = false;
  });

  const handleSaveProfile = $(async () => {
    loading.value = true;
    success.value = false;
    error.value = null;

    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;
    if (!user) {
      error.value = "Kullanıcı bulunamadı.";
      loading.value = false;
      return;
    }

    const { error: err } = await supabase.from("profiles").upsert({
      id: user.id,
      full_name: `${name.value} ${surname.value}`.trim(),
      updated_at: new Date().toISOString(),
    });

    loading.value = false;
    if (err) {
      error.value = err.message;
    } else {
      success.value = true;
      // 2 saniye sonra success mesajı kaybolsun
      setTimeout(() => {
        success.value = false;
      }, 2000);
    }
  });

  return (
    <div class="settings-layout">
      <main class="settings-content">
        <DashboardHeader />
        <div class="settings-container">
          <SettingsBar/>
          <div class="settings-header">
            <h1 class="settings-title">Account settings</h1>
            <p class="settings-description">
              Manage your personal information and account preferences.
            </p>
          </div>

          <div class="name-surname-row">
            <div class="form-group">
              <label>Name</label>
              <input
                type="text"
                class="input"
                value={name.value}
                onInput$={(e) =>
                  (name.value = (e.target as HTMLInputElement).value)
                }
              />
            </div>

            <div class="form-group">
              <label>Surname</label>
              <input
                type="text"
                class="input"
                value={surname.value}
                onInput$={(e) =>
                  (surname.value = (e.target as HTMLInputElement).value)
                }
              />
            </div>
          </div>

          <div class="form-group email-group">
            <label>Email</label>
            <input type="text" class="input" value={email.value} disabled />
          </div>

          {/* SAVE ROW + TOAST */}
          <div class="save-row">
            {(success.value || error.value) && (
              <div
                class={`toast-notification ${
                  success.value ? "success" : "error"
                }`}
              >
                <span class="toast-badge">
                  {success.value ? "Success" : "Error"}
                </span>
                <span class="toast-message">
                  {success.value
                    ? "Your information has been updated."
                    : error.value}
                </span>
                <button
                  class="close-toast"
                  onClick$={() => {
                    success.value = false;
                    error.value = null;
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M18 6 6 18" />
                    <path d="M6 6 18 18" />
                  </svg>
                </button>
              </div>
            )}

            <button
              class="settings-save-btn"
              disabled={loading.value}
              onClick$={handleSaveProfile}
            >
              Save
            </button>
          </div>
        </div>
      </main>
    </div>
  );
});