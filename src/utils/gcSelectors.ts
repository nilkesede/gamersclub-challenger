
export const gcSelectors = {
  list: '.list-avaliable-teams',
  lobby: '.lobby-room-list-item',

  loggedUser: {
    avatar: '.MainHeader__navbar .MainAvatar img',
    level: '.MainHeader__navbar .MainHeader__playerLevel .gcf-badge-level-value',
    name: '.MainHeader__navbar .MainHeader__playerNickname'
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

  playerPage: {
    socialButtons: {
      instagram: '.Button--instagram',
      twitch: '.Button--twitch',
      steam: '.Button--steam',
      twitter: '.Button--twitter',
    }
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

  login: {
    steamButton: '.AuthForm__button--loginSteam'
  },

  steamLoginPage: {
    loginForm: '#loginForm',
    usernameInput: '#steamAccountName',
    passInput: '#steamPassword',
    loginButton: '#imageLogin'
  },

  booster: {
    buttonsContainer: '#gcbooster_botoes',
  },

  extension: {
    appContainer: '.gcc-app-container',
    kdr: '.gcc-kdr',
    kdrFilterContainer: '.gcc-kdr-filter-container',
    hidden: '.gcc-hide',
    lobbies: {
      challenged: '.gcc-lobby-challenged'
    },
    challenger: {
      self: '.gcc-challenger'
    }
  }
}
