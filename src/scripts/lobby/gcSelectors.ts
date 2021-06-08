
export const gcSelectors = {
  list: '.list-avaliable-teams',
  lobby: '.lobby-room-list-item',

  myLobby: {
    root: '#suaLobby',
    inviteButton: '#lobby-invite-friends',
    title: '.sidebar-sala-titulo',
    adminPlayer: {
      self: '.sidebar-admin-player',
    },
    player: {
      self: '.sidebar-item',
      avatarLink: '.sidebar-item-imagem a',
    }
  }
  ,

  filtersContainer: '.FilterLobby_main__23Z64',
  filterLabel: '.FilterLobby_sectionLabel__1zPew',
  filterSection: '.FilterLobby_section__3UmYp',

  lobbies: {
    content: '.lobby-rooms-content',
    player: {
      self: '.sala-lineup-player',
      placeHolder: '.player-placeholder',
      avatarLink: '.gc-avatar a',
    }
  },

  extension: {
    appContainer: '.gcc-app-container',
    kdr: '.gcc-kdr',
    kdrFilterLabel: '.gcc-kdr-filter-label'
  }
}
