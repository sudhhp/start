export function formatDate(date) {
  return date.toLocaleDateString("fa-IR", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
