document.addEventListener("DOMContentLoaded", function () {
  const offcanvas = document.getElementById("offcanvasSidebar");
  let startY = 0, 
    currentY = 0, 
    offsetY = 0, 
    isDragging = false; 
  
  let lastTranslateY = window.innerHeight * 0.5; 
  const handleHeight = 50; 
  const maxTranslateY = window.innerHeight * 0.9 - handleHeight; 
  const minTranslateY = 0;

  offcanvas.addEventListener("touchstart", (e) => {
    startY = e.touches[0].clientY - lastTranslateY; 
    isDragging = true; 
    offcanvas.style.transition = "none"; 
  });

  offcanvas.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    currentY = e.touches[0].clientY;
    offsetY = currentY - startY;
    if (offsetY < minTranslateY) offsetY = minTranslateY;
    if (offsetY > maxTranslateY) offsetY = maxTranslateY;
    offcanvas.style.transform = `translateY(${offsetY}px)`;
  });

  offcanvas.addEventListener("touchend", () => {
    if (!isDragging) return;
    isDragging = false;
    offcanvas.style.transition = "transform 0.3s ease";
    lastTranslateY = offsetY; // сохраняем текущее положение
    offcanvas.style.transform = `translateY(${lastTranslateY}px)`;
  });

  offcanvas.addEventListener("mousedown", (event) => {
    startY = event.clientY - lastTranslateY;
    isDragging = true;
    offcanvas.style.transition = "none";
  });

  document.addEventListener("mousemove", (event) => {
    if (!isDragging) return;
    currentY = event.clientY;
    offsetY = currentY - startY;
    if (offsetY < minTranslateY) offsetY = minTranslateY;
    if (offsetY > maxTranslateY) offsetY = maxTranslateY;
    offcanvas.style.transform = `translateY(${offsetY}px)`;
  });

  document.addEventListener("mouseup", () => {
    if (!isDragging) return;
    isDragging = false;
    offcanvas.style.transition = "transform 0.3s ease";
    lastTranslateY = offsetY;
    offcanvas.style.transform = `translateY(${lastTranslateY}px)`;
  });
  offcanvas.style.transform = `translateY(${lastTranslateY}px)`;
});
