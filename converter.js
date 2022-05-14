let form = document.getElementById("form");
let fileInput = document.getElementById("fileInput");
let canvas = document.getElementById("canvas");
let message = document.getElementById("message");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let file = fileInput.files[0];
  let reader = new FileReader();
  reader.onload = function () {
    let img = new Image();
    img.src = reader.result;
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      let context = canvas.getContext("2d");
      canvas.hidden = false;
      message.hidden = false;
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
      let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      let data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        let avg = ((data[i]) + (data[(i + 1)] + data[(i + 2)]) / 3);
        data[i] = avg;
        data[(i + 1)] = avg;
        data[(i + 2)] = avg;
      }
      context.putImageData(imageData, 0, 0);
    }
  }
  reader.readAsDataURL(file);
});
function download(file, name) {
  var a = document.createElement("a");
  a.hidden = true;
  document.body.appendChild(a);
  a.href = file;
  a.download = name;
  a.click();
  a.remove();
}
canvas.addEventListener("click", function () {
  download(canvas.toDataURL(), "Untited.png");
});
