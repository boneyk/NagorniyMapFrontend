async function loadJson() {
  const response = await fetch("./data/map-data.json");
  const data = await response.json();
  return data;
}

ymaps.ready(async () => {
  const data = await loadJson();
  // ymaps.ready(init);

  // function init() {
  const map = new ymaps.Map(
    "map",
    {
      center: [43.118536, 131.92137],
      zoom: 18.5,
      controls: [],
      yandexMapType: "future_map",
    },
    // type: null,
    {
      restrictMapArea: [
        [43.115, 131.92],
        [43.1199, 131.926],
      ],
    }
  );

  const parkPolygon1 = new ymaps.Polygon(
    [data.zones.first_zone.coordinates],
    {},
    data.zones.first_zone.style
  );
  map.geoObjects.add(parkPolygon1);

  const parkPolygon2 = new ymaps.Polygon(
    [data.zones.second_zone.coordinates],
    {},
    data.zones.second_zone.style
  );
  map.geoObjects.add(parkPolygon2);

  const parkPolygon3 = new ymaps.Polygon(
    [data.zones.third_zone.coordinates],
    {},
    data.zones.third_zone.style
  );
  map.geoObjects.add(parkPolygon3);

  data.paths.coordinates.forEach((coords) => {
    const line = new ymaps.Polyline(coords, {}, data.paths.style);
    map.geoObjects.add(line);
  });

  const kafePolygon = new ymaps.Polygon(
    [data.specialAreas.kafe.coordinates],
    {},
    data.specialAreas.kafe.style
  );
  const lakePolygon = new ymaps.Polygon(
    [data.specialAreas.lake.coordinates],
    {},
    data.specialAreas.lake.style
  );
  map.geoObjects.add(kafePolygon);
  map.geoObjects.add(lakePolygon);

  const places = data.places;

  const placesList = document.getElementById("placesList");
  const infoFrame = document.getElementById("infoFrame");
  const menuList = document.getElementById("menuList");
  const infoTitle = document.getElementById("infoTitle");
  const infoImg = document.getElementById("infoImg");
  const infoDesc = document.getElementById("infoDesc");
  const backBtn = document.getElementById("backBtn");

  const offcanvas = document.getElementById("offcanvasSidebar");

  const mapOffcanvas = document.getElementById("offcanvasSidebar");
  const baseOfOffcanvas = new bootstrap.Offcanvas(mapOffcanvas);

  const placemarks = [];

  places.forEach((place) => {
    const placemark = new ymaps.Placemark(
      place.coords,
      {
        balloonContentHeader: place.name,
        balloonContentBody: `<img class="popup-img"><p>${place.desc}</p>`,
      },
      {
        iconLayout: "default#image",
        iconImageHref: place.iconUrl,
        iconImageSize: [32, 32],
        iconImageOffset: [-16, -32],
        balloonOffset: [0, -32],
        balloonAutoPan: true,
        hideIconOnBalloonOpen: false,
      }
    );

    const item = document.createElement("div");
    item.className = "place-item";
    item.innerHTML = `<img class="place-icon" src="${place.iconUrl}"> ${place.name}`;
    item.onclick = () => {
      map.panTo(place.coords, 19, { duration: 500 });

      placemark.balloon.open();

      const minHeight = window.innerHeight * 0.5;
      offcanvas.style.transition = "height 0.3s ease";
      offcanvas.style.height = `${minHeight}px`;

      menuList.style.display = "none";
      infoFrame.style.display = "block";
      infoTitle.textContent = place.name;
      infoImg.src = place.img;
      infoDesc.textContent = place.desc;
    };
    placemarks.push({
      placemark: placemark,
      category: place.category,
      listItem: item,
    });

    placesList.appendChild(item);
    map.geoObjects.add(placemark);
  });
  baseOfOffcanvas.show();

  const buttons = document.querySelectorAll(".btn.btn-primary.filter");
  let currentFilter = "none";

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      currentFilter = button.id.trim();
      placemarks.forEach((obj) => {
        let visible =
          obj.category === currentFilter || currentFilter === "none";
        if (currentFilter == "all") {
          visible = "none";
        }

        obj.placemark.options.set("visible", visible);
        obj.listItem.style.display = visible ? "block" : "none";
      });
    });
  });

  // Кнопка "назад"
  backBtn.onclick = () => {
    infoFrame.style.display = "none";
    menuList.style.display = "block";

    placemarks.forEach((obj) => {
      const visible =
        obj.category === currentFilter || currentFilter === "none";
      obj.listItem.style.display = visible ? "flex" : "none";
    });
  };
  
});
