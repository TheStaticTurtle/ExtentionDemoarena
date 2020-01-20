function openPage(tab) {
  chrome.tabs.create({
    url: "https://demoarena.iut-bm.univ-fcomte.fr/traitement.php"
  });
}

chrome.browserAction.onClicked.addListener(openPage);