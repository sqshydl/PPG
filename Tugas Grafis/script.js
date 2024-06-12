document.addEventListener("DOMContentLoaded", function() {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  
  // Fungsi untuk menggambar titik
  function drawPoint(x, y) {
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = "red";
      ctx.fill();
      ctx.closePath();
  }
  
  // Array untuk menyimpan koordinat titik
  var coordinates = [];
  
  // Mengisi array dengan koordinat acak
  for (var i = 0; i < 10; i++) {
      var x = Math.floor(Math.random() * canvas.width);
      var y = Math.floor(Math.random() * canvas.height);
      coordinates.push({x: x, y: y});
  }
  
  // Menggambar titik-titik awal
  for (var i = 0; i < coordinates.length; i++) {
      drawPoint(coordinates[i].x, coordinates[i].y);
  }

  // Fungsi untuk mendapatkan jarak antara dua titik
  function distance(p1, p2) {
      return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
  }

  // Fungsi untuk menemukan titik terdekat dari posisi klik pengguna
  function findNearestPoint(mouseX, mouseY) {
      var minDistance = Infinity;
      var nearestIndex = -1;
      for (var i = 0; i < coordinates.length; i++) {
          var dist = distance({x: mouseX, y: mouseY}, coordinates[i]);
          if (dist < minDistance) {
              minDistance = dist;
              nearestIndex = i;
          }
      }
      return nearestIndex;
  }

  // Event listener untuk menggerakkan titik ketika canvas diklik
  canvas.addEventListener("click", function(event) {
      var mouseX = event.clientX - canvas.getBoundingClientRect().left;
      var mouseY = event.clientY - canvas.getBoundingClientRect().top;
      var nearestIndex = findNearestPoint(mouseX, mouseY);
      if (nearestIndex !== -1) {
          coordinates[nearestIndex].x = mouseX;
          coordinates[nearestIndex].y = mouseY;
          redraw();
      }
  });

  // Fungsi untuk menggambar ulang titik-titik
  function redraw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < coordinates.length; i++) {
          drawPoint(coordinates[i].x, coordinates[i].y);
      }
  }
});
