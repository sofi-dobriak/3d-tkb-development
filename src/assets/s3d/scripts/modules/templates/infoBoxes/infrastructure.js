import { deviceType } from 'detect-it';
import $closeBtn from './$closeBtn';
import ButtonWithoutIcon from '../../../../../s3d2/scripts/templates/common/ButtonWithoutIcon';
import s3d2spriteIcon from '../../../../../s3d2/scripts/templates/spriteIcon';

function infrastructure(i18n, data) {
  const $button = data.href && deviceType === 'hybrid' || deviceType === 'touchOnly' ? 
    ButtonWithoutIcon('js-s3d-flat__3d-tour',`data-href="${data.href}"`,'View', 'secondary') :
    '';
  const $title = data.title ? `<span class="s3d-infoBox__infrastructure-title">
    ${data.title}
  </span>` : '';

  const $description = data.text ? `<span class="s3d-infoBox__infrastructure-description">
    ${data.text}
  </span>` : '';



  const $vrIcon = /\.(jpg$|png$|webp$|jpeg$)/i.test(data.href) ? 
    `` :
    `
      <div class="s3d-infoBox__infrastructure-vr-icon">
        ${s3d2spriteIcon('Pin 360°', '')}
      </div>
    `;

  const $img = data.img ? `<div class="s3d-infoBox__infrastructure-img">
    <img src="${data.img}">
  </div>` : '';
  return `
    <div class="s3d-infoBox__infrastructure" ${!data.img ? 'data-no-image': ''}>
      ${$closeBtn()}
      ${$vrIcon}
      ${$img}
      ${$title}
      <!--${$description}-->
      ${$button}
    </div>`;
}

export default infrastructure;
