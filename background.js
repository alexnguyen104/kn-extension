const rotateOptions = ["90", "-90", "180"]
const translateOptions = ["Google Translate", "Cambridge Dictionary"]
let currentDegree = 0

chrome.runtime.onInstalled.addListener(async () => {
  rotate();
  translate();
});

function rotate(){
  chrome.contextMenus.create({
    id: "rotate",
    title: "Rotate",
    type: 'normal',
    contexts: ['image']
  });
  for (let [degree_id, degree] of Object.entries(rotateOptions)) {
    chrome.contextMenus.create({
      id: "rotate_" + degree_id.toString(),
      title: degree + "°",
      type: 'normal',
      parentId: "rotate",
      contexts: ['image']
    });
  }
}

function translate(){
  chrome.contextMenus.create({
    id: "translate",
    title: 'Translate "%s"',
    type: 'normal',
    contexts: ['selection']
  });
  for (let [dictionary_id, dictionary] of Object.entries(translateOptions)) {
    chrome.contextMenus.create({
      id: "translate_" + dictionary_id.toString(),
      title: dictionary + ': "%s"',
      type: 'normal',
      parentId: "translate",
      contexts: ['selection']
    });
  }
}

chrome.contextMenus.onClicked.addListener((item, tab) => {
  currentIndexOfOptionOfCertainMenu = parseInt(item.menuItemId.slice(item.menuItemId.indexOf("_") + 1))

  if(item.parentMenuItemId == "rotate"){
    valueClicked = parseInt(rotateOptions[currentIndexOfOptionOfCertainMenu])
    chrome.tabs.sendMessage(tab.id, {parameter: valueClicked});
  }

  else if(item.parentMenuItemId == "translate"){
    var url = ''
    if(translateOptions[currentIndexOfOptionOfCertainMenu] == "Google Translate"){
      url = new URL(`https://translate.google.com/?hl=vi&sl=en&tl=vi&text=${item.selectionText}&op=translate`);  
    }
    else if(translateOptions[currentIndexOfOptionOfCertainMenu] == "Cambridge Dictionary"){
      url = new URL(`https://dictionary.cambridge.org/dictionary/english/${item.selectionText}`);   
    }
    chrome.tabs.create({ url: url.href, index: tab.index + 1 });
  }
  
});