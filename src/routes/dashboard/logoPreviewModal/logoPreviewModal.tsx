import { component$, useSignal, useTask$, $ } from "@builder.io/qwik";
import "./logoPreviewModal.css";
import { allFavicons } from '~/routes/app/allFavicons';
import { allFonts } from '~/routes/app/allFonts';
import { colorOptionById } from '~/routes/app/colorOption';

type LogoMode = 'color' | 'black' | 'white' | 'reserved';

export const DashboardLogoPreviewModal = component$((props: {
  brandName: string;
  initialSvg: string;
  selectedStyleIds: number[];
  colors: number[];
  selectedFontStyleId: number;
  selectedLogoIndex: number;
  onClose$: () => void;
  onEdit$: () => void;
}) => {
  const svgContainer = useSignal<Element>();
  const logoMode = useSignal<LogoMode>('color');
  
  // Data for logo generation
  const usableFavicons = allFavicons.filter(f =>
    props.selectedStyleIds.includes(f.styleId)
  );

  const favicon = usableFavicons[props.selectedLogoIndex % usableFavicons.length];

  const usableFonts = allFonts.filter(
    f => f.styleId === props.selectedFontStyleId
  );

  const fontFamily = usableFonts.length > 0
    ? usableFonts[props.selectedLogoIndex % usableFonts.length].fontFamily
    : 'sans-serif';

  const fontUrl = usableFonts.length > 0
    ? usableFonts[props.selectedLogoIndex % usableFonts.length].file
    : null;

  const selectedColorId = props.colors[props.selectedLogoIndex % props.colors.length];
  const option = colorOptionById[selectedColorId];
  const palettes = option?.palettes || [{ background: '#ffffff', text: '#111111' }];
  const palette = palettes[props.selectedLogoIndex % palettes.length];

  // Color logic for different modes
  const getColorsByMode = $((mode: LogoMode) => {
    switch (mode) {
      case 'black':
        return { background: '#ffffff', text: '#000000', icon: '#000000' };
      case 'white':
        return { background: '#000000', text: '#ffffff', icon: '#ffffff' };
      case 'reserved':
        return { background: palette.text, text: palette.background, icon: palette.background };
      default: // color
        return { background: palette.background, text: palette.text, icon: palette.text };
    }
  });

  // Helper to convert image to base64
  const toBase64 = async (url: string) => {
    const res = await fetch(url);
    const blob = await res.blob();
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  // Generate SVG based on current mode
  const generateSvg = $(async (mode: LogoMode = logoMode.value) => {
    try {
      const colors = await getColorsByMode(mode);
      let iconBase64 = '';
      
      if (favicon?.iconPath) {
        iconBase64 = await toBase64(favicon.iconPath);
      }

      let textElement = `
        <text
          x="200"
          y="320"
          font-family="${fontFamily}"
          font-size="32"
          fill="${colors.text}"
          text-anchor="middle"
          dominant-baseline="middle"
        >
          ${props.brandName}
        </text>
      `;

      if (fontUrl) {
        try {
          const opentype = (await import('opentype.js')).default;
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
        } catch {
          // Font yüklenemezse normal text kullan
        }
      }

      return `
        <svg width="350" height="350" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          ${colors.background !== 'transparent' ? `<rect width="400" height="400" fill="${colors.background}" />` : ''}
          ${iconBase64 ? `<image href="${iconBase64}" x="125" y="80" width="150" height="150" />` : ''}
          ${textElement}
        </svg>
      `.trim();
    } catch (error) {
      console.error("SVG oluşturma hatası:", error);
      return `<svg width="350" height="350" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="400" fill="#f3f4f6" />
        <text x="200" y="200" font-family="sans-serif" font-size="32" fill="#000" text-anchor="middle" dominant-baseline="middle">
          ${props.brandName}
        </text>
      </svg>`;
    }
  });

  // Task to update SVG when mode changes
  useTask$(async ({ track }) => {
    track(() => logoMode.value);
    
    const svg = await generateSvg();
    if (svgContainer.value) {
      svgContainer.value.innerHTML = svg;
    }
  });

  // Initial SVG generation
  useTask$(async () => {
    const svg = await generateSvg();
    if (svgContainer.value) {
      svgContainer.value.innerHTML = svg;
    }
  });

  const currentColors = {
    color: { background: palette.background, text: palette.text },
    black: { background: '#ffffff', text: '#000000' },
    white: { background: '#000000', text: '#ffffff' },
    reserved: { background: palette.text, text: palette.background }
  };

  return (
    <div 
      class="lp-overlay"
      onClick$={(e) => {
        // Sadece overlay'a tıklandığında kapat
        if (e.target === e.currentTarget) {
          props.onClose$();
        }
      }}
    >
      <div class="lp-modal">
        {/* HEADER */}
        <div class="lp-header">
          <div class="lp-brand">
            <strong>{props.brandName}</strong>
            <span class="lp-badge">Free</span>
          </div>
          <button 
            class="lp-close" 
            onClick$={(e) => {
              e.stopPropagation();
              props.onClose$();
            }}
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        <div class="lp-body">
          {/* LEFT */}
          <div class="lp-left">
            <div 
              class="lp-preview" 
              style={{ background: currentColors[logoMode.value].background }}
            >
              <div
                ref={svgContainer}
                class="lp-svg"
              />
            </div>

            <div class="lp-modes">
              <button 
                class={logoMode.value === 'white' ? 'active' : ''}
                onClick$={() => logoMode.value = 'white'}
              >
                White Logo
              </button>
              <button 
                class={logoMode.value === 'color' ? 'active' : ''}
                onClick$={() => logoMode.value = 'color'}
              >
                Color Logo
              </button>
              <button 
                class={logoMode.value === 'reserved' ? 'active' : ''}
                onClick$={() => logoMode.value = 'reserved'}
              >
                Reserved Logo
              </button>
              <button 
                class={logoMode.value === 'black' ? 'active' : ''}
                onClick$={() => logoMode.value = 'black'}
              >
                Black Logo
              </button>
            </div>

            <div class="lp-pagination">
              <button>‹</button>
              <div class="dots">
                <span class="active" />
                <span />
                <span />
              </div>
              <button>›</button>
            </div>
          </div>

          {/* RIGHT */}
          <div class="lp-right">
            <h3>My Logos</h3>
            <p class="lp-desc">
              From billing to revenue recognition, streamline your entire
              contract-to-cash process and eliminate manual work.
            </p>

            <h4>What do you own?</h4>
            <div class="lp-formats">
              {["PNG", "SVG", "PDF", "JPG", "ZIP"].map(f => (
                <span key={f}>{f}</span>
              ))}
            </div>

            <div class="lp-plan">
              <div>
                <strong>Free version</strong>
                <p>Upgrade to Premium to enjoy all the benefits.</p>
              </div>
              <button class="upgrade">Upgrade</button>
            </div>

            <button 
              class="edit-btn" 
              onClick$={(e) => {
                e.stopPropagation();
                props.onEdit$();
              }}
            >
              Edit
            </button>
            <button class="download-btn">
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});