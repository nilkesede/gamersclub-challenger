import { tippyInstances } from "./globalStore";
import tippy, {createSingleton} from 'tippy.js';

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