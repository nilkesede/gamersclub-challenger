
export const gcSelectors = {
  loggedUser: {
    avatar: '.MainHeader__navbar .MainAvatar img',
    level: '.MainHeader__navbar .MainHeader__playerLevel .gcf-badge-level-value',
    name: '.MainHeader__navbar .MainHeader__playerNickname'
  },

  globalNavBar: {
    self: '#navbar-placeholder',
  },

  csgoHeader: {
    subscriptionTopBar: '#subscription-status-topbar'
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
      avatarLink: '.sidebar-item-imagem > a',
    }
  },

  preMatchModal: {
    root: 'body.lobby',
    self: '#GamersClubCSApp-modals-matchModal',
    lobby: {
      self: 'aside ul',
      title: 'aside h2',
      player: {
        self: '.PlayerListCard',
        selfFloatRight: '.PlayerListCard--right',
        avatarLink: '.PlayerIdentityAvatar__avatarImage img',
      }
    },
    readyButton: {
      absolute: "#GamersClubCSApp-modals-matchModal button:contains('Ready')",
      relative: "button:contains('Ready')"
    }
  },

  match: {
    tableMatchContainer: {
      self: '.tableMatch__container',
      player: {
        self: '.tableMatch__container tr',
        annotationButton: '.tableMatch__ban',
        nickColumn: '.tableMatch__nickColumn',
        leftColumn: '.tableMatch__leftColumn',
        avatarLink: '.gc-avatar-image',
        name: '.tableMatch__playerLink'
      }

    },
  },

  lobbies: {
    filters: {
      container: '#lobby-filters-container',
      content: '.sc-kEjbQP',
      section: {
        self: '.sc-iqHYmW',
        label: '.lnrdug',
      }
    },
    list: '#lobbies-wrapper',
    self: '.lobby-room-list-item',
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
    profileContainer: '.gc-profile-user',
    userName: '.gc-profile-user-name',
    userId: '.gc-profile-user-id',
    punishments: '.gc-profile-user-punishments img',
    socialButtons: {
      instagram: '.Button--instagram',
      twitch: '.Button--twitch',
      steam: '.Button--steam',
      twitter: '.Button--twitter',
      youtube: '.Button--youtube'
    }
  },

  teamPage: {
    teamRoot: '.TeamProfile__roster',
    player: {
      self: '.PlayerCard',
      avatarLink: '.PlayerCard__avatar a',
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
    kdr: '#gcbooster_kdr'
  },

  extension: {
    appContainer: '.gcc-app-container',
    kdr: '.gcc-kdr',
    marks: {
      wrapper: '.gcc-marks-wrapper',
      self: '.gcc-mark'
    },
    kdrFilterContainer: '.gcc-kdr-filter-container',
    hidden: '.gcc-hide',
    lobbies: {
      challenged: '.gcc-lobby-challenged',
      content: '.sala-card-content',
      pinned: '.gcc-pinned-lobby',
      pinner: {
        self: '.gcc-lobby-pinner'
      }
    },
    challenger: {
      self: '.gcc-challenger'
    },
    preMatchModal: {
      readyButton: {
        autoReadyDone: '.gcc-auto-ready-done'
      }
    }
  }
}