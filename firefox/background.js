function openPage() {
  browser.tabs.create({
    url: "https://demoarena.iut-bm.univ-fcomte.fr/traitement.php"
  });
}

browser.browserAction.onClicked.addListener(openPage);