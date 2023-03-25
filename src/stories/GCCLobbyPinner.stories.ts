
import GCChallengerContentRunner from '../shared/contentRunner'
import GCCLobbyPinner from '../components/GCCLobbyPinner.vue'

export default {
  title: 'Lobby/GCCLobbyPinner',
  component: GCCLobbyPinner,
  argsType: {}
}

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { GCCLobbyPinner },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <div id="lobbyRoomListItem-50508635" class="lobby-room-list-item sala-card-wrapper">
      <div>
        <div class="sala-card-content sala-card-content-prime">
          <GCCLobbyPinner v-bind="args" />
        </div>
      </div>
    </div>
  `,
});


export const Primary = Template.bind({});
// @ts-ignore
Primary.args = {}