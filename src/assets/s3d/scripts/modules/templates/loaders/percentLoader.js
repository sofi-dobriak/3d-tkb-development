export default function percentLoader(i18n) {
    return `
        <div class="fs-preloader-before js-fs-preloader-before">
            <div class="fs-preloader-before-background"></div>
            <div class="fs-preloader-before-box"></div>
            <div class="fs-preloader-before-shadow"></div>
            <div class="fs-preloader-before-precent fs-preloader-before-text-large">${i18n.t('load.loading-text')}</div>
            <div class="fs-preloader-before-precent fs-preloader-before-text-subtitle">${i18n.t('load.loading-text-wait')}</div>
            <div class="fs-preloader-precent"><span class="fs-preloader-amount"></span>%</div>
        </div>
        <!--<div class="horizontal-mob-curtain">${i18n.t('loader.rotate_warning')}</div>-->
    `;
}
