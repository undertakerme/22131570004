export let urlDB = JSON.parse(localStorage.getItem("urlDB") || "[]");
export let clickLogs = JSON.parse(localStorage.getItem("clickLogs") || "[]");

export const saveToStorage = () => {
  localStorage.setItem("urlDB", JSON.stringify(urlDB));
  localStorage.setItem("clickLogs", JSON.stringify(clickLogs));
};
