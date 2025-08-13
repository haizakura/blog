import { animate, spring } from 'motion';

export function springScrollToElement(element: HTMLElement) {
  const y = Math.min(element.getBoundingClientRect().top + window.scrollY - 110, document.body.clientHeight);
  animate(window.scrollY, y, {
    type: spring,
    bounce: 0.1,
    duration: 0.5,
    onUpdate: (value) => {
      window.scrollTo(0, value);
    },
  });
}
