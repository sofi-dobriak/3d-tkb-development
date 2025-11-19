export default function loader(logo) {

  const src = logo ? logo : `${defaultModulePath}/images/svg/logo.svg`;

  return `
        <div class="fs-preloader js-fs-preloader" id="preloader">
          <img class="fs-preloader-logo" src="${src}"/>
        </div>
    `;
}
