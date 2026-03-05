import { component$, useSignal, useVisibleTask$, $ } from '@builder.io/qwik';
import { Link, useNavigate } from '@builder.io/qwik-city';
import { supabase } from '~/lib/supabaseClient';
import './homeHeader.css';

export const HomeHeader = component$(() => {
  const isMenuOpen = useSignal(false);
  const isUserMenuOpen = useSignal(false);
  const user = useSignal<any>(null);
  const loading = useSignal(true);
  const nav = useNavigate();

  useVisibleTask$(async () => {
    const { data } = await supabase.auth.getUser();
    user.value = data?.user ?? null;
    loading.value = false;
  });

  useVisibleTask$(({ cleanup }) => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        user.value = session?.user ?? null;
      }
    );
    cleanup(() => listener.subscription.unsubscribe());
  });

  useVisibleTask$(({ cleanup }) => {
    const handleClickOutside = (event: MouseEvent) => {
      const userMenu = document.querySelector('.home-header-user-menu-modal');
      const userIcon = document.querySelector('.user-icon');
      if (
        isUserMenuOpen.value &&
        userMenu &&
        !userMenu.contains(event.target as Node) &&
        !userIcon?.contains(event.target as Node)
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
    if (!user.value) {
      nav('/login');
    } else {
      isUserMenuOpen.value = !isUserMenuOpen.value;
    }
  });

  /* ---------------- ICONS ---------------- */
  const CreateIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12h8" />
      <path d="M12 8v8" />
    </svg>
  );

  const DashboardIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M10 4v4" />
      <path d="M2 8h20" />
      <path d="M6 4v4" />
    </svg>
  );

  const SettingsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );



  const BlogIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 11a9 9 0 0 1 9 9" />
      <path d="M4 4a16 16 0 0 1 16 16" />
      <circle cx="5" cy="19" r="1" />
    </svg>
  );

  const HelpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="m4.93 4.93 4.24 4.24" />
      <path d="m14.83 9.17 4.24-4.24" />
      <path d="m14.83 14.83 4.24 4.24" />
      <path d="m9.17 14.83-4.24 4.24" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );

  const LogOutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="m16 17 5-5-5-5" />
      <path d="M21 12H9" />
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    </svg>
  );

  return (
    <header class="home-header">
      <div class="header-content">
        <div class="header-left">
          <div class="logosme">
            <a href="/">
              <img src="/images/logo.svg" alt="Logo" />
            </a>
          </div>
        </div>

        <nav class="nav-menu desktop-menu">
          <Link href="/product" class="nav-item">Product</Link>
          <Link href="/about" class="nav-item">About</Link>
          <Link href="/pricing" class="nav-item">Pricing</Link>
          <Link href="/blog" class="nav-item">Blog</Link>
        </nav>

        <div class="header-right desktop-right">
          <div
            class="user-icon"
            onClick$={handleUserIconClick}
            style={{ cursor: 'pointer' }}
          >
            {loading.value ? (
              <div class="skeleton-circle" style={{ width: 22, height: 22 }}></div>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            )}
          </div>

          <button
            class="consult-btn"
            onClick$={() => (window.location.href = '/app')}
          >
            <span>Get started</span>
            <div class="arrow">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>
          </button>
        </div>

        <button
          class="hamburger-menu"
          onClick$={() => (isMenuOpen.value = !isMenuOpen.value)}
          aria-label="Toggle menu"
        >
          {isMenuOpen.value ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 5h16" />
              <path d="M4 12h16" />
              <path d="M4 19h16" />
            </svg>
          )}
        </button>
      </div>

      {isUserMenuOpen.value && user.value && (
        <div class="home-header-user-menu-modal">
          <div class="home-header-user-menu-section-title">Menu</div>
          <div class="home-header-user-menu-divider"></div>

          <Link href="/app" class="home-header-user-menu-item">
            <CreateIcon /> Create Logo
          </Link>
          <Link href="/dashboard" class="home-header-user-menu-item">
            <DashboardIcon /> Dashboard
          </Link>
          <Link href="/settings/account" class="home-header-user-menu-item">
            <SettingsIcon /> Settings
          </Link>

          <div class="home-header-user-menu-divider"></div>

          <Link href="/blog" class="home-header-user-menu-item">
            <BlogIcon /> Blog
          </Link>
          <Link href="/help" class="home-header-user-menu-item">
            <HelpIcon /> Help Center
          </Link>

          <div class="home-header-user-menu-divider"></div>

          <div class="home-user-menu-item logout" onClick$={handleLogout}>
            <LogOutIcon /> Sign Out
          </div>
        </div>
      )}

      {isMenuOpen.value && (
        <div class="mobile-menu">
          <Link href="/product" class="mobile-nav-item">Product</Link>
          <Link href="/about" class="mobile-nav-item">About</Link>
          <Link href="/pricing" class="mobile-nav-item">Pricing</Link>
          <Link href="/blog" class="mobile-nav-item">Blog</Link>

          <button
            class="mobile-consult-btn"
            onClick$={() => {
              window.location.href = '/app';
              isMenuOpen.value = false;
            }}
          >
            <span>Get started</span>
            <div class="arrow">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>
          </button>
        </div>
      )}
    </header>
  );
});