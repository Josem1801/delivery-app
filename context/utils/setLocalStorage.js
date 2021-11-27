import PropTypes from "prop-types";
/**
 * @param {string} key - localStorage: Item's name
 * @param {Array} data - localStorage: Item's data
 */
export default function setLocalStorage(key, data) {
  if (typeof window !== "undefined")
    window.localStorage.setItem(key, JSON.stringify(data));
}
