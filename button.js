const btns = document.querySelectorAll(".button");
const imgs = document.querySelectorAll("img");

function openPage(url) {
  window.open(url);
}

function deselectOption(opt) {
  opt.classList.remove("hovered");
}

function selectOption(opt) {
  opt.classList.add("hovered");
  currentSelection = opt;
}

function onSelection(e) {
  if (e.target.tagName == "P") return;

  selectOption(this);
}

//
function onClick(e) {
  if (currentSelection == null) return;

  currentSelection.querySelector(".icon").classList.add("clicked");
  currentSelection.querySelector(".shadow").classList.add("clicked");
}

function onExit(e) {
  if (currentSelection == null) return;

  currentSelection.querySelector(".icon").classList.remove("clicked");
  currentSelection.querySelector(".shadow").classList.remove("clicked");
  deselectOption(this);
}

btns.forEach(btn => {
  btn.addEventListener("mouseenter", onSelection);
  btn.addEventListener("mousedown", onClick);
  btn.addEventListener("mouseleave", onExit);
  btn.addEventListener("mouseup", onExit);
});

// Make images unable to be dragged
imgs.forEach(img => {
  img.ondragstart = function() {
    return false;
  };
});
