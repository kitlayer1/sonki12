import { component$, useStore, useVisibleTask$, $, useSignal } from "@builder.io/qwik";
import "./dashboard.css";
import { supabase } from "~/lib/supabaseClient";
import { DashboardHeader } from "./header/dashboardHeader";
import { LogoPreviewModal } from "./previewModal/previewModal";
import { DashboardButton } from "./button/dashboardButtons";

export default component$(() => {
  const state = useStore({
    user: null as { id: string; name: string } | null,
    logos: [] as any[],
    showAll: false,
    selectedLogo: null as any | null,
  });

  // Modal kapanmasını zorla tetiklemek için
  const modalKey = useSignal(0);

  const loadLogos = $(async () => {
    if (!state.user?.id) return;

    const { data, error } = await supabase
      .from("logo_sessions")
      .select("*")
      .eq("user_id", state.user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Logo yüklenemedi:", error);
      return;
    }

    state.logos = (data || []).map((logo) => ({
      ...logo,
      preview_svg: logo.logo_svg_color || logo.logo_svg || "",
    }));
  });

  useVisibleTask$(async () => {
    const { data: authData } = await supabase.auth.getSession();
    const session = authData.session;

    if (!session?.user) {
      window.location.href = "/login";
      return;
    }

    state.user = {
      id: session.user.id,
      name: session.user.user_metadata?.full_name || "Kullanıcı",
    };

    await loadLogos();
  });

  useVisibleTask$(() => {
    const refreshOnFocus = () => loadLogos();

    window.addEventListener("focus", refreshOnFocus);
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) refreshOnFocus();
    });

    return () => {
      window.removeEventListener("focus", refreshOnFocus);
    };
  });

  const sanitizeSvg = (svg: string): string => {
    if (!svg) return "";
    let cleaned = svg.trim();

    if (!cleaned.includes('xmlns="http://www.w3.org/2000/svg"')) {
      cleaned = cleaned.replace(/<svg/i, '<svg xmlns="http://www.w3.org/2000/svg"');
    }

    return cleaned
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/on\w+\s*=\s*["'][^"']*["']/gi, "");
  };

  const visibleLogos = state.showAll ? state.logos : state.logos.slice(0, 10);

  return (
    <div class="settings-layout">
      <main class="dashboard-content">
        <DashboardHeader />

        <div class="dashboard-container">
          <DashboardButton />

          <div class="section">
            {state.logos.length === 0 ? (
              <div class="empty-banner">
                <div class="empty-inner no-click">
                  <img
                    src="/images/dashboard/card/dashboardNoDesign.svg"
                    alt="No logos yet"
                    class="empty-image"
                  />
                  <div class="empty-texts">
                    <h3>You haven't created a logo yet.</h3>
                    <p>
                      Create your first logo and manage all your designs in one place.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div class="logos-grid">
                  {/* Yeni logo oluştur kartı */}
                  <div
                    class="create-logo-card"
                    onClick$={() => (window.location.href = "/app")}
                  >
                    <div class="create-logo-inner">
                      <img
                        src="/images/dashboard/card/denemelik.svg"
                        alt="Create logo"
                        class="create-logo-image"
                      />
                      <div class="create-logo-texts">
                        <h3 class="create-logo-title">Create Logo</h3>
                        <p class="create-logo-description">
                          Generate a professional logo in seconds
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Logo kartları */}
                  {visibleLogos.map((logo) => (
                    <div
                      class="logo-card"
                      key={logo.id}
                      onClick$={() => {
                        state.selectedLogo = logo;
                        modalKey.value++; // Modal açıldığında key değişsin
                      }}
                    >
                      <div class="logo-card-inner">
                        <div class="logo-content-wrapper">
                          {/* PREVIEW */}
                          <div class="logo-preview">
                            {sanitizeSvg(logo.preview_svg || "") ? (
                              <div
                                class="svg-wrapper"
                                dangerouslySetInnerHTML={sanitizeSvg(logo.preview_svg)}
                              />
                            ) : (
                              <div class="fallback-svg">
                                <svg viewBox="0 0 200 200">
                                  <rect width="200" height="200" fill="#f3f4f6" />
                                  <text x="100" y="105" text-anchor="middle" font-size="64" fill="#9ca3af">
                                    ?
                                  </text>
                                </svg>
                              </div>
                            )}
                          </div>

                          {/* INFO */}
                          <div class="logo-info">
                            <div class="info-header">
                              <div class="info-texts">
                                <p class="brand-name">
                                  <strong>{logo.brand_name || "No Name Logo"}</strong>
                                </p>
                                <p class="created-date">
                                  {new Date(logo.created_at).toLocaleDateString("tr-TR", {
                                    day: "numeric",
                                    month: "numeric",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </p>
                              </div>

                              <button
                                class="more-btn"
                                onClick$={(e) => {
                                  e.stopPropagation();
                                  state.selectedLogo = logo;
                                  modalKey.value++; // Modal açıldığında key değişsin
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                >
                                  <path d="M7 7h10v10" />
                                  <path d="M7 17 17 7" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {state.logos.length > 10 && (
                  <div class="see-all-container">
                    <button
                      class="see-all-btn"
                      onClick$={() => (state.showAll = !state.showAll)}
                    >
                      {state.showAll ? "See Less" : "See All"}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      {/* Logo Preview Modal - key ile force re-render */}
      {state.selectedLogo && (
        <LogoPreviewModal
          key={modalKey.value} // ← Bu satır çok önemli!
          logo={state.selectedLogo}
          onClose$={() => {
            console.log("Modal kapatılıyor → selectedLogo null");
            state.selectedLogo = null;
              console.log("state.selectedLogo", state.selectedLogo);
            modalKey.value++; // Kapatıldıktan sonra key değişsin (temizlik)
          }}
        />
      )}
    </div>
  );
});