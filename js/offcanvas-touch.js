document.addEventListener("DOMContentLoaded", function () {
  const offcanvas = document.getElementById("offcanvasSidebar");
  let startY = 0, // точка захвата (палец / курсор)
      currentY = 0, // текущая позиция
      offsetY = 0, // итоговое смещение панели
      isDragging = false; // идёт ли перетаскивание
  
  let lastTranslateY = window.innerHeight * 0.5; // Текущее положение панели: Стартовая высота панели - 50vh
  const handleHeight = 50; // Высота ярлычка снизу, который всегда должен оставаться видимым.
  const maxTranslateY = window.innerHeight * 0.9 - handleHeight; // максимум опущена вниз(скрыто): 90vh - ярлычок
  const minTranslateY = 0; // Минимум — полностью раскрыта (панель вверху)

  offcanvas.addEventListener("touchstart", (e) => {
    startY = e.touches[0].clientY - lastTranslateY; // запоминаем точку касания с учётом текущего положения панели
    isDragging = true; // включаем режим перетаскивания
    offcanvas.style.transition = "none"; // отключаем анимацию 
  });

  offcanvas.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    // Вычисляем новое положение панели
    currentY = e.touches[0].clientY;
    offsetY = currentY - startY;
    // Панель не выйдет за пределы экрана
    if (offsetY < minTranslateY) offsetY = minTranslateY;
    if (offsetY > maxTranslateY) offsetY = maxTranslateY;
    // Применение движения
    offcanvas.style.transform = `translateY(${offsetY}px)`;
  });

  offcanvas.addEventListener("touchend", () => {
    if (!isDragging) return;
    isDragging = false;
    offcanvas.style.transition = "transform 0.3s ease";
    lastTranslateY = offsetY; // сохраняем текущее положение
    offcanvas.style.transform = `translateY(${lastTranslateY}px)`;
  });

  offcanvas.addEventListener("mousedown", (e) => {
    startY = e.clientY - lastTranslateY;
    isDragging = true;
    offcanvas.style.transition = "none";
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    currentY = e.clientY;
    offsetY = currentY - startY;
    if (offsetY < minTranslateY) offsetY = minTranslateY;
    if (offsetY > maxTranslateY) offsetY = maxTranslateY;
    offcanvas.style.transform = `translateY(${offsetY}px)`;
  });

  // на document, чтобы перетаскивание не прерывалось, даже если курсор вышел за панель.
  document.addEventListener("mouseup", () => {
    if (!isDragging) return;
    isDragging = false;
    offcanvas.style.transition = "transform 0.3s ease";
    lastTranslateY = offsetY;
    offcanvas.style.transform = `translateY(${lastTranslateY}px)`;
  });
  // Инициализация стартового положения 
  offcanvas.style.transform = `translateY(${lastTranslateY}px)`;
});
