// src/routes/settings/notification.tsx
import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";
import { supabase } from "~/lib/supabaseClient";
import "./notification.css";
import { DashboardHeader } from "~/routes/dashboard/header/dashboardHeader";
import { SettingsBar } from "~/components/settings/settingsbar/settingsBar";
import "../settings.css";

export default component$(() => {
  const emailUpdates = useSignal(true);
  const emailMarketing = useSignal(true);
  const loading = useSignal(false);
  const success = useSignal(false);
  const error = useSignal<string | null>(null);

  // Sayfa ilk açıldığında verileri çek
  useVisibleTask$(async () => {
    loading.value = true;

    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user) {
      window.location.href = "/login";
      return;
    }

    const { data, error: err } = await supabase
      .from("profiles")
      .select("email_updates, email_marketing")
      .eq("id", userData.user.id)
      .single();

    if (!err && data) {
      emailUpdates.value = data.email_updates ?? true;
      emailMarketing.value = data.email_marketing ?? true;
    }

    loading.value = false;
  });

  // Save işlemi
  const handleSave = $(async () => {
    loading.value = true;
    success.value = false;
    error.value = null;

    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user) {
      loading.value = false;
      error.value = "Kullanıcı bulunamadı.";
      return;
    }

    const { error: err } = await supabase
      .from("profiles")
      .update({
        email_updates: emailUpdates.value,
        email_marketing: emailMarketing.value,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userData.user.id);

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
          <SettingsBar />
          <div class="settings-header">
            <h1 class="settings-title">Notification</h1>
            <p class="settings-description">
              Manage how we contact you via email.
            </p>
          </div>

          <div class="notification-item">
            <div>
              <h3>Important Updates</h3>
              <p class="text-muted">
                New features, updates, and critical information are sent via
                email.
              </p>
            </div>
            <label class="switch">
              <input
                type="checkbox"
                checked={emailUpdates.value}
                onChange$={(e) =>
                  (emailUpdates.value = (e.target as HTMLInputElement).checked)
                }
              />
              <span class="slider" />
            </label>
          </div>

          <div class="notification-item">
            <div>
              <h3>Advertising & Marketing</h3>
              <p class="text-muted">
                Receive campaigns, deals, and marketing emails.
              </p>
            </div>
            <label class="switch">
              <input
                type="checkbox"
                checked={emailMarketing.value}
                onChange$={(e) =>
                  (emailMarketing.value = (
                    e.target as HTMLInputElement
                  ).checked)
                }
              />
              <span class="slider" />
            </label>
          </div>

          <div class="save-row">
            {(success.value || error.value) && (
              <div
                class={`toast-notification ${success.value ? "success" : "error"}`}
              >
                <span class="toast-badge">
                  {success.value ? "Success" : "Error"}
                </span>
                <span class="toast-message">
                  {success.value
                    ? "Notification settings updated successfully."
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
              onClick$={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </main>
    </div>
  );
});