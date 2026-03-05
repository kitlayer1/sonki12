import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import "./settingsBar.css";

type Tab = "account" | "invoice" | "notification" | "privacy";

export const SettingsBar = component$(() => {
  const loc = useLocation();
  const activeTab = useSignal<Tab>("account");

  useVisibleTask$(() => {
    const path = loc.url.pathname;
    if (path.includes("/settings/invoice")) activeTab.value = "invoice";
    else if (path.includes("/settings/notification"))
      activeTab.value = "notification";
    else if (path.includes("/settings/privacy")) activeTab.value = "privacy";
    else activeTab.value = "account";
  });

  const AccountIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="settings-icon"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );

  const InvoiceIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="settings-icon"
    >
      <path d="M13 16H8" />
      <path d="M14 8H8" />
      <path d="M16 12H8" />
      <path d="M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z" />
    </svg>
  );

  const NotificationIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="settings-icon"
    >
      <path d="M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
      <path d="M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14" />
      <path d="M8 6v8" />
    </svg>
  );

  const PrivacyIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="settings-icon"
    >
      <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
      <path d="M8.5 8.5v.01" />
      <path d="M16 15.5v.01" />
      <path d="M12 12v.01" />
      <path d="M11 17v.01" />
      <path d="M7 14v.01" />
    </svg>
  );

  const DashboardIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="settings-icon"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M10 4v4" />
      <path d="M2 8h20" />
      <path d="M6 4v4" />
    </svg>
  );

  return (
    <div class="settings-bar">
      <div class="settings-bar-left">
        <Link
          href="/settings/account"
          class={{
            "settings-btn": true,
            ghost: true,
            active: activeTab.value === "account",
          }}
        >
          <AccountIcon />
          Account
        </Link>

        <Link
          href="/settings/invoice"
          class={{
            "settings-btn": true,
            ghost: true,
            active: activeTab.value === "invoice",
          }}
        >
          <InvoiceIcon />
          Invoice
        </Link>

        <Link
          href="/settings/notification"
          class={{
            "settings-btn": true,
            ghost: true,
            active: activeTab.value === "notification",
          }}
        >
          <NotificationIcon />
          Notification
        </Link>

        <Link
          href="/settings/privacy"
          class={{
            "settings-btn": true,
            ghost: true,
            active: activeTab.value === "privacy",
          }}
        >
          <PrivacyIcon />
          Privacy
        </Link>
      </div>

      <div class="settings-bar-right">
        <Link href="/dashboard" class="settings-btn primary">
          <DashboardIcon />
          Dashboard
        </Link>
      </div>
    </div>
  );
});