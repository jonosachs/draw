import { nike, apple } from "./paintings.js";

document.addEventListener("DOMContentLoaded", (event) => {
  const boxContainer = document.getElementById("box-container");
  const numBoxes = 920;
  let shiftKey = false;

  // Listen for shift key press
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

  // Populate pixel grid
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

  // Assign button actions
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

  // Clear drawing board
  function reset() {
    const allBoxes = document.querySelectorAll(".box");

    allBoxes.forEach((box) => {
      box.classList.remove("blue-bg");
    });
  }

  // Save drawing to web storage
  function save() {
    localStorage.clear();

    for (let i = 1; i <= numBoxes; i++) {
      const myBox = document.getElementById(`myBox${i}`);
      localStorage.setItem(myBox.id, myBox.className);
    }

    localStorage ? showToast("Saved") : showToast("Save Failed");
  }

  // Load drawing from web storage
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

  // Draw pixels from text box
  //TODO: fix validation: 'done' on bad text input
  function drawPixels() {
    let textBox = document.getElementById("pixelBar").value;

    if (!textBox) {
      showToast("Empty");
      return;
    } else if (textBox.toLowerCase() == "phil") {
      textBox = nike;
    } else if (textBox.toLowerCase() == "steve") {
      textBox = apple;
    } else {
      textBox = textBox.split(",");
      textBox = textBox.map((value) => value.replace(/\s/g, ""));

      textBox.forEach((value) => {
        if (isNaN(value)) {
          showToast("Invalid");
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

    // showToast("Done");
  }

  // Get pixel numbers from current design and pass to text box
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

  // Set text box text
  function setPixelBar(text) {
    const pixelBar = document.getElementById("pixelBar");
    pixelBar.value = text;
  }

  // Show alerts
  function showToast(msg) {
    const toast = document.getElementById("toast");
    toast.textContent = msg;
    toast.className = "toast show";
    setTimeout(() => {
      toast.classList.remove("show");
    }, 500);
  }

  // Clear the text box
  function clearText() {
    setPixelBar("");
  }
});
