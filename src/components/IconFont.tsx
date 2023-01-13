import React, { memo } from "react";
/* 
function loadIcons() {
  const s = document.createElement("script");
  s.src = "//at.alicdn.com/t/c/font_3854655_z0i208wtiv8.js";
  s.async = true;
  document.getElementsByTagName("head")[0].appendChild(s);
}
*/
export default memo(function IconFont({
  style,
  type,
  color,
  fontSize
}: {
  style?: React.CSSProperties;
  type: string;
  color?: React.CSSProperties["color"];
  fontSize?: React.CSSProperties["fontSize"];
}) {
  return (
    <span style={{ color: style?.color || color, fontSize: style?.fontSize || fontSize, ...style }}>
      <svg className="icon" aria-hidden="true">
        <use xlinkHref={`#${type}`}></use>
      </svg>
    </span>
  );
});
