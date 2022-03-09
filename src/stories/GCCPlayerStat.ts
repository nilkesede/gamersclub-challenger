import GCCPlayerStats from '../components/GCCPlayerStats.vue';


export default {
  title: 'Example/GCCPlayerStats',
  component: GCCPlayerStats,

  argTypes: {
    playerId: {
      name: 'playerId',
      type: { name: 'string', required: false },
    }
  },
};


const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { GCCPlayerStats },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<GCCPlayerStats v-bind="args" />',
});

export const Common = Template.bind({})
// @ts-ignore
Common.args = {
  playerId: '340558'
}