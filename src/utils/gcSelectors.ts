
export const gcSelectors = {
  list: '.list-avaliable-teams',
  lobby: '.lobby-room-list-item',

  loggedUser: {
    avatar: '.MainAvatar img',
  },

  myLobby: {
    root: '#suaLobby',
    inviteButton: '#lobby-invite-friends',
    contentContainer: '.sidebar-content',
    title: '.sidebar-sala-titulo',
    adminPlayer: {
      self: '.sidebar-admin-player',
    },
    player: {
      self: '.sidebar-item',
      avatarLink: '.sidebar-item-imagem a',
    }
  },

  matchModal: {
    self: '#GamersClubCSApp-modals-matchModal'
  },

  filtersContainer: '.FilterLobby_main__23Z64',
  filterLabel: '.FilterLobby_sectionLabel__1zPew',
  filterSection: '.FilterLobby_section__3UmYp',

  lobbies: {
    content: '.lobby-rooms-content',
    bigChallengeButton: '.lobby-btn-big.lobby-btn-play-big',
    player: {
      self: '.sala-lineup-player',
      placeHolder: '.player-placeholder',
      avatarLink: '.gc-avatar a',
    },
    title: '.sala-card-title'
  },

  challengeList: {
    self: '#challengeList',
    currentLobbyContent: '.sidebar-desafios-team-content',
    player: {
      self: '.sala-lineup-player',
      placeHolder: '.player-placeholder',
      avatarLink: '.sala-lineup-imagem a',
    },
  },

  booster: {
    forcedLobbyCreationButton: '#forcarCriacaoLobbyBtn',
  },

  extension: {
    appContainer: '.gcc-app-container',
    kdr: '.gcc-kdr',
    kdrFilterLabel: '.gcc-kdr-filter-label',
    hidden: '.gcc-hide',
    lobbies: {
      challenged: '.gcc-lobby-challenged'
    },
    challenger: {
      self: '.gcc-challenger'
    }
  }
}
