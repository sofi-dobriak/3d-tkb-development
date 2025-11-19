import s3d2spriteIcon from "../../../../../s3d2/scripts/templates/spriteIcon";

export default function $closeBtn() {
  return `
    <button class="s3d__close s3d-infoBox__close" data-s3d-event="closed">
        <!--${s3d2spriteIcon('close')}-->
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path fill-rule="evenodd" clip-rule="evenodd" d="M1.70704 0.998623L7.4056 6.69614L6.69856 7.40331L1 1.70579L1.70704 0.998623ZM15.0037 1.70579L9.30512 7.40331L8.59808 6.69614L14.2966 0.998623L15.0037 1.70579ZM7.4056 9.30248L1.70704 15L1 14.2928L6.69856 8.59531L7.4056 9.30248ZM9.30512 8.59531L15.0037 14.2928L14.2966 15L8.59808 9.30248L9.30512 8.59531Z"/>
        </svg>
    </button>
  `;
}
