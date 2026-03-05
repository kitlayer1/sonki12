import { component$, useSignal, useVisibleTask$, $, Slot } from '@builder.io/qwik';
import { Link, useNavigate } from '@builder.io/qwik-city';
import { supabase } from '~/lib/supabaseClient';
import './header.css';

export const AppHeader = component$(() => {
  const isMenuOpen = useSignal(false);
  const isUserMenuOpen = useSignal(false);
  const user = useSignal<any>(null);
  const loading = useSignal(true);
  const nav = useNavigate();

  /* ---------------- ICONS ---------------- */

  const CreateIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
      class="create-icon">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12h8" />
      <path d="M12 8v8" />
    </svg>
  );

  const DashboardIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
      class="dashboard-icon">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M10 4v4" />
      <path d="M2 8h20" />
      <path d="M6 4v4" />
    </svg>
  );

  const SettingsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
      class="settings-icon">
      <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );

  const LearnIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
      class="learn-icon">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/>
      <path d="m8 13 4-7 4 7"/>
      <path d="M9.1 11h5.7"/>
    </svg>
  );

  const BlogIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
      class="blog-icon">
      <path d="M4 11a9 9 0 0 1 9 9" />
      <path d="M4 4a16 16 0 0 1 16 16" />
      <circle cx="5" cy="19" r="1" />
    </svg>
  );

  const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
      class="users-icon">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );

  const HelpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
      class="help-icon">
      <circle cx="12" cy="12" r="10" />
      <path d="m4.93 4.93 4.24 4.24" />
      <path d="m14.83 9.17 4.24-4.24" />
      <path d="m14.83 14.83 4.24 4.24" />
      <path d="m9.17 14.83-4.24 4.24" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );

  const LogOutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="m16 17 5-5-5-5" />
      <path d="M21 12H9" />
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    </svg>
  );

  /* ---------------- AUTH ---------------- */

  useVisibleTask$(async () => {
    const { data } = await supabase.auth.getUser();
    user.value = data?.user ?? null;
    loading.value = false;
  });

  useVisibleTask$(({ cleanup }) => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        user.value = session?.user ?? null;
      }
    );
    cleanup(() => listener.subscription.unsubscribe());
  });

  useVisibleTask$(({ cleanup }) => {
    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.querySelector('.app-user-menu-modal');
      const icon = document.querySelector('.app-user-icon');

      if (
        isUserMenuOpen.value &&
        menu &&
        !menu.contains(event.target as Node) &&
        !icon?.contains(event.target as Node)
      ) {
        isUserMenuOpen.value = false;
      }
    };

    document.addEventListener('click', handleClickOutside);
    cleanup(() => document.removeEventListener('click', handleClickOutside));
  });

  const handleLogout = $(async () => {
    await supabase.auth.signOut();
    isUserMenuOpen.value = false;
    nav('/login');
  });

  const handleUserIconClick = $(() => {
    if (!user.value) nav('/login');
    else isUserMenuOpen.value = !isUserMenuOpen.value;
  });

  return (
    <header class="app-header">
      <div class="app-header-content">

        {/* LEFT */}
        <div class="app-header-left">
          <a href="/">
            <img src="/images/logo.svg" alt="Logo" />
          </a>
        </div>

        {/* RIGHT */}
        <div class="app-header-right">

          {/* SLOT ACTIONS (EDIT / DOWNLOAD vs) */}
          <div class="app-header-actions">
            <Slot name="actions" />
          </div>

          {/* USER ICON */}
          <div class="app-user-icon" onClick$={handleUserIconClick}>
            {loading.value ? (
              <div class="skeleton-circle" />
            ) : (
              <UserIcon />
            )}
          </div>

          {/* USER MENU */}
          {isUserMenuOpen.value && user.value && (
            <div class="app-user-menu-modal">

              <div class="app-user-menu-section-title">
                Menu
              </div>

              <div class="app-user-menu-divider"></div>

              <Link href="/app" class="app-user-menu-item">
                <CreateIcon />
                Create Logo
              </Link>

              <Link href="/dashboard" class="app-user-menu-item">
                <DashboardIcon />
                Dashboard
              </Link>

              <Link href="/settings/account" class="app-user-menu-item">
                <SettingsIcon />
                Settings
              </Link>

              <div class="app-user-menu-divider"></div>


              <Link href="/blog" class="app-user-menu-item">
                <BlogIcon />
                Blog
              </Link>

              <Link href="/help" class="app-user-menu-item">
                <HelpIcon />
                Help Center
              </Link>

              <div class="app-user-menu-divider"></div>

              <div
                class="app-user-menu-item logout"
                onClick$={handleLogout}
              >
                <LogOutIcon />
                Sign Out
              </div>

            </div>
          )}

        </div>
      </div>
    </header>
  );
});