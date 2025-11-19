import copy from 'copy-to-clipboard';

export function share() {

    copy(window.location.href);
}