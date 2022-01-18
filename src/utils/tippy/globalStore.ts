export let tippyInstances: any = [];

export const globalStore = {
  fn(instance : any) {
    return {
      onCreate() {
        tippyInstances.push(instance);
      },
      onDestroy() {
        tippyInstances = tippyInstances.filter((i: any) => i !== instance);
      },
    };
  },
};