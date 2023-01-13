window.addEventListener("erro", function (error) {
  console.log("error", error);
});

window.addEventListener("load", function () {
  loadIcons();
});

function loadIcons() {
  const s = document.createElement("script");
  s.src = "//at.alicdn.com/t/c/font_3854655_z0i208wtiv8.js";
  s.async = true;
  document.getElementsByTagName("head")[0].appendChild(s);
}
