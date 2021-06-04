export default function() {
  window.location.replace(`https://${window.location.host}${window.location.pathname}?logout=true`);
}