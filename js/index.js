var filterButtonsContainer =
	document.querySelector(
		".filter-buttons"
	);
var filterButtons =
	filterButtonsContainer.querySelectorAll(
		"button"
	);
var image =
	document.querySelector("img");
var ranges = document.querySelector(
	".all-ranges"
);
var allRanges =
	document.querySelectorAll(
		".all-ranges input"
	);
var filterValues =
	document.querySelectorAll(
		".filter-values"
	);

filterButtonsContainer.addEventListener(
	"click",
	event => {
		var targetButton =
			event.target.closest(".button");
		var buttonId = targetButton.id;

		const range =
			document.querySelector(
				`#input${buttonId.slice(-1)}`
			);
		const filterValue =
			document.querySelector(
				`#filter${buttonId.slice(-1)}`
			);

		filterButtons.forEach(button => {
			button.classList.remove("active");
		});

		filterValues.forEach(value => {
			value.classList.remove("show");
		});

		allRanges.forEach(range => {
			range.classList.remove("show");
		});

		targetButton.classList.add(
			"active"
		);
		range.classList.add("show");
		filterValue.classList.add("show");
	}
);

var brightnessRange =
	document.querySelector("#input1");
var saturationRange =
	document.querySelector("#input2");
var inversionRange =
	document.querySelector("#input3");
var grayscaleRange =
	document.querySelector("#input4");

var saturation = "brightness(100%)";
var brightness = "saturate(100%)";
var inversion = "invert(0%)";
var grayscale = "grayscale(0%)";

function filterImage() {
	image.style.filter = `${brightness} ${saturation} ${inversion} ${grayscale}`;
}

brightnessRange.addEventListener(
	"input",
	() => {
		var brightnessValue =
			document.querySelector(
				"#bri-val"
			);

		brightnessValue.textContent = `${brightnessRange.value}%`;
		brightness = `brightness(${brightnessRange.value}%)`;

		filterImage();
	}
);

saturationRange.addEventListener(
	"input",
	() => {
		var saturationValue =
			document.querySelector(
				"#sat-val"
			);

		saturationValue.textContent = `${saturationRange.value}%`;
		saturation = `saturate(${saturationRange.value}%)`;

		filterImage();
	}
);

inversionRange.addEventListener(
	"input",
	() => {
		var inversionValue =
			document.querySelector(
				"#inv-val"
			);

		inversionValue.textContent = `${inversionRange.value}%`;
		inversion = `invert(${inversionValue.value}%)`;

		filterImage();
	}
);

grayscaleRange.addEventListener(
	"input",
	() => {
		var grayscaleValue =
			document.querySelector(
				"#gra-val"
			);

		grayscaleValue.textContent = `${grayscaleRange.value}%`;
		grayscale = `grayscale(${grayscaleRange.value}%)`;

		filterImage();
	}
);

/*ranges.addEventListener(
	"input",
	event => {
		
	}
);
*/
