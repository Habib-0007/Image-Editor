var filterButtonsContainer = document.querySelector(".filter-buttons");
var filterButtons = filterButtonsContainer.querySelectorAll("button");
var imageContainer = document.querySelector("image-container");
var image = document.querySelector("img");
var allRanges = document.querySelectorAll(".all-ranges input");
var filterValues = document.querySelectorAll(".filter-values");
var brightnessValue = 100;
var saturationValue = 100;
var inversionValue = 0;
var grayscaleValue = 0;
var rotationValue = 0;
var flipHorizontal = false;
var flipVertical = false;
function filterImage() {
    var filterString = "brightness(".concat(brightnessValue, "%) saturate(").concat(saturationValue, "%) invert(").concat(inversionValue, "%) grayscale(").concat(grayscaleValue, "%)");
    image.style.filter = filterString;
    var transformString = "rotate(".concat(rotationValue, "deg)");
    if (flipHorizontal) {
        transformString += ' scaleX(-1)';
    }
    if (flipVertical) {
        transformString += ' scaleY(-1)';
    }
    image.style.transform = transformString;
}
function updateRangeValue(range, displayElement) {
    displayElement.textContent = "".concat(range.value, "%");
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
filterButtonsContainer.addEventListener("click", function (event) {
    var _a;
    var targetButton = event.target;
    var buttonId = (_a = targetButton.closest(".button")) === null || _a === void 0 ? void 0 : _a.id;
    if (buttonId) {
        var range = document.querySelector("#input".concat(buttonId.slice(-1)));
        var filterValue = document.querySelector("#filter".concat(buttonId.slice(-1)));
        filterButtons.forEach(function (button) { return button.classList.remove("active"); });
        filterValues.forEach(function (value) { return value.classList.remove("show"); });
        allRanges.forEach(function (range) { return range.classList.remove("show"); });
        targetButton.classList.add("active");
        range.classList.add("show");
        filterValue.classList.add("show");
    }
});
document.querySelector("#input1").addEventListener("input", function (event) {
    var brightnessRange = event.target;
    brightnessValue = parseInt(brightnessRange.value);
    updateRangeValue(brightnessRange, document.querySelector("#bri-val"));
    filterImage();
});
document.querySelector("#input2").addEventListener("input", function (event) {
    var saturationRange = event.target;
    saturationValue = parseInt(saturationRange.value);
    updateRangeValue(saturationRange, document.querySelector("#sat-val"));
    filterImage();
});
document.querySelector("#input3").addEventListener("input", function (event) {
    var inversionRange = event.target;
    inversionValue = parseInt(inversionRange.value);
    updateRangeValue(inversionRange, document.querySelector("#inv-val"));
    filterImage();
});
document.querySelector("#input4").addEventListener("input", function (event) {
    var grayscaleRange = event.target;
    grayscaleValue = parseInt(grayscaleRange.value);
    updateRangeValue(grayscaleRange, document.querySelector("#gra-val"));
    filterImage();
});
document.getElementById("reset-button").addEventListener("click", resetFilters);
document.getElementById("rotate-left").addEventListener("click", function () {
    rotationValue -= 90;
    filterImage();
});
document.getElementById("rotate-right").addEventListener("click", function () {
    rotationValue += 90;
    filterImage();
});
document.getElementById("flip-horizontal").addEventListener("click", function () {
    flipHorizontal = !flipHorizontal;
    filterImage();
});
document.getElementById("flip-vertical").addEventListener("click", function () {
    flipVertical = !flipVertical;
    filterImage();
});
var imageUploadInput = document.getElementById('image-upload');
if (imageUploadInput) {
    imageUploadInput.addEventListener('change', function (event) {
        var fileList = event.target.files;
        if (fileList && fileList.length > 0) {
            var file = fileList[0];
            var reader_1 = new FileReader();
            reader_1.onloadend = function () {
                image.src = reader_1.result;
                resetFilters();
            };
            reader_1.readAsDataURL(file);
        }
    });
}
document.getElementById('download-button').addEventListener('click', function () {
    var canvas = document.createElement('canvas');
    var ctx = canvas === null || canvas === void 0 ? void 0 : canvas.getContext('2d');
    if (!ctx || !canvas)
        return;
    canvas.width = imageContainer.clientWidth;
    canvas.height = imageContainer.clientHeight;
    ctx.filter =
        "brightness(".concat(brightnessValue, "%) saturate(").concat(saturationValue, "%) invert(").concat(inversionValue, "%) grayscale(").concat(grayscaleValue, "%)");
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotationValue * Math.PI) / 180);
    if (flipHorizontal)
        ctx.scale(-1, 1);
    if (flipVertical)
        ctx.scale(1, -1);
    ctx.drawImage(image, -canvas.width / 2, -canvas.height / 2);
    var imageId = "";
    for (var i = 0; i < 6; i++) {
        imageId += (Math.floor(Math.random() * 10)).toString();
    }
    var link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = "filtered-image-".concat(imageId, ".png");
    link.click();
});
