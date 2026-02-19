export function getRestaurantID() {
  let params = new URLSearchParams(window.location.search);
  return params.get("rest") || "tutto";
}