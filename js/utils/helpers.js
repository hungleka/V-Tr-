// Utility Functions

// Format date to Vietnamese locale
export function formatDate(date) {
  return new Date(date).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Format number with thousands separator
export function formatNumber(number) {
  return new Intl.NumberFormat("vi-VN").format(number);
}

// Format currency to VND
export function formatCurrency(amount) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

// Format percentage
export function formatPercentage(value) {
  return new Intl.NumberFormat("vi-VN", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value / 100);
}

// Format file size
export function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

// Format duration in seconds to human readable format
export function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const parts = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (remainingSeconds > 0) parts.push(`${remainingSeconds}s`);

  return parts.join(" ");
}

// Generate random string
export function generateRandomString(length = 8) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Debounce function
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function
export function throttle(func, limit) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Deep clone object
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// Check if object is empty
export function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

// Get random number between min and max
export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Capitalize first letter of each word
export function capitalizeWords(str) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

// Truncate text with ellipsis
export function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

// Check if element is in viewport
export function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Get scroll position
export function getScrollPosition() {
  return {
    x: window.pageXOffset || document.documentElement.scrollLeft,
    y: window.pageYOffset || document.documentElement.scrollTop,
  };
}

// Smooth scroll to element
export function smoothScrollTo(element, duration = 500) {
  const targetPosition = element.getBoundingClientRect().top;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

// Check if device is mobile
export function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

// Check if browser supports touch events
export function isTouchDevice() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

// Get device pixel ratio
export function getDevicePixelRatio() {
  return window.devicePixelRatio || 1;
}

// Check if browser is online
export function isOnline() {
  return navigator.onLine;
}

// Get browser language
export function getBrowserLanguage() {
  return navigator.language || navigator.userLanguage;
}

// Get browser info
export function getBrowserInfo() {
  return {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    cookiesEnabled: navigator.cookieEnabled,
    online: navigator.onLine,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    devicePixelRatio: window.devicePixelRatio,
  };
}

// Format phone number
export function formatPhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return "(" + match[1] + ") " + match[2] + "-" + match[3];
  }
  return phone;
}

// Validate email
export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Validate phone number
export function validatePhone(phone) {
  const re = /^(\d{3})[-. ]?(\d{3})[-. ]?(\d{4})$/;
  return re.test(phone);
}

// Validate URL
export function validateURL(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// Get query parameters
export function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return Object.fromEntries(params);
}

// Set query parameters
export function setQueryParams(params) {
  const searchParams = new URLSearchParams(params);
  window.history.replaceState(
    {},
    "",
    `${window.location.pathname}?${searchParams}`
  );
}

// Remove query parameters
export function removeQueryParams() {
  window.history.replaceState({}, "", window.location.pathname);
}

// Get local storage with fallback
export function getLocalStorage(key, fallback = null) {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return fallback;
  }
}

// Set local storage with error handling
export function setLocalStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error writing to localStorage:", error);
  }
}

// Remove from local storage
export function removeLocalStorage(key) {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing from localStorage:", error);
  }
}

