// src/routes/app/components/Step7Preview.tsx
import { component$, $, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { useNavigate, useLocation } from "@builder.io/qwik-city";
import { supabase } from "~/lib/supabaseClient";
import { allFavicons } from "./allFavicons";
import { allFonts } from "./allFonts";
import { colorOptionById } from "./colorOption";
import { DownloadModal } from "~/components/editor/Modal/downloadModal";
import "./step7Preview.css";
import { AppHeader } from "./components/header/header";
import { PricingModal } from "~/components/pricing/pricingModal";

type LogoMode = "color" | "black" | "white" | "transparent" | "invert";

export const Step7Preview = component$(
  (props: {
    brandName: string;
    selectedStyleIds: number[];
    colors: number[];
    selectedFontStyleId: number;
    selectedLogoIndex: number;
  }) => {
    const svgContainer = useSignal<Element>();
    const showModal = useSignal(false);
    const showPricingModal = useSignal(false);
    const sessionId = useSignal<string>("");
    const logoMode = useSignal<LogoMode>("color");
    const nav = useNavigate();
    const loc = useLocation();
    const isSaving = useSignal(false);
    const isPaid = useSignal(false);
    const planType = useSignal<'started' | 'business' | null>(null);
    const fontsLoaded = useSignal(false);
    const initializationDone = useSignal(false);

    /* ======================
       DATA
    ====================== */
    const usableFavicons = allFavicons.filter((f) =>
      props.selectedStyleIds.includes(f.styleId)
    );
    const favicon =
      usableFavicons[props.selectedLogoIndex % usableFavicons.length];

    const usableFonts = allFonts.filter(
      (f) => f.styleId === props.selectedFontStyleId
    );
    const fontFamily =
      usableFonts.length > 0
        ? usableFonts[props.selectedLogoIndex % usableFonts.length].fontFamily
        : "sans-serif";
    const fontUrl =
      usableFonts.length > 0
        ? usableFonts[props.selectedLogoIndex % usableFonts.length].file
        : null;

    const selectedColorId =
      props.colors[props.selectedLogoIndex % props.colors.length];
    const option = colorOptionById[selectedColorId];
    const palettes = option?.palettes || [{ background: "#ffffff", text: "#111111" }];
    const palette = palettes[props.selectedLogoIndex % palettes.length];

    const getDataHash = $(() => {
      const dataString = JSON.stringify({
        brandName: props.brandName,
        styleIds: props.selectedStyleIds,
        colors: props.colors,
        fontStyleId: props.selectedFontStyleId,
        logoIndex: props.selectedLogoIndex,
        faviconId: favicon.id
      });
      let hash = 0;
      for (let i = 0; i < dataString.length; i++) {
        const char = dataString.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      return Math.abs(hash).toString(36);
    });

    /* ======================
       COLOR LOGIC
    ====================== */
    const getColorsByMode = (mode: LogoMode) => {
      switch (mode) {
        case "black":
          return { background: "#ffffff", text: "#000000", icon: "#000000" };
        case "white":
          return { background: "#000000", text: "#ffffff", icon: "#ffffff" };
        case "transparent":
          return { background: "transparent", text: "#000000", icon: "#000000" };
        case "invert":
          return { background: palette.text, text: palette.background, icon: palette.background };
        default:
          return { background: palette.background, text: palette.text, icon: palette.text };
      }
    };

    /* ======================
       HELPERS
    ====================== */
    const toBase64 = async (url: string) => {
      try {
        const res = await fetch(url);
        const blob = await res.blob();
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      } catch (error) {
        console.error("Base64 dönüşüm hatası:", error);
        return "";
      }
    };

    const preloadFont = $(async () => {
      if (!fontUrl) {
        fontsLoaded.value = true;
        return;
      }
      try {
        const opentype = (await import("opentype.js")).default;
        const res = await fetch(fontUrl);
        const buffer = await res.arrayBuffer();
        opentype.parse(buffer);
        fontsLoaded.value = true;
        console.log("Font başarıyla yüklendi");
      } catch (e) {
        console.warn("Font yüklenemedi:", e);
        fontsLoaded.value = true;
      }
    });

    const generateSvg = $(async (forcedMode?: LogoMode) => {
      try {
        const effectiveMode = forcedMode || logoMode.value;
        const colors = getColorsByMode(effectiveMode);
        const iconBase64 = await toBase64(favicon?.iconPath);

        let textElement = `
          <text
            x="200"
            y="320"
            font-family="${fontFamily}"
            font-size="40"
            fill="${colors.text}"
            text-anchor="middle"
            dominant-baseline="middle"
          >
            ${props.brandName}
          </text>
        `;

        if (fontUrl) {
          try {
            const opentype = (await import("opentype.js")).default;
            const res = await fetch(fontUrl);
            const buffer = await res.arrayBuffer();
            const font = opentype.parse(buffer);

            const path = font.getPath(props.brandName, 0, 0, 32);
            const d = path.toPathData(2);

            const box = path.getBoundingBox();
            const w = box.x2 - box.x1;
            const h = box.y2 - box.y1;

            const x = 200 - (box.x1 + w / 2);
            const y = 320 - (box.y1 + h / 2) + 8;

            textElement = `<path d="${d}" fill="${colors.text}" transform="translate(${x} ${y})" />`;
          } catch (e) {
            console.warn("Font path conversion failed, falling back to <text>", e);
          }
        }

        return `
          <svg width="500" height="500" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
            ${colors.background !== "transparent" ? `<rect width="400" height="400" fill="${colors.background}" />` : ""}
            <image href="${iconBase64}" x="125" y="80" width="150" height="150" />
            ${textElement}
          </svg>
        `.trim();
      } catch (error) {
        console.error("SVG oluşturma hatası:", error);
        return "";
      }
    });

    const modes: LogoMode[] = ["color", "invert", "black", "white", "transparent"];

    /* ======================
       SESSION MANAGEMENT & SAVE
    ====================== */
    const findExistingSessionByData = $(async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData?.session?.user) return null;
      try {
        const { data, error } = await supabase
          .from("logo_sessions")
          .select("id, paid, plan_type")
          .eq("user_id", sessionData.session.user.id)
          .eq("brand_name", props.brandName)
          .eq("selected_font_style_id", props.selectedFontStyleId)
          .eq("selected_favicon_id", favicon.id)
          .eq("selected_style_ids", props.selectedStyleIds)
          .eq("colors", props.colors)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();
        if (error) { console.error("Session sorgulama hatası:", error); return null; }
        return data || null;
      } catch (error) { console.error("Session bulma hatası:", error); return null; }
    });

    const saveToSupabase = $(async () => {
      const existingSession = await findExistingSessionByData();
      if (existingSession) {
        sessionId.value = existingSession.id;
        isPaid.value = existingSession.paid || false;
        planType.value = existingSession.plan_type || null;
        const dataHash = await getDataHash();
        localStorage.setItem(`logo_session_${dataHash}`, existingSession.id);
        return existingSession.id;
      }

      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData?.session?.user) return null;

      isSaving.value = true;

      try {
        if (!fontsLoaded.value) await preloadFont();
        const svgs: Record<LogoMode, string> = {} as Record<LogoMode, string>;
        for (const m of modes) {
          svgs[m] = await generateSvg(m);
          if (!svgs[m]) throw new Error(`${m} modu için SVG oluşturulamadı`);
          await new Promise(resolve => setTimeout(resolve, 100));
        }

        const insertData = {
          user_id: sessionData.session.user.id,
          brand_name: props.brandName,
          selected_style_ids: props.selectedStyleIds,
          colors: props.colors,
          selected_font_style_id: props.selectedFontStyleId,
          selected_favicon_id: favicon.id,
          logo_svg: svgs.color,
          logo_svg_color: svgs.color,
          logo_svg_black: svgs.black,
          logo_svg_white: svgs.white,
          logo_svg_transparent: svgs.transparent,
          logo_svg_invert: svgs.invert,
          logo_mode: "color",
          paid: false,
          plan_type: null,
        };

        const { data, error } = await supabase
          .from("logo_sessions")
          .insert(insertData)
          .select("id, paid, plan_type")
          .single();

        if (error) { console.error("Logo kaydetme hatası:", error); return null; }
        if (data) {
          sessionId.value = data.id;
          isPaid.value = data.paid || false;
          planType.value = data.plan_type || null;
          const dataHash = await getDataHash();
          localStorage.setItem(`logo_session_${dataHash}`, data.id);
          return data.id;
        }
      } catch (error) { console.error("Kaydetme sırasında hata:", error); return null; }
      finally { isSaving.value = false; }
    });

    const getSessionIdFromUrl = $(() => {
      const pathParts = loc.url.pathname.split('/');
      const lastPart = pathParts[pathParts.length - 1];
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (lastPart && uuidRegex.test(lastPart)) return lastPart;
      return null;
    });

    const loadExistingSession = $(async (id: string) => {
      try {
        const { data, error } = await supabase
          .from("logo_sessions")
          .select("paid, plan_type")
          .eq("id", id)
          .single();
        if (error) { console.error("Session verisi getirme hatası:", error); return false; }
        if (data) {
          sessionId.value = id;
          isPaid.value = data.paid || false;
          planType.value = data.plan_type || null;
          return true;
        }
        return false;
      } catch (error) { console.error("Session verisi getirme hatası:", error); return false; }
    });

    const handlePurchaseSuccess = $((purchasedPlanType: 'started' | 'business') => {
      isPaid.value = true;
      planType.value = purchasedPlanType;
      showPricingModal.value = false;
      showModal.value = true;
      if (sessionId.value) {
        supabase
          .from("logo_sessions")
          .update({ paid: true, plan_type: purchasedPlanType })
          .eq("id", sessionId.value)
          .then(({ error }) => {
            if (error) console.error("Plan güncelleme hatası:", error);
          });
      }
    });

    const handleEdit = $(() => {
      if (sessionId.value) nav(`/editor/${sessionId.value}`);
      else {
        localStorage.setItem("tempEditData", JSON.stringify(props));
        nav("/editor/new");
      }
    });

    const handleDownloadClick = $(() => { showModal.value = true; });

    /* ======================
       USEVISIBLETASK
    ====================== */
    useVisibleTask$(async () => {
      if (initializationDone.value) return;

      try {
        await preloadFont();
        const initialSvg = await generateSvg("color");
        if (svgContainer.value) svgContainer.value.innerHTML = initialSvg;

        const dataHash = await getDataHash();
        const storedSessionId = localStorage.getItem(`logo_session_${dataHash}`);
        if (storedSessionId) {
          const loaded = await loadExistingSession(storedSessionId);
          if (loaded) { initializationDone.value = true; return; }
          else localStorage.removeItem(`logo_session_${dataHash}`);
        }

        if (!sessionId.value) {
          const { data: sessionData } = await supabase.auth.getSession();
          if (sessionData?.session?.user) await saveToSupabase();
        }

      } catch (error) { console.error("Initialization hatası:", error); }
      finally { initializationDone.value = true; }
    });

    useVisibleTask$(({ track }) => {
      track(() => logoMode.value);
      generateSvg().then((svg) => {
        if (svgContainer.value) svgContainer.value.innerHTML = svg;
      });
    });

    const colors = getColorsByMode(logoMode.value);

    return (
      <div class="preview-page">
        <AppHeader>
          <div q:slot="actions">
            <button class="step7-download-btn" onClick$={handleDownloadClick}>
              Download
            </button>
          </div>
        </AppHeader>

        <h1 class="pp-title">Pick a logo to customize</h1>
        <p class="pp-desc">
          Color, inverted, black, white and transparent versions are generated as real SVG files.
        </p>

        <div class="pp-styles">
          {modes.map((m) => (
            <button
              class={logoMode.value === m ? "active" : ""}
              onClick$={() => (logoMode.value = m)}
            >
              {m[0].toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>
        
        <div
          class="pp-card"
          style={{ background: colors.background === "transparent" ? "#ffffff" : colors.background }}
        >
          <div ref={svgContainer} class="pp-logo-preview" />
        </div>

        {showModal.value && (
          <DownloadModal
            brandName={props.brandName}
            generateSvg={() => generateSvg(logoMode.value)}
            palette={colors}
            closeMethod={() => (showModal.value = false)}
            isPaid={isPaid.value}
            planType={planType.value}
            onShowPricing$={() => { showModal.value = false; showPricingModal.value = true; }}
          />
        )}

        {showPricingModal.value && sessionId.value && (
          <PricingModal
            sessionId={sessionId.value}
            onClose$={() => (showPricingModal.value = false)}
            onSuccess$={handlePurchaseSuccess}
          />
        )}
      </div>
    );
  }
);