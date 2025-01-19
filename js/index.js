"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const html2canvas_1 = __importDefault(require("html2canvas"));
const filterButtonsContainer = document.querySelector(".filter-buttons");
const filterButtons = filterButtonsContainer.querySelectorAll("button");
const imageContainer = document.querySelector("image-container");
const image = document.querySelector("img");
const allRanges = document.querySelectorAll(".all-ranges input");
const filterValues = document.querySelectorAll(".filter-values");
let brightnessValue = 100;
let saturationValue = 100;
let inversionValue = 0;
let grayscaleValue = 0;
let rotationValue = 0;
let flipHorizontal = false;
let flipVertical = false;
imageContainer.style.height = imageContainer.style.width;
function filterImage() {
    const filterString = `brightness(${brightnessValue}%) saturate(${saturationValue}%) invert(${inversionValue}%) grayscale(${grayscaleValue}%)`;
    image.style.filter = filterString;
    let transformString = `rotate(${rotationValue}deg)`;
    if (flipHorizontal) {
        transformString += ' scaleX(-1)';
    }
    if (flipVertical) {
        transformString += ' scaleY(-1)';
    }
    image.style.transform = transformString;
}
function updateRangeValue(range, displayElement) {
    displayElement.textContent = `${range.value}%`;
}
function resetFilters() {
    brightnessValue = 100;
    saturationValue = 100;
    inversionValue = 0;
    grayscaleValue = 0;
    rotationValue = 0;
    flipHorizontal = false;
    flipVertical = false;
    document.querySelector("#input1").value = "100";
    document.querySelector("#input2").value = "100";
    document.querySelector("#input3").value = "0";
    document.querySelector("#input4").value = "0";
    document.querySelector("#bri-val").textContent = "100%";
    document.querySelector("#sat-val").textContent = "100%";
    document.querySelector("#inv-val").textContent = "0%";
    document.querySelector("#gra-val").textContent = "0%";
    image.style.filter = "none";
    image.style.transform = "none";
}
filterButtonsContainer.addEventListener("click", (event) => {
    var _a;
    const targetButton = event.target;
    const buttonId = (_a = targetButton.closest(".button")) === null || _a === void 0 ? void 0 : _a.id;
    if (buttonId) {
        const range = document.querySelector(`#input${buttonId.slice(-1)}`);
        const filterValue = document.querySelector(`#filter${buttonId.slice(-1)}`);
        filterButtons.forEach(button => button.classList.remove("active"));
        filterValues.forEach(value => value.classList.remove("show"));
        allRanges.forEach(range => range.classList.remove("show"));
        targetButton.classList.add("active");
        range.classList.add("show");
        filterValue.classList.add("show");
    }
});
document.querySelector("#input1").addEventListener("input", (event) => {
    const brightnessRange = event.target;
    brightnessValue = parseInt(brightnessRange.value);
    updateRangeValue(brightnessRange, document.querySelector("#bri-val"));
    filterImage();
});
document.querySelector("#input2").addEventListener("input", (event) => {
    const saturationRange = event.target;
    saturationValue = parseInt(saturationRange.value);
    updateRangeValue(saturationRange, document.querySelector("#sat-val"));
    filterImage();
});
document.querySelector("#input3").addEventListener("input", (event) => {
    const inversionRange = event.target;
    inversionValue = parseInt(inversionRange.value);
    updateRangeValue(inversionRange, document.querySelector("#inv-val"));
    filterImage();
});
document.querySelector("#input4").addEventListener("input", (event) => {
    const grayscaleRange = event.target;
    grayscaleValue = parseInt(grayscaleRange.value);
    updateRangeValue(grayscaleRange, document.querySelector("#gra-val"));
    filterImage();
});
document.getElementById("reset-button").addEventListener("click", resetFilters);
document.getElementById("rotate-left").addEventListener("click", () => {
    rotationValue -= 90;
    filterImage();
});
document.getElementById("rotate-right").addEventListener("click", () => {
    rotationValue += 90;
    filterImage();
});
document.getElementById("flip-horizontal").addEventListener("click", () => {
    flipHorizontal = !flipHorizontal;
    filterImage();
});
document.getElementById("flip-vertical").addEventListener("click", () => {
    flipVertical = !flipVertical;
    filterImage();
});
const imageUploadInput = document.getElementById('image-upload');
if (imageUploadInput) {
    imageUploadInput.addEventListener('change', (event) => {
        const fileList = event.target.files;
        if (fileList && fileList.length > 0) {
            const file = fileList[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                image.src = reader.result;
                resetFilters();
            };
            reader.readAsDataURL(file);
        }
    });
}
document.getElementById('download-button').addEventListener('click', () => {
    const imageContainer = document.getElementById('image-container');
    if (!imageContainer)
        return;
    (0, html2canvas_1.default)(imageContainer).then(canvas => {
        let imageId = "";
        for (let i = 0; i < 6; i++) {
            imageId += (Math.floor(Math.random() * 10)).toString();
        }
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `filtered-image-${imageId}.png`;
        link.click();
    }).catch(error => {
        console.error("Error capturing the image:", error);
    });
});
