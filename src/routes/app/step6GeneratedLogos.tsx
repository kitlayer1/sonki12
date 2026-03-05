import { component$, useStore, $, type QRL } from '@builder.io/qwik';
import { allFavicons } from './allFavicons';
import { allFonts } from './allFonts';
import { colorOptionById } from './colorOption';
import "./step6GeneratedLogos.css";
import { AppHeader } from './components/header/header';

export const Step6GeneratedLogos = component$((props: {
  brandName: string;
  selectedStyleIds: number[];
  colors: number[];
  selectedFontStyleId: number;
  onSelect$: QRL<(index: number) => void>;
}) => {
  const state = useStore({
    visibleCount: 12,
  });

  const usableFavicons = allFavicons.filter(f =>
    props.selectedStyleIds.includes(f.styleId)
  );

  const usableFonts = allFonts.filter(
    f => f.styleId === props.selectedFontStyleId
  );

  const loadMore = $(() => {
    state.visibleCount += 12;
  });

  const handleSelect = $((i: number) => {
    props.onSelect$(i);
  });

  return (
    <div class="step6">
         <AppHeader />
      <div class="step6-content">
     

        <div class="step6-header">
          <div class="step6-text">
            <h2>Pick a logo to customize</h2>
            <p class="step6-description">
              Beğendiğin logoya tıkla ve devam et.
            </p>
          </div>
        </div>

        <div class="step6-options">
          {Array.from({ length: Math.min(state.visibleCount, 1000) }).map((_, i) => {
            const f = usableFavicons[i % usableFavicons.length];

            const font =
              usableFonts.length > 0
                ? usableFonts[i % usableFonts.length].fontFamily
                : 'sans-serif';

            const selectedId = props.colors[i % props.colors.length];
            const option = colorOptionById[selectedId];

            const palettes =
              option?.palettes || [
                { background: '#f9f9f9', text: '#222' },
              ];

            const palette = palettes[i % palettes.length];

            return (
              <div
                key={i}
                class="step6-logo-item"
                style={{
                  backgroundColor: palette.background,
                  fontFamily: font,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  borderRadius: '10px',
                  minHeight: '240px',
                  transition: 'all 0.2s ease',
                }}
                onClick$={() => handleSelect(i)}
              >
                <img
                  src={f.iconPath}
                  alt="icon"
                  style={{
                    width: '85px',
                    height: '85px',
                    marginBottom: '2rem',
                  }}
                />
                <span
                  style={{
                    fontSize: '2rem',
                    color: palette.text,
                  }}
                >
                  {props.brandName}
                </span>
              </div>
            );
          })}
        </div>

        {state.visibleCount < 1000 && (
          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <button class="step6-more-button" onClick$={loadMore}>
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
});
