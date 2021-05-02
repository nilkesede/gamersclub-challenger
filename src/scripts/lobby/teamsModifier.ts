
const selectors = {
  list: '.list-avaliable-teams',
  room: '.list-avaliable-teams .lobby-room-list-item.sala-card-wrapper',
  player: '.list-avaliable-teams .sala-lineup-player',
  playerAvatarLink: '.gc-avatar a'
};

export default class TeamsModifier {

  constructor(){
    $(selectors.list).on("change", this.modifyAvailableTeams)
  }

  modifyAvailableTeams(): void {
    this.showKDForAvailableTeams()
  }

  showKDForAvailableTeams(): void {
    const players = $( selectors.room ).find( selectors.player );
    players.get().map( player => {
      const $player = $( player );
      const playerAvatarLink = $player.find( selectors.playerAvatarLink );
      const title = playerAvatarLink.attr( 'title' );
      if ( title ) {
        const kd = title.split( '|' )[1];
        const shortKd = kd.split( ':' )[1].trim();
        console.log( '==>', shortKd );
        const $kdBooster = $( `<div>${shortKd}</div>` );
        $kdBooster.css( {
          backgroundColor: 'black',
          color: 'white',
          padding: '5',
          fontSize: '10px',
          width: '100%'
        } );
        $player.prepend( $kdBooster );
      }
    })
  }
}