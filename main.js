(async () => {
  //get request to server https://restcountries.eu/rest/v2/all
  function getAllCountry() {
    var opts = {
      method: "GET",
    };

    return fetch(
      "https://restcountries.eu/rest/v2/all",
      opts
    ).then((response) => response.json());
  }
  const result = await getAllCountry();
  console.log(result);

  //создали массив только с регионами /
  function sort(countries) {
    const allRegions = [];
    for (i = 0; i < countries.length; i++) {
      if (countries[i].region !== []) {
        allRegions.push(countries[i].region);
      }
    }
    return allRegions;
  }
  const allRegions = sort(result);
  console.log(allRegions);

  function sortBorders(countries) {
    const allBorders = [];
    for (i = 0; i < countries.length; i++) {
      if (countries[i].borders !== "") {
        allBorders.push(countries[i].borders);
      }
    }
    return allBorders;
  }
  const allBorders = sortBorders(result);
  console.log(allBorders);

  //ща будем удалять дубликаты из массива с регионами ( 250 регионов )
  //1 sposob
  const uniqueRegions = [...new Set(allRegions)];
  //   //2sposob
  //   const uniqRegion2 = Array.from(new Set(allRegions));
  //   console.log(uniqRegion);
  //   //3 sposob
  //   const uniqRegion3 = allRegions.filter(
  //     (item, index) => index === allRegions.indexOf(item)
  //   );
  //   console.log(uniqRegion3);
  //   //4 sposob
  //   const uniqRegion4 = allRegions.reduce((uniq, item) => {
  //     return uniq.includes(item) ? uniq : [...uniq, item];
  //   }, []);
  //   console.log(uniqRegion4);
  //добавили в фильтр селект по регонам наши 6 регионов
  const filterSelect = document.getElementsByClassName("filter-select")[0];

  uniqueRegions.forEach((region) => {
    const addItemCountryToFilter = document.createElement("option");
    addItemCountryToFilter.classList.add("filter-option");
    addItemCountryToFilter.value = region;
    addItemCountryToFilter.innerHTML = region;
    filterSelect.appendChild(addItemCountryToFilter);
  });

  filterSelect.addEventListener("change", (event) => {
    const selectedRegionByFilter = filterSelect.value;
    mainBlock.innerHTML = "";

    const sortedCountriesNewList = [];

    for (i = 0; i < result.length; i++) {
      let resultFilter = result[i].region;
      if (selectedRegionByFilter == resultFilter) {
        sortedCountriesNewList.push(result[i]);
      } else {
        continue;
      }
    }
    //второй лучший способ фильтрации для поиска
    // const sortedCountriesNewList1 = result.filter(function (x) {
    //   return x.region === selectedRegionByFilter;
    // });

    //отрисовуем новый сформированый список
    const newCards = createCards(sortedCountriesNewList);
    newCards.forEach((newCard) => {
      mainBlock.appendChild(newCard);
    });
  });

  //поисковик с первой буквы
  const searchInput = (document.querySelector(
    ".search-input"
  ).oninput = function () {
    let val = this.value.toLowerCase();
    let cardItems = document.querySelectorAll(".card-item");
    if (val != "") {
      cardItems.forEach(function (elem) {
        const cardItemInnerText = elem.innerText.toLowerCase();
        if (cardItemInnerText.search(val) == -1) {
          elem.classList.add("hide");
        } else {
          elem.classList.remove("hide");
        }
      });
    } else {
      cardItems.forEach(function (elem) {
        elem.classList.remove("hide");
      });
    }
  });

  //создаем карточки для вставки на страницу/
  function createCards(countries) {
    const cards = [];
    for (i = 0; i < countries.length; i++) {
      const country = countries[i];
      const newCard = document.createElement("div");
      const countrynameID = country.numericCode;
      newCard.setAttribute("data-id", countrynameID);
      newCard.classList.add("card-item");

      const flagDiv = document.createElement("div");
      flagDiv.classList.add("flag-div");
      newCard.appendChild(flagDiv);

      const flagImage = document.createElement("img");
      flagImage.src = country.flag;
      flagImage.classList.add("flag-image");
      flagDiv.appendChild(flagImage);

      const aboutCountry = document.createElement("div");
      aboutCountry.classList.add("about-country");
      newCard.appendChild(aboutCountry);

      const countryName = document.createElement("h3");
      countryName.innerHTML = country.name;
      countryName.classList.add("country-name");
      aboutCountry.appendChild(countryName);

      const info = document.createElement("ul");
      info.classList.add("info");
      aboutCountry.appendChild(info);

      const population = document.createElement("li");
      population.innerHTML = "<b>Population</b>: " + country.population;
      population.classList.add("population");
      info.appendChild(population);

      const region = document.createElement("li");
      region.innerHTML = "<b>Region</b>: " + country.region;
      region.classList.add("region");
      info.appendChild(region);

      const capital = document.createElement("li");
      capital.innerHTML = "<b>Capital<b>: " + country.capital;
      capital.classList.add("capital");
      info.appendChild(capital);

      cards.push(newCard);
    }
    return cards;
  }

  //создали страницу с детальной инфой по каждой карточке

  function createDatailPage(country) {
    const DatailPages = [];

    const newPage = document.createElement("div");
    newPage.classList.add("detail-page");

    const buttonBack = document.createElement("button");
    buttonBack.innerHTML = "Back";
    buttonBack.classList.add("button-back-page");
    newPage.appendChild(buttonBack);

    const flagDivOnPage = document.createElement("div");
    flagDivOnPage.classList.add("flag-div");
    newPage.appendChild(flagDivOnPage);

    const flagImageOnPage = document.createElement("img");
    flagImageOnPage.src = country.flag;
    flagImageOnPage.classList.add("flag-image-page");
    flagDivOnPage.appendChild(flagImageOnPage);

    const aboutCountryOnPage = document.createElement("div");
    aboutCountryOnPage.classList.add("about-country-page");
    newPage.appendChild(aboutCountryOnPage);

    const countryNameOnPage = document.createElement("h3");
    countryNameOnPage.innerHTML = country.name;
    countryNameOnPage.classList.add("country-name-page");
    aboutCountryOnPage.appendChild(countryNameOnPage);

    const infoOnPage = document.createElement("ul");
    infoOnPage.classList.add("info-page");
    aboutCountryOnPage.appendChild(infoOnPage);

    const nativeName = document.createElement("li");
    nativeName.innerHTML = "<b>Native name:</b> " + country.nativeName;
    nativeName.classList.add("native-name-page");
    infoOnPage.appendChild(nativeName);

    const population = document.createElement("li");
    population.innerHTML = "<b>Population:</b> " + country.population;
    population.classList.add("population");
    infoOnPage.appendChild(population);

    const region = document.createElement("li");
    region.innerHTML = "<b>Region: </b>" + country.region;
    region.classList.add("region-page");
    infoOnPage.appendChild(region);

    const subRegion = document.createElement("li");
    subRegion.innerHTML = "<b>Sub Region: </b>" + country.subregion;
    subRegion.classList.add("sub-region-page");
    infoOnPage.appendChild(subRegion);

    const capital = document.createElement("li");
    capital.innerHTML = "<b>Capital:</b> " + country.capital;
    capital.classList.add("capital-page");
    infoOnPage.appendChild(capital);

    const topLevelDomain = document.createElement("li");
    topLevelDomain.innerHTML = "<b>Top Level Domain:</b> " + country.capital;
    topLevelDomain.classList.add("top-level-domain-page");
    infoOnPage.appendChild(topLevelDomain);

    const currencies = document.createElement("li");
    currencies.innerHTML = "<b>Currencies:</b> " + country.currencies[0].name;
    currencies.classList.add("currencies-page");
    infoOnPage.appendChild(currencies);

    const languages = document.createElement("li");
    languages.innerHTML = "<b>Capital:</b> " + country.capital;
    languages.classList.add("languages-page");
    infoOnPage.appendChild(languages);

    const borderCountries = document.createElement("div");
    borderCountries.classList.add("border-countries-page");
    aboutCountryOnPage.appendChild(borderCountries);

    const borderCountriesText = document.createElement("div");
    borderCountriesText.innerHTML = "<b>Border Countries:</b> ";
    borderCountriesText.classList.add("border-countries-text");
    borderCountries.appendChild(borderCountriesText);

    country.borders.forEach((x) => {
      const borderCountriesItem = document.createElement("div");
      borderCountriesItem.innerHTML = x;
      borderCountriesItem.classList.add("border-countries-item");
      borderCountries.appendChild(borderCountriesItem);
    });
    return newPage;
  }

  //добавляем вставляем карточки
  const mainBlock = document.getElementsByClassName("main")[0];
  const cards = createCards(result);
  cards.forEach((card) => {
    mainBlock.appendChild(card);
  });

  ////////////развернутая инфа при клике на карточку /////////////////

  const detailPage = document.querySelector(".main");
  detailPage.addEventListener("click", function (event) {
    const cardElement = event.target.closest(".card-item");
    const searchAndFilterBar = document.getElementsByClassName(
      "search-and-filter-bar"
    )[0];
    if (!cardElement) {
      return;
    }
    mainBlock.innerHTML = "";
    searchAndFilterBar.style.display = "none";
    const numericCode = cardElement.getAttribute("data-id");

    // в chousenCard лежит один обьект (положили через ФАЙНД)
    const chousenCard = result.find((x) => x.numericCode === numericCode);
    //вернули данные функции ( положили в переменную (return))
    var newPageElem = createDatailPage(chousenCard);
    // заапендили на страницу
    mainBlock.appendChild(newPageElem);

    //button back
    const buttonBack = document.getElementsByClassName("button-back-page")[0];
    buttonBack.addEventListener("click", function (event) {
      mainBlock.innerHTML = "";
      searchAndFilterBar.style.display = "flex";
      const cards = createCards(result);
      cards.forEach((card) => {
        mainBlock.appendChild(card);
      });
    });
  });
  const mainDetailPage = document.querySelector("detail-page");
  const buttonDarkMode = document.getElementsByClassName("button-dark-mode")[0];
  buttonDarkMode.addEventListener("click", function (event) {
    let body = document.querySelector("body");
    // mainBlock.classList.toggle("dark");
    body.classList.toggle("dark");
  });
})();
