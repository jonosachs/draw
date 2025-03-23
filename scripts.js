import { nike } from "./paintings.js";

document.addEventListener("DOMContentLoaded", (event) => {
  const boxContainer = document.getElementById("box-container");
  const numBoxes = 920;
  let shiftKey = false;

  document.addEventListener("keydown", (event) => {
    if (event.key === "Shift") {
      shiftKey = true;
    }
  });

  document.addEventListener("keyup", (event) => {
    if (event.key === "Shift") {
      shiftKey = false;
    }
  });

  for (let i = 1; i <= numBoxes; i++) {
    const box = document.createElement("div");
    box.id = `myBox${i}`;
    box.className = "box";
    box.textContent = i;
    box.addEventListener("mouseover", () => {
      shiftKey ? box.classList.remove("blue-bg") : box.classList.add("blue-bg");
    });
    boxContainer.appendChild(box);
  }

  const buttons = {
    "btn-reset": reset,
    "btn-save": save,
    "btn-load": load,
    "btn-getPixels": getPixels,
    "btn-drawPixels": drawPixels,
    "btn-clearText": clearText,
  };

  Object.entries(buttons).forEach(([btn, action]) => {
    document.getElementById(btn).addEventListener("click", action);
  });

  function reset() {
    const allBoxes = document.querySelectorAll(".box");

    allBoxes.forEach((box) => {
      box.classList.remove("blue-bg");
    });
  }

  function save() {
    localStorage.clear();

    for (let i = 1; i <= numBoxes; i++) {
      const myBox = document.getElementById(`myBox${i}`);
      localStorage.setItem(myBox.id, myBox.className);
    }

    localStorage ? showToast("Saved") : showToast("Save Failed");
  }

  function load() {
    for (let i = 1; i <= numBoxes; i++) {
      const currentBox = document.getElementById(`myBox${i}`);
      const storedBox = localStorage.getItem(currentBox.id);

      if (!storedBox) {
        showToast("Load failed");
        return;
      }

      storedBox.includes("blue-bg")
        ? currentBox.classList.add("blue-bg")
        : currentBox.classList.remove("blue-bg");

      showToast("Loaded");
    }
  }

  function drawPixels() {
    let textBox = document.getElementById("pixelBar").value;

    if (!textBox) {
      showToast("Empty");
      return;
    }

    if (textBox == "nike") {
      console.log("nike");
      textBox = nike;
    } else {
      textBox = textBox.split(",");
      textBox = textBox.map((value) => value.replace(/\s/g, ""));
      textBox.forEach((value) => {
        if (isNaN(value)) {
          showToast("Not a number");
          return;
        }
        setPixelBar(textBox);
      });
    }

    for (let i = 1; i <= numBoxes; i++) {
      const currentBox = document.getElementById(`myBox${i}`);
      if (textBox.includes(i.toString()) | textBox.includes(i)) {
        currentBox.classList.add("blue-bg");
      } else {
        currentBox.classList.remove("blue-bg");
      }
    }
  }

  function getPixels() {
    var pixels = [];
    for (let i = 1; i <= numBoxes; i++) {
      const currentBox = document.getElementById(`myBox${i}`);
      if (currentBox.className.includes("blue-bg")) {
        pixels.push(i);
      }
    }
    if (pixels.length > 0) {
      setPixelBar(pixels.toString());
      showToast("Done");
    } else {
      showToast("Empty");
    }
  }

  function setPixelBar(text) {
    const pixelBar = document.getElementById("pixelBar");
    pixelBar.value = text;
  }

  function showToast(msg) {
    const toast = document.getElementById("toast");
    toast.textContent = msg;
    toast.className = "toast show";
    setTimeout(() => {
      toast.classList.remove("show");
    }, 500);
  }

  function clearText() {
    setPixelBar("");
  }
});
