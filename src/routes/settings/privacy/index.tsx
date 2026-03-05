// src/routes/settings/privacy.tsx
import { component$, useSignal, $ } from "@builder.io/qwik";
import { supabase } from "~/lib/supabaseClient";
import "../settings.css";
import "./privacy.css";
import { SettingsBar } from "~/components/settings/settingsbar/settingsBar";
import { deleteAccount } from "../api/delete-account";
import { DashboardHeader } from "~/components/dashboard/header/dashboardHeader";

export default component$(() => {
  const loading = useSignal(false);

  const handleDeleteAccount = $(async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action is irreversible!"
    );
    if (!confirmDelete) return;

    loading.value = true;

    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;
    if (!user) {
      loading.value = false;
      return;
    }

    try {
      await deleteAccount(user.id);
      await supabase.auth.signOut();
      window.location.href = "/login";
    } catch {
    } finally {
      loading.value = false;
    }
  });

  return (
    <div class="settings-layout">
      <main class="settings-content">
        <DashboardHeader />
        <div class="settings-container">
          <SettingsBar />

          <div class="settings-header">
            <h1 class="settings-title">Privacy & Security</h1>
            <p class="settings-description">
              Anyone with the link can join this team as a Viewer or Editor.
              Disable this to deactivate the current link. Re-enable it to generate
              a new link.
            </p>
          </div>

          <div class="privacy-card">
            <div>
              <h3>Privacy Policy</h3>
              <p>Would you like to receive campaigns, advertising emails</p>
            </div>
            <button
              class="view-btn"
              onClick$={() => window.open("/privacy-policy", "_blank")}
            >
              View
            </button>
          </div>

          <div class="privacy-card">
            <div>
              <h3>Terms of Service</h3>
              <p>Would you like to receive campaigns, deals and advertising</p>
            </div>
            <button
              class="view-btn"
              onClick$={() => window.open("/terms-of-service", "_blank")}
            >
              View
            </button>
          </div>

          <div class="privacy-card delete-section">
            <div>
              <h3>Delete account</h3>
              <p>Would you like to receive campaigns, deals and advertising emails?</p>
            </div>
            <button
              class="delete-btn"
              disabled={loading.value}
              onClick$={handleDeleteAccount}
            >
              Delete
            </button>
          </div>

        </div>
      </main>
    </div>
  );
});