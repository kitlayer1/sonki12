import { component$, useSignal, $ } from '@builder.io/qwik';
import './faq.css';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  title?: string;
  faqs: FAQItem[];
}

export const FAQ = component$<FAQProps>(({ 
  title = 'Frequently asked questions', // artık \n yok
  faqs 
}) => {
  const openIndex = useSignal<number | null>(null);

  const toggle = $((index: number) => {
    openIndex.value = openIndex.value === index ? null : index;
  });

  return (
    <section class="faq-container">
      <div class="faq-left">
        <h2 class="faq-title">{title}</h2> {/* artık split ve br yok */}
      </div>

      <div class="faq-right">
        {faqs.map((item, index) => (
          <div
            key={index}
            class={`faq-item ${openIndex.value === index ? 'open' : ''}`}
            onClick$={() => toggle(index)}
          >
            <div class="faq-question">
              <span>{item.question}</span>
              <span class="faq-icon">
                {openIndex.value === index ? '−' : '+'}
              </span>
            </div>

            {openIndex.value === index && (
              <div class="faq-answer">{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
});
