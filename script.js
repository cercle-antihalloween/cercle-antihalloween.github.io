const imageInput = document.getElementById("imageInput");
const imageUrlInput = document.getElementById("imageUrlInput");
const loadImageButton = document.getElementById("loadImageButton");
const confirmButton = document.getElementById("confirmButton");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let uploadedImage = null;

// Load image from URL
loadImageButton.addEventListener("click", function () {
  const url = imageUrlInput.value.trim();
  if (url) {
    const img = new Image();
    img.src = url;
    img.onload = function () {
      // Resize canvas to match image size
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw uploaded image to the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear any previous images
      ctx.drawImage(img, 0, 0);

      uploadedImage = img;
      confirmButton.disabled = false;  // Enable the confirm button
    };
    img.onerror = function () {
      alert("Failed to load image. Please check the URL.");
    };
  } else {
    alert("Please enter a valid image URL.");
  }
});

// When user selects an image from file input
imageInput.addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      const img = new Image();
      img.src = e.target.result;
      img.onload = function () {
        // Resize canvas to match image size
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw uploaded image to the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear any previous images
        ctx.drawImage(img, 0, 0);

        uploadedImage = img;
        confirmButton.disabled = false;  // Enable the confirm button
      };
    };
  }
});

// When user clicks confirm, overlay the image
confirmButton.addEventListener("click", function () {
  if (uploadedImage) {
    const overlayImage = new Image();
    overlayImage.src = './images/overlay.png';  // Path to the overlay image
    overlayImage.onload = function () {
      // Determine the largest square that can fit inside the uploaded image
      const minSize = Math.min(canvas.width, canvas.height);

      // Calculate the top-left corner to centre the square
      const offsetX = (canvas.width - minSize) / 2;
      const offsetY = (canvas.height - minSize) / 2;

      // Draw the overlay image within this square, maintaining its aspect ratio
      ctx.drawImage(overlayImage, offsetX, offsetY, minSize, minSize);
    };
  }
});

