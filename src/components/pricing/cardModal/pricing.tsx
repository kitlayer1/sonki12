import { component$ } from "@builder.io/qwik";
import "./pricing.css";

interface Plan {
  title: string;
  price: string;
  subtitle?: string;
  description: string;
  buttonText: string;
  features: string[];
  featured?: boolean;
  showInfoBox?: boolean;
}

export const Pricing = component$(() => {
  const plans: Plan[] = [
    {
      title: "Basic",
      price: "Free",
      description:
        "Ideal for beginners who want to test features before upgrading.",
      buttonText: "Select",
      features: [
        "Download logo in JPG format",
        "Standard resolution export",
        "Basic customization",
      ],
    },
    {
      title: "Started",
      price: "$7.90",
      subtitle: "/One-time payment",
      description:
        "Unlock high-quality logo exports and essential branding tools.",
      buttonText: "Select",
       showInfoBox: true,
      features: [
        "SVG, PNG & JPG exports",
        "Transparent background",
        "High-resolution files",
        "Full customization access",
        "Commercial use license",
      ],
    },
    {
      title: "Business",
      price: "$10.90",
      subtitle: "/One-time payment",
      description:
        "Full commercial rights, premium exports, and advanced customization.",
      buttonText: "Select",
      featured: true, // TURUNCU
       showInfoBox: true,
      features: [
        "Everything in Started",
        "Black & white logo version",
        "Inverted color version",
        "Favicon version",
        "Commercial use license",
        "Priority support",
      ],
    },
  ];

  return (
    <section class="pricing-section">
      <div class="pricing-container">
        <div class="pricing-headers">
          <h2 class="pricing-title">Pricing</h2>
          <p class="pricing-subtitle">
            Choose the plan that fits your needs and start creating professional logos without hidden fees or surprises.
          </p>
        </div>

        <div class="pricing-grid">
          {plans.map((plan, index) => (
            <div
              key={index}
              class={`pricing-card ${plan.featured ? "featured" : ""}`}
            >
              <h4 class="plan-title">{plan.title}</h4>

              <div class="price">
                <span class="amount">{plan.price}</span>
                {plan.subtitle && <span class="subtitle">{plan.subtitle}</span>}
              </div>

              <p class="description">{plan.description}</p>

              <button
                class={`pricing-btn ${
                  plan.featured ? "primary-btn" : "secondary-btn"
                }`}
              >
                {plan.buttonText}
              </button>

              <ul class="feature-list">
                {plan.features.map((feature, i) => (
                  <li key={i}>✓ {feature}</li>
                ))}
              </ul>
              {plan.showInfoBox && (
                <div class="info-box">
                  <p>
                   Full commercial rights.

                  </p>
                  <p>
                  Exclusive ownership guaranteed.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
