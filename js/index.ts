const filterButtonsContainer = document.querySelector<HTMLDivElement>(".filter-buttons")!;
const filterButtons = filterButtonsContainer.querySelectorAll<HTMLButtonElement>("button");
const image = document.querySelector<HTMLImageElement>("img")!;
const allRanges = document.querySelectorAll<HTMLInputElement>(".all-ranges input");
const filterValues = document.querySelectorAll<HTMLElement>(".filter-values");

let brightnessValue: number = 100;
let saturationValue: number = 100;
let inversionValue: number = 0;
let grayscaleValue: number = 0;
let rotationValue: number = 0;
let flipHorizontal: boolean = false;
let flipVertical: boolean = false;

function filterImage(): void {
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

function updateRangeValue(range: HTMLInputElement, displayElement: HTMLElement): void {
	displayElement.textContent = `${range.value}%`;
}

function resetFilters(): void {
	brightnessValue = 100;
	saturationValue = 100;
	inversionValue = 0;
	grayscaleValue = 0;
	rotationValue = 0;
	flipHorizontal = false;
	flipVertical = false;

	document.querySelector<HTMLInputElement>("#input1")!.value = "100";
	document.querySelector<HTMLInputElement>("#input2")!.value = "100";
	document.querySelector<HTMLInputElement>("#input3")!.value = "0";
	document.querySelector<HTMLInputElement>("#input4")!.value = "0";

	document.querySelector<HTMLElement>("#bri-val")!.textContent = "100%";
	document.querySelector<HTMLElement>("#sat-val")!.textContent = "100%";
	document.querySelector<HTMLElement>("#inv-val")!.textContent = "0%";
	document.querySelector<HTMLElement>("#gra-val")!.textContent = "0%";

	image.style.filter = "none";
	image.style.transform = "none";
}

filterButtonsContainer.addEventListener("click", (event) => {
	const targetButton = event.target as HTMLElement;
	const buttonId = targetButton.closest<HTMLButtonElement>(".button")?.id;

	if (buttonId) {
		const range = document.querySelector<HTMLInputElement>(`#input${buttonId.slice(-1)}`)!;
		const filterValue = document.querySelector<HTMLElement>(`#filter${buttonId.slice(-1)}`)!;

		filterButtons.forEach(button => button.classList.remove("active"));
		filterValues.forEach(value => value.classList.remove("show"));
		allRanges.forEach(range => range.classList.remove("show"));

		targetButton.classList.add("active");
		range.classList.add("show");
		filterValue.classList.add("show");
	}
});

document.querySelector<HTMLInputElement>("#input1")!.addEventListener("input", (event) => {
	const brightnessRange = event.target as HTMLInputElement;
	brightnessValue = parseInt(brightnessRange.value);
	updateRangeValue(brightnessRange, document.querySelector<HTMLElement>("#bri-val")!);
	filterImage();
});

document.querySelector<HTMLInputElement>("#input2")!.addEventListener("input", (event) => {
	const saturationRange = event.target as HTMLInputElement;
	saturationValue = parseInt(saturationRange.value);
	updateRangeValue(saturationRange, document.querySelector<HTMLElement>("#sat-val")!);
	filterImage();
});

document.querySelector<HTMLInputElement>("#input3")!.addEventListener("input", (event) => {
	const inversionRange = event.target as HTMLInputElement;
	inversionValue = parseInt(inversionRange.value);
	updateRangeValue(inversionRange, document.querySelector<HTMLElement>("#inv-val")!);
	filterImage();
});

document.querySelector<HTMLInputElement>("#input4")!.addEventListener("input", (event) => {
	const grayscaleRange = event.target as HTMLInputElement;
	grayscaleValue = parseInt(grayscaleRange.value);
	updateRangeValue(grayscaleRange, document.querySelector<HTMLElement>("#gra-val")!);
	filterImage();
});

document.getElementById("reset-button")!.addEventListener("click", resetFilters);

document.getElementById("rotate-left")!.addEventListener("click", () => {
	rotationValue -= 90;
	filterImage();
});

document.getElementById("rotate-right")!.addEventListener("click", () => {
	rotationValue += 90;
	filterImage();
});

document.getElementById("flip-horizontal")!.addEventListener("click", () => {
	flipHorizontal = !flipHorizontal;
	filterImage();
});

document.getElementById("flip-vertical")!.addEventListener("click", () => {
	flipVertical = !flipVertical;
	filterImage();
});

const imageUploadInput: HTMLInputElement | null = document.getElementById('image-upload') as HTMLInputElement;

if (imageUploadInput) {
	imageUploadInput.addEventListener('change', (event) => {
		const fileList: FileList | null = (event.target as HTMLInputElement).files;

		if (fileList && fileList.length > 0) {
			const file: File | null = fileList[0];
			const reader: FileReader = new FileReader();

			reader.onloadend = () => {
				image.src = reader.result as string;
				resetFilters();
			};

			reader.readAsDataURL(file);
		}
	});
}

document.getElementById('download-button')!.addEventListener('click', () => {
	const canvas: HTMLCanvasElement | null = document.createElement('canvas');
	const ctx: CanvasRenderingContext2D | null = canvas?.getContext('2d');

	if (!ctx || !canvas) return;

	canvas.width = image.width;
	canvas.height = image.height;

	ctx.filter =
		`brightness(${brightnessValue}%) saturate(${saturationValue}%) invert(${inversionValue}%) grayscale(${grayscaleValue}%)`;
	ctx.translate(canvas.width / 2, canvas.height / 2);

	ctx.rotate((rotationValue * Math.PI) / 180);

	if (flipHorizontal) ctx.scale(-1, 1);
	if (flipVertical) ctx.scale(1, -1);

	ctx.drawImage(image, -canvas.width / 2, -canvas.height / 2);

	let imageId = ""
	for (var i = 0; i < 6; i++) {
		imageId += (Math.floor(Math.random()) + 1).toString()
	}

	const link: HTMLAnchorElement | null = document.createElement('a');
	link.href = canvas.toDataURL();
	link.download = `filtered-image-${imageId}.png`;

	link.click();
});