// Clear local storage
export function clearLocalStorage() {
  try {
    window.localStorage.clear();
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
}

// Get session storage with fallback
export function getSessionStorage(key, fallback = null) {
  try {
    const item = window.sessionStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (error) {
    console.error("Error reading from sessionStorage:", error);
    return fallback;
  }
}

// Set session storage with error handling
export function setSessionStorage(key, value) {
  try {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error writing to sessionStorage:", error);
  }
}

// Remove from session storage
export function removeSessionStorage(key) {
  try {
    window.sessionStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing from sessionStorage:", error);
  }
}

// Clear session storage
export function clearSessionStorage() {
  try {
    window.sessionStorage.clear();
  } catch (error) {
    console.error("Error clearing sessionStorage:", error);
  }
}

// Copy text to clipboard
export function copyToClipboard(text) {
  return navigator.clipboard.writeText(text);
}

// Download file
export function downloadFile(url, filename) {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Open file in new tab
export function openInNewTab(url) {
  window.open(url, "_blank");
}

// Print page
export function printPage() {
  window.print();
}

// Reload page
export function reloadPage() {
  window.location.reload();
}

// Go back
export function goBack() {
  window.history.back();
}

// Go forward
export function goForward() {
  window.history.forward();
}

// Get current URL
export function getCurrentURL() {
  return window.location.href;
}

// Get current path
export function getCurrentPath() {
  return window.location.pathname;
}

// Get current hash
export function getCurrentHash() {
  return window.location.hash;
}

// Set hash
export function setHash(hash) {
  window.location.hash = hash;
}

// Remove hash
export function removeHash() {
  window.history.replaceState(
    {},
    document.title,
    window.location.pathname + window.location.search
  );
}

// Get current search
export function getCurrentSearch() {
  return window.location.search;
}

// Set search
export function setSearch(search) {
  window.location.search = search;
}

// Remove search
export function removeSearch() {
  window.history.replaceState(
    {},
    document.title,
    window.location.pathname + window.location.hash
  );
}

// Get current origin
export function getCurrentOrigin() {
  return window.location.origin;
}

// Get current hostname
export function getCurrentHostname() {
  return window.location.hostname;
}

// Get current port
export function getCurrentPort() {
  return window.location.port;
}

// Get current protocol
export function getCurrentProtocol() {
  return window.location.protocol;
}

// Get current host
export function getCurrentHost() {
  return window.location.host;
}

// Get current pathname
export function getCurrentPathname() {
  return window.location.pathname;
}

// Get current search params
export function getCurrentSearchParams() {
  return new URLSearchParams(window.location.search);
}

// Set current search params
export function setCurrentSearchParams(params) {
  const searchParams = new URLSearchParams(params);
  window.history.replaceState(
    {},
    "",
    `${window.location.pathname}?${searchParams}`
  );
}

// Get current hash params
export function getCurrentHashParams() {
  const hash = window.location.hash.slice(1);
  return new URLSearchParams(hash);
}

// Set current hash params
export function setCurrentHashParams(params) {
  const searchParams = new URLSearchParams(params);
  window.location.hash = searchParams.toString();
}

// Get current hash param
export function getCurrentHashParam(param) {
  const params = getCurrentHashParams();
  return params.get(param);
}

// Set current hash param
export function setCurrentHashParam(param, value) {
  const params = getCurrentHashParams();
  params.set(param, value);
  setCurrentHashParams(params);
}

// Remove current hash param
export function removeCurrentHashParam(param) {
  const params = getCurrentHashParams();
  params.delete(param);
  setCurrentHashParams(params);
}

// Get current search param
export function getCurrentSearchParam(param) {
  const params = getCurrentSearchParams();
  return params.get(param);
}

// Set current search param
export function setCurrentSearchParam(param, value) {
  const params = getCurrentSearchParams();
  params.set(param, value);
  setCurrentSearchParams(params);
}

// Remove current search param
export function removeCurrentSearchParam(param) {
  const params = getCurrentSearchParams();
  params.delete(param);
  setCurrentSearchParams(params);
}

// Get current hash param as number
export function getCurrentHashParamAsNumber(param) {
  const value = getCurrentHashParam(param);
  return value ? Number(value) : null;
}

// Get current search param as number
export function getCurrentSearchParamAsNumber(param) {
  const value = getCurrentSearchParam(param);
  return value ? Number(value) : null;
}

// Get current hash param as boolean
export function getCurrentHashParamAsBoolean(param) {
  const value = getCurrentHashParam(param);
  return value === "true";
}

// Get current search param as boolean
export function getCurrentSearchParamAsBoolean(param) {
  const value = getCurrentSearchParam(param);
  return value === "true";
}

// Get current hash param as array
export function getCurrentHashParamAsArray(param) {
  const value = getCurrentHashParam(param);
  return value ? value.split(",") : [];
}

// Get current search param as array
export function getCurrentSearchParamAsArray(param) {
  const value = getCurrentSearchParam(param);
  return value ? value.split(",") : [];
}

// Get current hash param as object
export function getCurrentHashParamAsObject(param) {
  const value = getCurrentHashParam(param);
  return value ? JSON.parse(value) : null;
}

// Get current search param as object
export function getCurrentSearchParamAsObject(param) {
  const value = getCurrentSearchParam(param);
  return value ? JSON.parse(value) : null;
}

// Get current hash param as date
export function getCurrentHashParamAsDate(param) {
  const value = getCurrentHashParam(param);
  return value ? new Date(value) : null;
}

// Get current search param as date
export function getCurrentSearchParamAsDate(param) {
  const value = getCurrentSearchParam(param);
  return value ? new Date(value) : null;
}

// Get current hash param as color
export function getCurrentHashParamAsColor(param) {
  const value = getCurrentHashParam(param);
  return value ? `#${value}` : null;
}

// Get current search param as color
export function getCurrentSearchParamAsColor(param) {
  const value = getCurrentSearchParam(param);
  return value ? `#${value}` : null;
}

// Get current hash param as rgb
export function getCurrentHashParamAsRGB(param) {
  const value = getCurrentHashParam(param);
  return value ? `rgb(${value})` : null;
}

// Get current search param as rgb
export function getCurrentSearchParamAsRGB(param) {
  const value = getCurrentSearchParam(param);
  return value ? `rgb(${value})` : null;
}

// Get current hash param as rgba
export function getCurrentHashParamAsRGBA(param) {
  const value = getCurrentHashParam(param);
  return value ? `rgba(${value})` : null;
}

// Get current search param as rgba
export function getCurrentSearchParamAsRGBA(param) {
  const value = getCurrentSearchParam(param);
  return value ? `rgba(${value})` : null;
}

// Get current hash param as hsl
export function getCurrentHashParamAsHSL(param) {
  const value = getCurrentHashParam(param);
  return value ? `hsl(${value})` : null;
}

// Get current search param as hsl
export function getCurrentSearchParamAsHSL(param) {
  const value = getCurrentSearchParam(param);
  return value ? `hsl(${value})` : null;
}

// Get current hash param as hsla
export function getCurrentHashParamAsHSLA(param) {
  const value = getCurrentHashParam(param);
  return value ? `hsla(${value})` : null;
}

// Get current search param as hsla
export function getCurrentSearchParamAsHSLA(param) {
  const value = getCurrentSearchParam(param);
  return value ? `hsla(${value})` : null;
}

// Get current hash param as hex
export function getCurrentHashParamAsHex(param) {
  const value = getCurrentHashParam(param);
  return value ? `0x${value}` : null;
}

// Get current search param as hex
export function getCurrentSearchParamAsHex(param) {
  const value = getCurrentSearchParam(param);
  return value ? `0x${value}` : null;
}

// Get current hash param as binary
export function getCurrentHashParamAsBinary(param) {
  const value = getCurrentHashParam(param);
  return value ? parseInt(value, 2) : null;
}

// Get current search param as binary
export function getCurrentSearchParamAsBinary(param) {
  const value = getCurrentSearchParam(param);
  return value ? parseInt(value, 2) : null;
}

// Get current hash param as octal
export function getCurrentHashParamAsOctal(param) {
  const value = getCurrentHashParam(param);
  return value ? parseInt(value, 8) : null;
}

// Get current search param as octal
export function getCurrentSearchParamAsOctal(param) {
  const value = getCurrentSearchParam(param);
  return value ? parseInt(value, 8) : null;
}

// Get current hash param as base64
export function getCurrentHashParamAsBase64(param) {
  const value = getCurrentHashParam(param);
  return value ? atob(value) : null;
}

// Get current search param as base64
export function getCurrentSearchParamAsBase64(param) {
  const value = getCurrentSearchParam(param);
  return value ? atob(value) : null;
}

// Get current hash param as json
export function getCurrentHashParamAsJSON(param) {
  const value = getCurrentHashParam(param);
  return value ? JSON.parse(value) : null;
}

// Get current search param as json
export function getCurrentSearchParamAsJSON(param) {
  const value = getCurrentSearchParam(param);
  return value ? JSON.parse(value) : null;
}

// Get current hash param as xml
export function getCurrentHashParamAsXML(param) {
  const value = getCurrentHashParam(param);
  return value ? new DOMParser().parseFromString(value, "text/xml") : null;
}

// Get current search param as xml
export function getCurrentSearchParamAsXML(param) {
  const value = getCurrentSearchParam(param);
  return value ? new DOMParser().parseFromString(value, "text/xml") : null;
}

// Get current hash param as html
export function getCurrentHashParamAsHTML(param) {
  const value = getCurrentHashParam(param);
  return value ? new DOMParser().parseFromString(value, "text/html") : null;
}

// Get current search param as html
export function getCurrentSearchParamAsHTML(param) {
  const value = getCurrentSearchParam(param);
  return value ? new DOMParser().parseFromString(value, "text/html") : null;
}

// Get current hash param as svg
export function getCurrentHashParamAsSVG(param) {
  const value = getCurrentHashParam(param);
  return value ? new DOMParser().parseFromString(value, "image/svg+xml") : null;
}

// Get current search param as svg
export function getCurrentSearchParamAsSVG(param) {
  const value = getCurrentSearchParam(param);
  return value ? new DOMParser().parseFromString(value, "image/svg+xml") : null;
}

// Get current hash param as blob
export function getCurrentHashParamAsBlob(param) {
  const value = getCurrentHashParam(param);
  return value ? new Blob([value]) : null;
}

// Get current search param as blob
export function getCurrentSearchParamAsBlob(param) {
  const value = getCurrentSearchParam(param);
  return value ? new Blob([value]) : null;
}

// Get current hash param as file
export function getCurrentHashParamAsFile(param) {
  const value = getCurrentHashParam(param);
  return value ? new File([value], "file") : null;
}

// Get current search param as file
export function getCurrentSearchParamAsFile(param) {
  const value = getCurrentSearchParam(param);
  return value ? new File([value], "file") : null;
}

// Get current hash param as form data
export function getCurrentHashParamAsFormData(param) {
  const value = getCurrentHashParam(param);
  return value ? new FormData(value) : null;
}

// Get current search param as form data
export function getCurrentSearchParamAsFormData(param) {
  const value = getCurrentSearchParam(param);
  return value ? new FormData(value) : null;
}

// Get current hash param as url
export function getCurrentHashParamAsURL(param) {
  const value = getCurrentHashParam(param);
  return value ? new URL(value) : null;
}

// Get current search param as url
export function getCurrentSearchParamAsURL(param) {
  const value = getCurrentSearchParam(param);
  return value ? new URL(value) : null;
}

// Get current hash param as url search params
export function getCurrentHashParamAsURLSearchParams(param) {
  const value = getCurrentHashParam(param);
  return value ? new URLSearchParams(value) : null;
}

// Get current search param as url search params
export function getCurrentSearchParamAsURLSearchParams(param) {
  const value = getCurrentSearchParam(param);
  return value ? new URLSearchParams(value) : null;
}

// Get current hash param as url pattern
export function getCurrentHashParamAsURLPattern(param) {
  const value = getCurrentHashParam(param);
  return value ? new URLPattern(value) : null;
}

// Get current search param as url pattern
export function getCurrentSearchParamAsURLPattern(param) {
  const value = getCurrentSearchParam(param);
  return value ? new URLPattern(value) : null;
}

// Get current hash param as url pattern result
export function getCurrentHashParamAsURLPatternResult(param) {
  const value = getCurrentHashParam(param);
  return value ? new URLPattern(value).exec(window.location.href) : null;
}

// Get current search param as url pattern result
export function getCurrentSearchParamAsURLPatternResult(param) {
  const value = getCurrentSearchParam(param);
  return value ? new URLPattern(value).exec(window.location.href) : null;
}

// Get current hash param as url pattern result groups
export function getCurrentHashParamAsURLPatternResultGroups(param) {
  const value = getCurrentHashParam(param);
  return value ? new URLPattern(value).exec(window.location.href).groups : null;
}

// Get current search param as url pattern result groups
export function getCurrentSearchParamAsURLPatternResultGroups(param) {
  const value = getCurrentSearchParam(param);
  return value ? new URLPattern(value).exec(window.location.href).groups : null;
}

// Get current hash param as url pattern result pathname
export function getCurrentHashParamAsURLPatternResultPathname(param) {
  const value = getCurrentHashParam(param);
  return value
    ? new URLPattern(value).exec(window.location.href).pathname
    : null;
}

// Get current search param as url pattern result pathname
export function getCurrentSearchParamAsURLPatternResultPathname(param) {
  const value = getCurrentSearchParam(param);
  return value
    ? new URLPattern(value).exec(window.location.href).pathname
    : null;
}

// Get current hash param as url pattern result search
export function getCurrentHashParamAsURLPatternResultSearch(param) {
  const value = getCurrentHashParam(param);
  return value ? new URLPattern(value).exec(window.location.href).search : null;
}

// Get current search param as url pattern result search
export function getCurrentSearchParamAsURLPatternResultSearch(param) {
  const value = getCurrentSearchParam(param);
  return value ? new URLPattern(value).exec(window.location.href).search : null;
}

// Get current hash param as url pattern result hash
export function getCurrentHashParamAsURLPatternResultHash(param) {
  const value = getCurrentHashParam(param);
  return value ? new URLPattern(value).exec(window.location.href).hash : null;
}

// Get current search param as url pattern result hash
export function getCurrentSearchParamAsURLPatternResultHash(param) {
  const value = getCurrentSearchParam(param);
  return value ? new URLPattern(value).exec(window.location.href).hash : null;
}

// Get current hash param as url pattern result hostname
export function getCurrentHashParamAsURLPatternResultHostname(param) {
  const value = getCurrentHashParam(param);
  return value
    ? new URLPattern(value).exec(window.location.href).hostname
    : null;
}

// Get current search param as url pattern result hostname
export function getCurrentSearchParamAsURLPatternResultHostname(param) {
  const value = getCurrentSearchParam(param);
  return value
    ? new URLPattern(value).exec(window.location.href).hostname
    : null;
}

// Get current hash param as url pattern result port
export function getCurrentHashParamAsURLPatternResultPort(param) {
  const value = getCurrentHashParam(param);
  return value ? new URLPattern(value).exec(window.location.href).port : null;
}

// Get current search param as url pattern result port
export function getCurrentSearchParamAsURLPatternResultPort(param) {
  const value = getCurrentSearchParam(param);
  return value ? new URLPattern(value).exec(window.location.href).port : null;
}

// Get current hash param as url pattern result protocol
export function getCurrentHashParamAsURLPatternResultProtocol(param) {
  const value = getCurrentHashParam(param);
  return value
    ? new URLPattern(value).exec(window.location.href).protocol
    : null;
}

// Get current search param as url pattern result protocol
export function getCurrentSearchParamAsURLPatternResultProtocol(param) {
  const value = getCurrentSearchParam(param);
  return value
    ? new URLPattern(value).exec(window.location.href).protocol
    : null;
}

// Get current hash param as url pattern result username
export function getCurrentHashParamAsURLPatternResultUsername(param) {
  const value = getCurrentHashParam(param);
  return value
    ? new URLPattern(value).exec(window.location.href).username
    : null;
}

// Get current search param as url pattern result username
export function getCurrentSearchParamAsURLPatternResultUsername(param) {
  const value = getCurrentSearchParam(param);
  return value
    ? new URLPattern(value).exec(window.location.href).username
    : null;
}

// Get current hash param as url pattern result password
export function getCurrentHashParamAsURLPatternResultPassword(param) {
  const value = getCurrentHashParam(param);
  return value
    ? new URLPattern(value).exec(window.location.href).password
    : null;
}

// Get current search param as url pattern result password
export function getCurrentSearchParamAsURLPatternResultPassword(param) {
  const value = getCurrentSearchParam(param);
  return value
    ? new URLPattern(value).exec(window.location.href).password
    : null;
}

// Get current hash param as url pattern result origin
export function getCurrentHashParamAsURLPatternResultOrigin(param) {
  const value = getCurrentHashParam(param);
  return value ? new URLPattern(value).exec(window.location.href).origin : null;
}

// Get current search param as url pattern result origin
export function getCurrentSearchParamAsURLPatternResultOrigin(param) {
  const value = getCurrentSearchParam(param);
  return value ? new URLPattern(value).exec(window.location.href).origin : null;
}

// Get current hash param as url pattern result href
export function getCurrentHashParamAsURLPatternResultHref(param) {
  const value = getCurrentHashParam(param);
  return value ? new URLPattern(value).exec(window.location.href).href : null;
}

// Get current search param as url pattern result href
export function getCurrentSearchParamAsURLPatternResultHref(param) {
  const value = getCurrentSearchParam(param);
  return value ? new URLPattern(value).exec(window.location.href).href : null;
}

// Get current hash param as url pattern result input
export function getCurrentHashParamAsURLPatternResultInput(param) {
  const value = getCurrentHashParam(param);
  return value ? new URLPattern(value).exec(window.location.href).input : null;
}

// Get current search param as url pattern result input
export function getCurrentSearchParamAsURLPatternResultInput(param) {
  const value = getCurrentSearchParam(param);
  return value ? new URLPattern(value).exec(window.location.href).input : null;
}

// Get current hash param as url pattern result groups
export function getCurrentHashParamAsURLPatternResultGroups(param) {
  const value = getCurrentHashParam(param);
  return value ? new URLPattern(value).exec(window.location.href).groups : null;
}

// Get current search param as url pattern result groups
export function getCurrentSearchParamAsURLPatternResultGroups(param) {
  const value = getCurrentSearchParam(param);
  return value ? new URLPattern(value).exec(window.location.href).groups : null;
}

// Get current hash param as url pattern result indices
export function getCurrentHashParamAsURLPatternResultIndices(param) {
  const value = getCurrentHashParam(param);
  return value
    ? new URLPattern(value).exec(window.location.href).indices
    : null;
}

// Get current search param as url pattern result indices
export function getCurrentSearchParamAsURLPatternResultIndices(param) {
  const value = getCurrentSearchParam(param);
  return value
    ? new URLPattern(value).exec(window.location.href).indices
    : null;
}

// Get current hash param as url pattern result index
export function getCurrentHashParamAsURLPatternResultIndex(param) {
  const value = getCurrentHashParam(param);
  return value ? new URLPattern(value).exec(window.location.href).index : null;
}

// Get current search param as url pattern result index
export function getCurrentSearchParamAsURLPatternResultIndex(param) {
  const value = getCurrentSearchParam(param);
  return value ? new URLPattern(value).exec(window.location.href).index : null;
}

// Get current hash param as url pattern result length
export function getCurrentHashParamAsURLPatternResultLength(param) {
  const value = getCurrentHashParam(param);
  return value ? new URLPattern(value).exec(window.location.href).length : null;
}

// Get current search param as url pattern result length
export function getCurrentSearchParamAsURLPatternResultLength(param) {
  const value = getCurrentSearchParam(param);
  return value ? new URLPattern(value).exec(window.location.href).length : null;
}

// Get current hash param as url pattern result lastIndex
export function getCurrentHashParamAsURLPatternResultLastIndex(param) {
  const value = getCurrentHashParam(param);
  return value
    ? new URLPattern(value).exec(window.location.href).lastIndex
    : null;
}

// Get current search param as url pattern result lastIndex
export function getCurrentSearchParamAsURLPatternResultLastIndex(param) {
  const value = getCurrentSearchParam(param);
  return value
    ? new URLPattern(value).exec(window.location.href).lastIndex
    : null;
}
