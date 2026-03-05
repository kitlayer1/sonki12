// src/components/editor/Modal/downloadModal.tsx
import { component$, useSignal, $, QRL } from '@builder.io/qwik';
import "./downloadModal.css";

interface DownloadModalProps {
  brandName: string;
  generateSvg: () => Promise<string>;
  palette?: { background: string; text: string; icon?: string };
  closeMethod?: () => void;
  triggerElement?: HTMLElement;
  isPaid?: boolean;
  planType?: 'started' | 'business' | null;
  onFormatSelect?: QRL<(format: string, includeAll: boolean) => Promise<boolean>>;
  onShowPricing$?: () => void; // Bu prop'u ekliyoruz
}

export const DownloadModal = component$<DownloadModalProps>((props) => {
  const showModal = useSignal(true);
  const modalPosition = useSignal({ top: 0, left: 0 });
  const selectedFormat = useSignal('jpg');
  const includeAllFormats = useSignal(false);
  const showFormatModal = useSignal(false);
  const isMobile = useSignal(false);
  const isDownloading = useSignal(false);

  // Chess Queen SVG ikonu
  const chessQueenIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="chess-queen-icon">
    <path d="M4 20a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"/>
    <path d="m12.474 5.943 1.567 5.34a1 1 0 0 0 1.75.328l2.616-3.402"/>
    <path d="m20 9-3 9"/>
    <path d="m5.594 8.209 2.615 3.403a1 1 0 0 0 1.75-.329l1.567-5.34"/>
    <path d="M7 18 4 9"/>
    <circle cx="12" cy="4" r="2"/>
    <circle cx="20" cy="7" r="2"/>
    <circle cx="4" cy="7" r="2"/>
  </svg>`;

  // Ekran genişliğini kontrol et
  const checkScreenSize$ = $(() => {
    isMobile.value = window.innerWidth < 1000;
  });

  // Modal pozisyonunu hesapla
  const calculatePosition$ = $(() => {
    if (!props.triggerElement) return;
    
    if (isMobile.value) {
      modalPosition.value = { top: 0, left: 0 };
    } else {
      const rect = props.triggerElement.getBoundingClientRect();
      const modalWidth = 440;
      const modalHeight = 400;
      
      let top = rect.bottom + 10;
      let left = rect.left + (rect.width - modalWidth) / 2;
      
      if (left + modalWidth > window.innerWidth) {
        left = window.innerWidth - modalWidth - 10;
      }
      
      if (left < 10) {
        left = 10;
      }
      
      if (top + modalHeight > window.innerHeight) {
        top = rect.top - modalHeight - 10;
      }
      
      modalPosition.value = { top, left };
    }
  });

  const downloadSvg$ = $(async () => {
    const svg = await props.generateSvg();
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${props.brandName}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  });

  const downloadPng$ = $(async () => {
    const svg = await props.generateSvg();
    const img = new Image();
    const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
    
    return new Promise<void>((resolve) => {
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 4000;
        canvas.height = 4000;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, 4000, 4000);
        const a = document.createElement("a");
        a.href = canvas.toDataURL("image/png");
        a.download = `${props.brandName}.png`;
        a.click();
        URL.revokeObjectURL(url);
        resolve();
      };
      img.src = url;
    });
  });

  const downloadJpg$ = $(async () => {
    const svg = await props.generateSvg();
    const img = new Image();
    const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
    
    return new Promise<void>((resolve) => {
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 4000;
        canvas.height = 4000;
        const ctx = canvas.getContext("2d")!;
        ctx.fillStyle = props.palette?.background || '#ffffff';
        ctx.fillRect(0, 0, 4000, 4000);
        ctx.drawImage(img, 0, 0, 4000, 4000);
        const a = document.createElement("a");
        a.href = canvas.toDataURL("image/jpeg", 0.95);
        a.download = `${props.brandName}.jpg`;
        a.click();
        URL.revokeObjectURL(url);
        resolve();
      };
      img.src = url;
    });
  });

  const downloadPdf$ = $(async () => {
    const svg = await props.generateSvg();
    const blob = new Blob([svg], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${props.brandName}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  });

  const downloadZip$ = $(async () => {
    await downloadJpg$();
    await downloadPng$();
    await downloadSvg$();
    await downloadPdf$();
  });

  const handleClose$ = $(() => {
    showModal.value = false;
    props.closeMethod?.();
  });

  // Format seçiminde kontrol
  const canDownloadFormat = (format: string): boolean => {
    // JPG herkes tarafından indirilebilir
    if (format === 'jpg') return true;
    
    // Diğer formatlar için satın alma kontrolü
    return props.isPaid === true && (props.planType === 'started' || props.planType === 'business');
  };

  // İndirme işlemini başlat
  const handleDownload$ = $(async () => {
    // Eğer "Include all logo formats" seçildiyse
    if (includeAllFormats.value) {
      // Business plan kontrolü
      if (props.planType !== 'business') {
        // Pricing modalını aç
        props.onShowPricing$?.();
        handleClose$();
        return;
      }
    }
    
    // Seçilen format JPG değilse ve kullanıcı satın almamışsa
    if (selectedFormat.value !== 'jpg' && !canDownloadFormat(selectedFormat.value)) {
      // Pricing modalını aç
      props.onShowPricing$?.();
      handleClose$();
      return;
    }

    if (props.onFormatSelect) {
      const canDownload = await props.onFormatSelect(
        selectedFormat.value, 
        includeAllFormats.value
      );
      
      if (canDownload === false) {
        return;
      }
    }

    isDownloading.value = true;
    
    try {
      if (includeAllFormats.value) {
        // Business plan kontrolü tekrar
        if (props.planType !== 'business') {
          throw new Error('Bu özellik için Business paketi gereklidir.');
        }
        await downloadJpg$();
        await downloadPng$();
        await downloadSvg$();
        await downloadPdf$();
        await downloadZip$();
      } else {
        if (selectedFormat.value === 'png') await downloadPng$();
        if (selectedFormat.value === 'jpg') await downloadJpg$();
        if (selectedFormat.value === 'svg') await downloadSvg$();
        if (selectedFormat.value === 'pdf') await downloadPdf$();
        if (selectedFormat.value === 'zip') await downloadZip$();
      }
      
      handleClose$();
    } catch (error) {
      console.error("İndirme hatası:", error);
    } finally {
      isDownloading.value = false;
    }
  });

  const openFormatModal$ = $(() => {
    showFormatModal.value = true;
  });

  const closeFormatModal$ = $(() => {
    showFormatModal.value = false;
  });

  const selectFormat$ = $((format: string) => {
    // Format seçiminde kontrol - JPG dışındaki formatlar için pricing modalı aç
    if (format !== 'jpg' && !canDownloadFormat(format)) {
      props.onShowPricing$?.();
      closeFormatModal$();
      handleClose$();
      return;
    }
    
    selectedFormat.value = format;
    closeFormatModal$();
  });

  const formatOptions = [
    { value: 'jpg', label: 'JPG', description: 'Ücretsiz - Her zaman indirebilirsiniz' },
    { value: 'png', label: 'PNG', description: 'Yüksek çözünürlüklü PNG (Paket gerekli)' },
    { value: 'svg', label: 'SVG', description: 'Vektör formatı (Paket gerekli)' },
    { value: 'pdf', label: 'PDF', description: 'PDF belgesi (Paket gerekli)' },
    { value: 'zip', label: 'ZIP (Tümü)', description: 'Tüm formatlar tek dosyada (Business paket gerekli)' }
  ];

  // Modal gösterildiğinde pozisyonu hesapla
  if (showModal.value) {
    checkScreenSize$();
    calculatePosition$();
  }

  const isPaidUser = props.isPaid === true && (props.planType === 'started' || props.planType === 'business');

  return (
    <>
      {/* Ana Download Modal */}
      {showModal.value && (
        <div class="canva2025-overlay">
          <div class="canva2025-backdrop" onClick$={handleClose$} />
          <div 
            class={`canva2025-modal ${isMobile.value ? 'canva2025-modal-mobile' : ''}`}
            style={
              isMobile.value 
                ? {} 
                : {
                    position: 'fixed',
                    top: `${modalPosition.value.top}px`,
                    left: `${modalPosition.value.left}px`
                  }
            }
          >
            <div class="canva2025-header">
              <h2>Download</h2>
              <button class="canva2025-close-btn" onClick$={handleClose$}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                </svg>
              </button>
            </div>

            <div class="canva2025-content">
              <div class="canva2025-section">
                <label class="canva2025-label">File type</label>
                <div class="canva2025-select-wrapper">
                  <div class="canva2025-select-trigger" onClick$={openFormatModal$}>
                    <span class="canva2025-selected-value">
                      {formatOptions.find(opt => opt.value === selectedFormat.value)?.label}
                      {selectedFormat.value === 'jpg' && ' (Free)'}
                    </span>
                    <svg 
                      class="canva2025-select-arrow"
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      stroke-width="2" 
                      stroke-linecap="round" 
                      stroke-linejoin="round"
                    >
                      <path d="m6 9 6 6 6-6"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div class="canva2025-section">
                <div class="canva2025-checkbox-wrapper">
                  <input 
                    type="checkbox" 
                    id="all-formats" 
                    class="canva2025-checkbox" 
                    checked={includeAllFormats.value}
                    onChange$={(e) => {
                      const checked = (e.target as HTMLInputElement).checked;
                      // Business plan kontrolü
                      if (checked && props.planType !== 'business') {
                        props.onShowPricing$?.();
                        handleClose$();
                        return;
                      }
                      includeAllFormats.value = checked;
                    }}
                    disabled={props.planType !== 'business'} // Sadece Business plan sahipleri kullanabilir
                  />
                  <label for="all-formats" class="canva2025-checkbox-label">
                    Include all logo formats
                    {props.planType !== 'business' && (
                      <span 
                        class="canva2025-premium-icon"
                        dangerouslySetInnerHTML={chessQueenIcon}
                        title="Sadece Business paketinde bulunur"
                      />
                    )}
                  </label>
                </div>
                
                {/* Bilgilendirme mesajı */}
                {!isPaidUser && (
                  <div class="canva2025-plan-warning">
                    <small>
                      ⚡ JPG formatı ücretsizdir. Diğer formatlar için paket satın almalısınız.
                    </small>
                  </div>
                )}
              </div>
            </div>

            <div class="canva2025-footer">
              <button 
                class="canva2025-download-btn" 
                onClick$={handleDownload$}
                disabled={isDownloading.value}
              >
                {isDownloading.value ? 'Downloading...' : 'Download'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Format Seçim Modalı */}
      {showFormatModal.value && (
        <div class="canva2025-format-overlay">
          <div class="canva2025-format-backdrop" onClick$={closeFormatModal$} />
          <div 
            class={`canva2025-format-modal ${isMobile.value ? 'canva2025-format-modal-mobile' : ''}`}
            style={
              isMobile.value 
                ? {} 
                : {
                    position: 'fixed',
                    top: `${modalPosition.value.top}px`,
                    left: `${modalPosition.value.left}px`
                  }
            }
          >
            <div class="canva2025-format-header">
              <h3>File type</h3>
              <button class="canva2025-format-close-btn" onClick$={closeFormatModal$}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                </svg>
              </button>
            </div>
            
            <div class="canva2025-format-content">
              {formatOptions.map((option) => {
                const isEnabled = option.value === 'jpg' || isPaidUser;
                const isBusinessOnly = option.value === 'zip';
                const showBusinessIcon = option.value !== 'jpg' && !isPaidUser;
                
                return (
                  <div 
                    key={option.value}
                    class={`canva2025-format-option ${selectedFormat.value === option.value ? 'canva2025-format-option-selected' : ''}`}
                    onClick$={() => {
                      if (option.value === 'jpg') {
                        selectFormat$(option.value);
                      } else if (isPaidUser) {
                        selectFormat$(option.value);
                      } else {
                        props.onShowPricing$?.();
                        closeFormatModal$();
                        handleClose$();
                      }
                    }}
                  >
                    <div class="canva2025-format-option-content">
                      <div class="canva2025-format-option-label">
                        {option.label}
                        {option.value === 'jpg' && (
                          <span class="canva2025-format-free-badge">Free</span>
                        )}
                        {showBusinessIcon && (
                          <span 
                            class="canva2025-format-premium-icon"
                            dangerouslySetInnerHTML={chessQueenIcon}
                          />
                        )}
                        {isBusinessOnly && isPaidUser && props.planType !== 'business' && (
                          <span class="canva2025-format-business-badge">Business</span>
                        )}
                      </div>
                      <div class="canva2025-format-option-description">{option.description}</div>
                    </div>
                    {selectedFormat.value === option.value && (
                      <svg 
                        class="canva2025-format-option-check"
                        xmlns="http://www.w3.org/2000/svg" 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        stroke-width="2" 
                        stroke-linecap="round" 
                        stroke-linejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
});