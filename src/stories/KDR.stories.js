
import GCChallengerContentRunner from '../utils/contentRunner'

import kdr from '../components/KDR.vue';
import GCCPlayerStatsComparator from '../components/GCCPlayerStatsComparator.vue';

export default {
  title: 'Lobby/KDR',
  component: kdr,

  argTypes: {
    value: {
      name: 'value',
      type: { name: 'string', required: false },
    },
    playerId: {
      name: 'playerId',
      type: { name: 'string', required: false },
    }
  },
};

const Template = async (args) => {
  await GCChallengerContentRunner.preRun('GA_INITIALIZED')
  return {
    // Components used in your story `template` are defined in the `components` object
    components: { kdr, GCCPlayerStatsComparator },
    // The story's `args` need to be mapped into the template through the `setup()` method
    setup() {
      return { args };
    },
    // And then the `args` are bound to your component with `v-bind="args"`
    template: '<kdr v-bind="args" />',
  }
};

export const Primary = Template.bind({});
// @ts-ignore
Primary.args = {
  value: '1.2',
  playerId: '340558',
};