import device from "current-device";

/**
 * Adds commas to a number for better readability.
 * @param {number} x - The number to add commas to.
 * @returns {string} - The number with commas added.
 */
export function numberWithCommas(x) {
  if (!x) return '';
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

/**
 * Checks if the current device is a mobile device.
 * @returns {boolean} Returns true if the device is mobile, false otherwise.
 */
export function isMobile() {
  return document.documentElement.classList.contains('mobile');
}

export function isTablet() {
  return document.documentElement.classList.contains('tablet');
}

export function isDesktop() {
  return document.documentElement.classList.contains('desktop');
}


export function showOnMobile(content) {
  return isMobile() ? content : '';
}

export function showOnTablet(content) {
  return isTablet() ? content : '';
}

export function showOnDesktop(content) {
  return isDesktop() ? content : '';
}

/**
 * Checks if the current device type is included in the specified devices array and returns the corresponding content.
 * @param {Array['desktop', 'tablet', 'mobile']} devices - An array of device types to check against.
 * @param {string} content - The content to return if the current device type is included in the devices array.
 * @returns {string} - The content if the current device type is included in the devices array, otherwise an empty string.
 */
export function showOn(devices = [], content) {
  return devices.includes(device.type) ? content : '';
}