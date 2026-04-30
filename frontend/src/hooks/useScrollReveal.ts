import { useEffect, useRef } from 'react';

/**
 * Custom hook that observes elements and adds scroll-reveal animation
 * when they enter the viewport. Attach the returned ref to a container,
 * and all children with `data-reveal` attribute will animate in.
 * 
 * Usage:
 *   const revealRef = useScrollReveal();
 *   <div ref={revealRef}>
 *     <div data-reveal>I animate when scrolled into view</div>
 *     <div data-reveal="delay-200">I animate with 200ms delay</div>
 *   </div>
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>() {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll('[data-reveal]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.classList.add('scroll-visible');
            el.classList.remove('scroll-hidden');
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((el) => {
      el.classList.add('scroll-hidden');
      // Apply custom delay from data-reveal attribute
      const delay = el.getAttribute('data-reveal');
      if (delay) {
        (el as HTMLElement).style.transitionDelay = delay;
      }
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return containerRef;
}
