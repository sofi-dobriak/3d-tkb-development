# 3D MODEL Version 2


Меню:
  - **Загальне**:
    - [Кастомні налаштування](#Кастомні-налаштування)
    - [Стилізація модулю](#Стилізація-модулю)
    - [Логотип в шапці сайту](#Логотип-в-шапці-сайту)
    - [Кастомний селектор для кнопки меню в хедері](#Кастомний-селектор-для-кнопки-меню-в-хедері)
    - [Форма зворотнього з'вязку](#Форма-зворотнього-з'вязку)
    - [Управління відображенням елементів на різних сторінках](#Управління-відображенням-елементів-на-різних-сторінках)
    - [Триггеры для аналитики](#триггеры-для-аналитики)
    - [Сповіщення](#сповіщення)
    - [Підсвітка кварти/обльотів/інфраструктури](#підсвітка-квартиобльотівінфраструктури)
    - [Відображення цін](#відображення-цін)
  - **Налаштування сторінки "Обліт"**
    - [Підсвітка на генплані кількості квартир для кожного обльоту](#Підсвітка-на-генплані-кількості-квартир-для-кожного-обльоту)
    - [Кастомні налаштування інфобоксів](#Кастомні-налаштування-інфобоксів)
    - [Налаштування інформації про інфраструктуру](#налаштування-інформації-про-інфраструктуру)
    - [Підписи цін та кількості квартир на обльотах](#Підписи-цін-та-кількості-квартир-на-обльотах)
    - [Підписи сроку здачі на обльотах](#Підписи-сроку-здачі-на-обльотах)
    - [Підсвітка на генплані кількості квартир для кожного обльоту](#підсвітка-на-генплані-кількості-квартир-для-кожного-обльоту)
    - [Паралакс на обльотах](#Паралакс-на-обльотах)
    - [Хмари на обльотах](#Хмари-на-обльотах)
  - **Налаштування сторінки "Квартира"**
    - [Хід будівництва на сторінці квартири](#Хід-будівництва-на-сторінці-квартири)
    - [Фінансові умови на сторінці квартири](#Фінансові-умови-на-сторінці-квартири)
    - [Документація на сторінці квартири](#Документація-на-сторінці-квартири)
  - **Налаштування Фільтру**
    - [Отображение результатов бокового фильтра (Варианты: карточка, таблица)](#отображение-результатов-бокового-фильтра-варианты-карточка-таблица)
    - [$s3dFlybySideChooser](#s3dflybysidechooser)


___

## Вибір значка валюти

  settings.json ----> currency_label
  Якщо параметр не вказаний - виводиться значок валюти з файлів перекладу (currency_label)

##  Компас
#### Параметр, который отвечает за положение компаса:
> frameWithNorthDirection 
>> Выставляется для каждого облета отдельно
#### Значение этого параметра: 
> Кадр, который смотрит на север
>> Нужно визуально определить в секвенции номер кадра, который смотри на север
#### Важно!
> Нельзя менять параметры, котрые влияют на размер компасса
___
## Изображения
+ `sd_imageUrl` - путь в облету плохого качества
+ `image_format`- формат изображений (по умолчанию jpg)
___
## Popup
При нажатии на елемент с классом ```js-s3d-flat__3d-tour``` откроется попап с айфремом (ссылка - атрибут href нажатого елемента)
___
## Демо режим
При добавлении в **html || body** теги аттрибута ```data-demo_view```  остается возможность только крутить облет (если клиент хочет вставить 3д через айфрейм).

Когда 3д добавлена на WP - для вставки в демо режиме добавить GET параметр ```demo=true```
___
## Пины инфраструктуры
###### Для отображение пинов на генплане
- У приходящего полигона в SVG для ключевого кадра должны быть аттрибуты `(data-type="infrastructure" points="\[coordinates\]" data-id="\[category\]_\[name\]")`
- для переводов в langfile.json обьекте translation указать обьект `pins.\[category\]_\[name\]`
	прим. 
```
  "pins": {
    \[category\]_\[name\: "Park",
  },
```

- Если у координат полигона больше 3 точек, он будет подсвечиватся при наведение на маркер
- При нажатии на маркер открывается iframe с ссылкой.
	Для добавление ссылки в settings.json указать:
```
  "pin": {
    "genplan": {
      \[category\]_\[name\: link
    },
  },
```
___


##### Налаштування інформації про інфраструктуру
 
в settings.json по ключу "pinsInfo"

```
{
  "iframe": "https://google.com", //посилання яке відкриється у айфреймі при кліку
  "type": "zone", // [ zone(підсвічує обведену зону), pin(не підсвічує обведену зону), text(Виводить як текст, полігон має мати тільки дві точки) ] // 
  "title_i18n": "pins.zone_sport_jogging", //шлях до об'єкта перекладу
  "img": "images/infrastructure/footbal-field.jpg", // Зображення в описанні
  "description_i18n": "pins.pin_sport_wellfit_description", //шлях до об'єкта перекладу опису 
  "position": "top_left", //позиція іконки [center(default) || top_left || bottom_left ||  bottom_right || top_right ]  
  "filter_type": "sport" // назва категорії для фільтрації та підсвічування короткого текстового опису
}

```

Для додавання кастомної іконки для піна:
  В папку ./src/assets/s3d/images/markers додати svg, вказати у конфігурації піна filter_type - {назва svg}


#### Підсвітка на генплані кількості квартир для кожного обльоту 

###### Важливо, за замовчуванням недоступні квартири не враховуються 



[файл з кодом ](./src/assets/s3d/scripts/modules/slider/sliderView.js) - метод **showFlatCountOnBuild**

```css
  :root {
      --flyby-flats-count-bg: yellow; //колір фону 
      --flyby-flats-count-color: blue; //колір шрифта
  }
```

```javascript
// Для відображення на полігоні обльоту кількості квартир треба сформувати об'єкт з ключами, які показують обльот на якому цей будинок відображений
    
/*
  Приклад: перший та другий будинок відображаються на першому зовнішньому обльоті
  третій будинок відображається на другому внутрішньому обльоті

  тоді для правильного відображення має бути об'єкт

  {
    '1-2': 'flyby--1--outside',
    '3': 'flyby--2--inside'
  }

*/
const flybyAndBuildNamesMap = {
  // "3-2-4-5-7-8-6-9-10-11-12-1": 'flyby--1--outside',
  // "20-21-22-14-15-13-19-18-17-16-23-24-25-26": 'flyby--2--outside',
  // "34-35-36-27-28-29-30-31-32-33-40-39-38-37": 'flyby--3--outside',
};

```

## Отображение результатов бокового фильтра (Варианты: карточка, таблица)
######	В settings.json указать:
```
  "filter": {
    "viewType": one of ['card', 'list'],
  },
```

## Параметры чекбоксов для фильтра (автоматически формирует весь список параметров, которые есть в массиве квартир)
######	В settings.json указать:
```
  "filter": {
    "viewType": one of ['card', 'list'],
    "ranges": [
        "title_i18n": "Filter.range.floor",
        "title_postfix_i18n": "Filter.range.area_unit",
        "title_prefix_i18n": false,
        "name": "floor", // назва параметру з об'єкта квартири по якому буде фільтрувати
        "type": "range"
    ],
    "checkboxes": [
      {
        "title": "Filter.list.rooms", //переменная перевода из i18n для общей подписи
        "type": "checkbox", // так и оставить
        "id": "typeV", // id параметра фільтрації (якщо потрібно створити дві групи за однаковим параметром фільтраціі - вказати різні id)
        "wide": true, // широкий чекбокс(поки не працює, не внесені стилі)
        "needTranslation": false, // брать ли переменную из i18n (в случае если параметр не цифра)
        "translationNS": "", //где находятся в обьекте переводов подписи для каждого ключа параметра
        "ignoreParams": { // параметри квартири, при яких не треба відображати чекбокс (опціонально)
          "параметр квартири": [значення]  // якщо це числове значення, вказувати як Number (не String !)
        },
        "innerParamsFilter": { // параметри квартири, при яких треба відображати чекбокс (опціонально)
          "build_name": ["Villas"] // якщо це числове значення, вказувати як Number (не String !)
        },
        "paramaterByWhatWillBeFilter": "rooms" //название параметра из обьекта квартир, по которому будет фильтровать
      },
    ]
  },
```
___
## Галерея на плане квартиры
###### В приходящих параметрах квартиры указать 
    gallery: [Массив ссылок на изображения]
___
## Слайдер
###### Появление при нажатии на полигон в облете
##### Указать полигону:
    data-type="slider_popup" data-id="[ID]"
##### В settings.json: 
	{
		"sliderPopup": {
			"[ID]": {
				"[подпись к фото]": "[ссылка на фото]"
			}
		}
	}
___
### На плане этажа можно выбирать характеристику обведенной квартиры, которая будет выводится

[Где указывать параметр](./src/assets/s3d/scripts/modules/templates/floorSvg.js#L117) - строка 117

###### Параметр - valueToRenderOnPolygon
**Важно!** : он должен быть указан в обьекте квартиры, который приходит с сервера	
___
## Триггеры для аналитики
|  **Название** |  **Триггер**   |
| ------------ | ------------ |
| Переход на страницу апартамента | visit-appartment-page | 
| Нажатия кнопки "Связаться с менеджером" | callback-click | 
| Открытие фильтра  |  open-filter | 
| Ошибка модуля | module-error | 
| Переключение "день/ночь" | day-night-view |  
| переход на облет | visit-flyby-page |  
| Переход на страницу планировки | visit-plannings-page |  
| Переход на страницу этажи | visit-floor-page | 
| Переключение в фильтре "карточка/список" | filter-view-type-change |  
| Переход на квартиру с облета |  | 
| Переход на квартиру с страницы "Планировки" |  |  
| Отправка формы обратной связи | succesFormSend |  
| Нажатие кнопки "Обучение"  |  faq-button-click |  
| Переход на страницу "Избранное" | visit-favourites-page |  
| Добавление квартиры в избранное | add-object-to-favourites | 
| Удаление из избранного | delete-object-from-favourites |  
| По фильтрам клиента не найдено объектов | filter-flats-not-found | 
| Открытие ВР  тура на странице квартиры  |  vr-popup-open | 
| Открытие ссылки инфраструктуры на облете | click-infrastructure-pin |  
| Переключение вида 2д/3д на странице планировки |  |  
| Нажатие кнопки ПДФ  |  pdf-file-download | 
| Переход на страницу "этаж" из квартиры | visit-floor-page-from-flat-page |  
| Переход на страницу "этаж" из облета |  |  
| Переход на любую страницу 3д  |  visit-page | 
| загружен облет (в параметрах передается время загрузки)  |  flybyLoading | 
___


## Данные для мониторинга времени загрузки облета (flybyLoading)

```
  {
    timePlain: /*Время загрузки*/,
    url: /*Адрес*/,
    flybyId: /*название облета*/,
    flybySize: /*Размер облета*/,
    deviceType: /*Тип устройства ['desktop', 'tablet', 'mobile']*/,
    date: /* Дата загрузки */,
    screen: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    browser: /* Информация о браузере */,
  }
```


## Пример кода для перехвата событий
```js
	window.addEventListener(/*триггер*/, (event) => {
		const eventDetails = event.detail; // Данные этого триггера (объект)
	})
```


## Features

#### Сповіщення 

Бібліотека - [Toastify](https://www.npmjs.com/package/toastify-js)


# Managers 

[Link](./src/assets/s3d/scripts/managers)


# $s3dFlybySideChooser

Створює випадайку для переключення між внутрішнім/зовнішнім обльотами

GitHub Copilot: [component location](./src/assets/s3d/scripts/modules/templates/controller/$s3dFlybySideChooser.js)

Для відключення прописати у src/static/settings.json 

```js

  "hide_s3dFlybySideChooser": true

```

# Підсвітка кварти/обльотів/інфраструктури

app.model.js - handler ---> **handleHighlightFlybySvgElements**

Для управління підсвіткою в інших частинах модуля є стейт **highlightFlybySvgElements$**

[View](./src/assets/s3d/scripts/modules/templates/controller/$highlightSvgElements.js)

# Управління відображенням елементів на різних сторінках


hideElementsOnPages --> [View](./src/assets/s3d/scripts/modules/templates/controller/$hideElementsOnPages.js)

hideElementsAttribute([]strings) - Додати цю функцію до елементів, які потрібно приховати на вказаних сторінках

Приклад:

```js
import { hideElementsAttribute } from "../../../features/hideElementsOnPages";

function button(i18n) {
	return `
		<button ${hideElementsAttribute(['plannings', 'flyby_1_outside'])}>
			i18n.t('button')
    </button>
		`;
}
/*  Приховує цю кнопку на сторінці планувань та 1му зовнішньому обльоті */
```

showElementsOnPage --> [View](./src/assets/s3d/scripts/modules/templates/controller/$showElementsOnPage.js)

showElementsOnPageAttribute([]strings)- Додати цю функцію до елементів, які потрібно показувати тільки на вказаних сторінках

```js
import { showElementsOnPageAttribute } from "../../../features/showElementsOnPage";

function button(i18n) {
	return `
		<button ${showElementsOnPageAttribute(['plannings', 'flyby_1_outside'])}>
			i18n.t('button')
    </button>
		`;
}
/*  Показує цю кнопку тільки на сторінці планувань та 1му зовнішньому обльоті */
```


# Кастомні налаштування

  Можна зберігати кастомні налаштування на сервері без їх змін у репозиторії

  Для цього скопіювати ./src/static/settings.json в /wp-content/themes/[назва теми]/assets/s3d/settings.json


# Список властивостей для одної квартири, які мають приходити з бека:

|  Ключ | Приклад  | Опис |
| :------------ | :------------ | :------------ |
| currency_label | USD |  |
| id | 26219 |  |
| **gallery[]** |  | масив з адресами зображень |
| gallery[0] | https://grand-byrze-wp.smarto.agency/wp-content/themes/grand-byrze/assets/img/projects/36/2/section_7-9_kv1V.png |  |
| build | 2 | номер будинку |
| section | 8 | номер секції |
| sec_id | 8 | айді секції |
| floor | 2 | поверх |
| rooms | 1 | кількість кімнат |
| level | 4 | кількість рівнів |
| type | 1В | тип квартири |
| _type | 1В | тип квартири |
| number | 26637 | номер квартири |
| sale | 1 | статус квартири |
| compas | 50 | градус нахилу компасу (0-360) |
| action_price | 0 | акційна ціна |
| visible | 1 | видимість квартири |
| area | 43.99 | загальна площа |
| life_room | 16.81 | житлова площа |
| price | 350 000 | ціна |
| _price | 350000 |  ціна в числовому форматі |
| type_object | 1 | тип об'єкту(квартира, паркінг, комерція) |
| price_m2 |  |  ціна за м2 |
| _price_m2 |  | ціна за м2 в числовому форматі |
| img_big | https://grand-byrze-wp.smarto.agency/wp-content/themes/grand-byrze/assets/img/projects/36/2/section_7-9_kv1V.png | Фото планування |
| img_small | /wp-content/themes/grand-byrze/assets/img/projects/36/2/section_7-9_kv1V-400x85-100307.png | Зменшене фото планування |
| **flat_levels_photo**{} |  | Фото рівнів квартири |
| **1**{} |  | номер рівня |
| without | https://terra-rossa.devbase.pro/img/projects/2/1/136_-_22_____3_LÜ_VİLLA_2_2-1700139470.png | фото рівня 2d |
| with | https://terra-rossa.devbase.pro/img/projects/2/1/1_ZODİAC__136_22___-2_BODRUM_KAT_PLANI-1700139429.png | фото рівня 3d |
| **properties**{} |  | Список приміщень квартири |
| **3**{} |  |  |
| id | 82 |  |
| property_id | 3 |  |
| property_flat | 14.5 | площа приміщення |
| property_level | 4 | рівень на якому знаходиться приміщення |
| properties_order | 0 |  |
| property_name | Bedroom 2 | назва приміщення |
| property_type | 1 |  |
| properties_field_order | 0 |  |
| **images**{} |  |  |
| **without**{} |  |  |
| 2d | /img/projects/36/2/section_7-9_kv1V.png |  |
| 3d_tour |  | посилання на 3d тур |
| sorts | 309,573,662,574,660,968,599,1012,546,1013,502,976,303,976 | координати svg розмітки |
| price_history | Масив об'єктів | Массив з історією цін |



**price_history example:**

```json
[
    {
      "date": "2023-12-29 15:26:43",
      "currency": {
        "label": "$",
        "id": "USD",
        "symb": "$",
        "name": "Доллар США",
        "id_form": 4
      },
      "price_uah": 5524114.54,
      "price_usd": 146610,
      "price_m2_uah": 169555.39,
      "price_m2_usd": 4500
    },
    {
      "date": "2023-06-29 15:26:43",
      "currency": {
        "label": "$",
        "id": "USD",
        "symb": "$",
        "name": "Доллар США",
        "id_form": 4
      },
      "price_uah": 2524114.54,
      "price_usd": 146610,
      "price_m2_uah": 169555.39,
      "price_m2_usd": 4500
    },
    {
      "date": "2022-09-23 16:18:30",
      "currency": {
        "label": "грн",
        "id": "UAH",
        "symb": "₴",
        "name": "Гривна",
        "id_form": 0
      },
      "price_uah": 360114,
      "price_usd": 9557.43,
      "price_m2_uah": 11053.22,
      "price_m2_usd": 293.35
    }
  ]
```

# Форма зворотнього з'вязку

У settings.json:

```javascript
"form": {
	/*Приорітетні країни для вибору у полі "Телефон"*/
    "prefered_countries": ["ua", "us"]
  }
```

# Підписи цін та кількості квартир на обльотах

settings.json: 

ключ - **номер обльоту**, значення - **масив з номерами будинків квартир**

Приклад: 
```javascript
  "assotiated_flat_builds_with_flybys": {
    "1-outside": ["1","2"],
    "2-inside": ["3", "4", "5"]
  }
```
При таких налаштування на підписі 1-го зовнішнього обльоту будуть світитися квартири з будинків 1, 2.
На підписі 2-го внутрішнього обльоту будуть світитися квартири з будинків 3,4,5


# Підписи сроку здачі на обльотах

settings.json: 

ключ - **номер обльоту**, значення - **текст (без перекладу!)**

Приклад: 
```javascript
  "flyby_finish_dates": {
    "1-outside": "IV 2025",
    "2-outside": "III 2026"
  }
```


# Розташування на карті

settings.json ----> project_google_map_location
Посилання на айфрейм гугл карти


# Документація на сторінці квартири

/wp-admin/admin-ajax.php - action "getDocumentation"

Приклад необхідної відповіді: 

```json
[
  {
    "date": "2024-07-29 15:26:43",
    "img": "/wp-content/themes/3d/assets/s3d/images/examples/doc-example.jpg",
    "url": "/wp-content/themes/3d/assets/s3d/images/examples/doc-example.jpg",
    "title": "Правила та умови закупівлі",
    "description": "Цей документ містить інформацію про порядок купівлі квартири, необхідні документи, розмір початкового внеску, умови оплати та інші важливі деталі, пов'язані з придбанням нерухомості."
  },
]
```


# Фінансові умови на сторінці квартири

/wp-admin/admin-ajax.php - action "getFinancialTerms"

Приклад необхідної відповіді: 

```json
[
  {
    "title": "Installment plan",
    "description": "When purchasing real estate on installment terms, you make an initial payment of at least 30% of the total cost, and the remainder is paid in installments until the end of the term. Details about installment payments and calculating the size of the initial payment can be obtained from our managers.",
    "iconsUrls": [
      "https://devbase.pro/wp-content/themes/devbase/assets/images/logo.svg",
      "http://purecatamphetamine.github.io/country-flag-icons/3x2/UA.svg"
    ]
  },
]
```

# Хід будівництва на сторінці квартири

/wp-admin/admin-ajax.php - action "getConstructionProgress"

Приклад необхідної відповіді: 

```json
  {
    "date": "2024-07-29 15:26:43",
    "text": "As of today, the first two buildings of the apart-hotel are already in operation, welcoming guests and generating passive income for the owners. Construction works for the third building are currently underway.  The monolithic frame has already been poured to 80 percent. External walls have been completed to 50%. Internal walls and partitions have been installed to 15%. Staircases and platforms have been poured up to the level of the eighth floor. Installation of PVC windows has begun in the building. Thanks to coordinated and organized work, construction is progressing rapidly, significantly ahead of the scheduled construction works.",
    "video": "https://www.youtube.com/watch?v=9bZkp7q19f0",
    "gallery": [
      "https://smarto.agency/wp-content/themes/smartoagency/assets/images/jpg/ozon-preview.jpg",
      "https://smarto.agency/wp-content/themes/smartoagency/assets/images/jpg/ozon-preview.jpg",
      "https://smarto.agency/wp-content/themes/smartoagency/assets/images/jpg/ozon-preview.jpg"
    ]
  }
```

# Кастомні налаштування інфобоксів

**settings.json:**

```json

  "infoBoxes": {
    "general_flyby_button_titles": {
      "faq": "Можливі підписи для кнопок у інфобоксі обльоту : queue ,villa, house",
      "1_outside": "queue",
      "3_outside": "villa",
      "1_inside": "house"
    }
  }

```


# Логотип в шапці сайту

**settings.json:**

```json

  "header": {
    "logo": "/wp-content/themes/3d/assets/s3d/images/icon/smarto.svg"
  }

```
# Кастомний селектор для кнопки меню в хедері

**settings.json:**

```json

  "header": {
    "menu_selector": "data-custom-menu-selector"
  }

```

# Стилізація модулю

  В цьому файлі можна визначити глобальні змінні для модулю.

  [Theme vars](src/assets/s3d/styles/globals/theme_vars.scss)

  Також можна підключити окремий файл зі стилями для модулю за допомогою WordPress, скопіювати з файлу [Theme vars](src/assets/s3d/styles/globals/theme_vars.scss) і перебити дефолтні змінні.

  Приклад:

  custom_module_wp_styles.css

  ```scss
    :root {
      --border-space-1: 0px; //в стандартній темі була 4px
      --color-brand-800: blue; //в стандартній темі був #005450
    }
  ```



## Паралакс на обльотах

  Для включення паралаксу на обльотах потрібно в settings.json вказати

  ```js
  "enableParalax": true
  ```

  Для відключення паралаксу на обльотах потрібно в settings.json вказати

  ```js
  "enableParalax": false
  ```
## Хмари на обльотах

  Для включення хмар на обльотах потрібно в settings.json вказати

  ```js
  "enableClouds": true
  ```

  Для відключення хмар на обльотах потрібно в settings.json вказати

  ```js
  "enableClouds": false
  ```

## Відображення цін

  ```js
  "show_prices": true
  ```

  Важливо! Це пріоритетне налаштування, якщо воно вказано, то відображення цін буде відповідно до нього, незалежно від інших налаштувань