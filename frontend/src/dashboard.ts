interface Window {
  goToMaP: (event: Event) => void
}

const goToMap = (event: Event) => {
    window.location.replace("http://localhost:3001/game_map");
}

window.goToMaP = goToMap;