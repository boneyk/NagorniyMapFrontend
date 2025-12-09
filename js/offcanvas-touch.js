document.addEventListener("DOMContentLoaded", function () {
  const offcanvas = document.getElementById("offcanvasSidebar");
  const dragHandle = document.getElementById("dragHandle");

  let startY = 0; // начальная точка при drag
  let startHeight = 0; // высота панели при drag
  let isDragging = false;

  const minHeight = window.innerHeight * 0.2;  // стартовая высота 50vh
  const maxHeight = window.innerHeight; // полностью до нижней границы

  function setHeight(h) {
    offcanvas.style.height = `${h}px`;
  }

  function startDrag(e) {
    isDragging = true;
    offcanvas.style.transition = "none";
    startY = e.touches ? e.touches[0].clientY : e.clientY;
    startHeight = offcanvas.offsetHeight;
  }

  function moveDrag(e) {
    if (!isDragging) return;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    let newHeight = startHeight + (clientY - startY);
    if (newHeight < minHeight) newHeight = minHeight;
    if (newHeight > maxHeight) newHeight = maxHeight;

    setHeight(newHeight);
  }

  function endDrag() {
    if (!isDragging) return;
    isDragging = false;
    offcanvas.style.transition = "height 0.3s ease";
  }

  dragHandle.addEventListener("touchstart", startDrag);
  dragHandle.addEventListener("mousedown", startDrag);
  document.addEventListener("touchmove", moveDrag);
  document.addEventListener("mousemove", moveDrag);
  document.addEventListener("touchend", endDrag);
  document.addEventListener("mouseup", endDrag);

  setHeight(minHeight);
});
