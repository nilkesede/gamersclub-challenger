
import GCChallengerContentRunner from '../utils/contentRunner'

import kdr from '../components/KDR.vue';
import GCCFiltersBar from '../components/GCCFiltersBar.vue';

export default {
  title: 'Lobby/GCCFiltersBar',
  component: GCCFiltersBar,

  argTypes: {
  },
};

const Template = async (args) => {
  await GCChallengerContentRunner.preRun('GA_INITIALIZED')
  return {
    // Components used in your story `template` are defined in the `components` object
    components: { GCCFiltersBar },
    // The story's `args` need to be mapped into the template through the `setup()` method
    setup() {
      return { args };
    },
    // And then the `args` are bound to your component with `v-bind="args"`
    template: '<GCCFiltersBar v-bind="args" />',
  }
};

export const Primary = Template.bind({});
// @ts-ignore
Primary.args = {};