// src/components/pricing/pricingModal.tsx
import { component$, $ } from "@builder.io/qwik";
import { supabase } from "~/lib/supabaseClient";
import "./pricingModal.css";

export const PricingModal = component$(
  (props: {
    sessionId: string;
    onClose$: () => void;
    onSuccess$: (planType: 'started' | 'business') => void;
  }) => {
    const handlePurchase = $(async (planType: 'started' | 'business') => {
      const { error } = await supabase
        .from("logo_sessions")
        .update({ 
          paid: true,
          plan_type: planType
        })
        .eq("id", props.sessionId);

      if (!error) {
        props.onSuccess$(planType);
      }
    });

    return (
      <div class="pricing-overlay">
        <div class="pricing-backdrop" onClick$={props.onClose$} />
        <div class="pricing-modal">
          <div class="pricing-header">
            <h3>Choose your plan</h3>
            <button class="close-btn" onClick$={props.onClose$}>✕</button>
          </div>

          <div class="pricing-body">
            {/* Started Package */}
            <div class="plan premium">
              <h4>Started</h4>
              <p class="plan-subtitle">PNG, SVG, PDF formats</p>
              
              <div class="price-container">
                <span class="price">$65</span>
                <span class="price-period">One-time payment</span>
              </div>
              
              <button class="select-btn" onClick$={async () => await handlePurchase('started')}>Select</button>
              
              <ul class="features-list">
                <li>PNG, SVG, PDF formats</li>
                <li>Unlimited changes</li>
                <li>Lifetime technical support</li>
                <li>Full ownership</li>
              </ul>
            </div>

            {/* Business Package */}
            <div class="plan brand-kit">
              <div class="badge">Most Popular</div>
              <h4>Business</h4>
              <p class="plan-subtitle">Everything you need to start your business</p>
              
              <div class="price-container">
                <span class="price">$96</span>
                <span class="price-period">/ One-time payment</span>
              </div>
              
              <button class="select-btn" onClick$={async () => await handlePurchase('business')}>Select</button>
              
              <ul class="features-list">
                <li class="recently-added">Recently Added</li>
                <li class="single-page">Single page websites</li>
                <li>Include all logo formats (ZIP)</li>
              </ul>
              
              <div class="additional-feature">
                <span class="check-icon">✓</span>
                PNG, SVG, PDF formats
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);