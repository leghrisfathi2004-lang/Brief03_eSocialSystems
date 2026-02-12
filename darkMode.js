
// Dark Mode
tailwind.config = {
  darkMode: "class",
};

const darkMode = localStorage.getItem("darkMode");

window.addEventListener("DOMContentLoaded", () => {
  const darkMode = localStorage.getItem("darkMode");

  if (darkMode === "enabled") {
    document.documentElement.classList.add("dark");
  }
});
const darkBtn = document.querySelector("#dark-btn");
darkBtn.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  const isDark = document.documentElement.classList.contains("dark");
  localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
  console.log(isDark);
  console.log(darkMode);
});
