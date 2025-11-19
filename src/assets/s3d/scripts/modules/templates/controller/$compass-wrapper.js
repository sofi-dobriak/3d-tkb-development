import compass from "./$compass";

function compassWrapper(i18n) {
  return `
    <div class="s3d-ctr__menu-3d-compass-nav">
        <button class="js-ctr-btn s3d__button s3d__button-left js-s3d__button-left unselectable" data-type="prev">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.90658 12.5062L12.7036 17.3055L11.9963 18.0124L6.34625 12.3597L5.99294 12.0062L6.34625 11.6527L11.9963 6L12.7036 6.70694L7.90658 11.5062H18V12.5062H7.90658Z"/>
          </svg>
        </button>
        ${compass(i18n)}
        <button class="js-ctr-btn s3d__button s3d__button-right js-s3d__button-right unselectable" data-type="next">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.0864 12.5005L11.2932 17.2938L12.0003 18.0009L17.647 12.354L18.0005 12.0005L17.647 11.6469L12.0003 6L11.2932 6.70709L16.0864 11.5005H6V12.5005H16.0864Z" />
          </svg>
        </button>
     </div>
  `;
}

export default compassWrapper;
