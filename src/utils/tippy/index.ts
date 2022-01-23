import { tippyInstances } from "./globalStore";
import tippy, {createSingleton, Props, sticky} from 'tippy.js';

// APIs to manipulate all tippy instances
export function updateAll(props: any) {
  tippyInstances.forEach((instance: any) => {
    instance.setProps(props);
  });
}

export const newInstance = (selector: string) => {
  const tippyInstances = tippy(selector);
  const singleton = createSingleton(tippyInstances, { delay: 1000 });
  return singleton
}

export const newTippy = ($el: string | any, optionalProps: Partial<Props> = {}) => {
  return tippy($el, {
    placement: process.env.NODE_ENV === 'development' ? 'right' : 'auto',
    plugins: [ sticky ],
    allowHTML: true,
    sticky: true,
    animation: false,
    maxWidth: 'none',
    interactive: true,
    appendTo: document.body,
    content: `<div id="gcc-tippy-content">Loading...</div>`,
    trigger: 'click',
    showOnCreate: true,
    ...optionalProps
  })
}