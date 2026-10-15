import { ImageResponse } from "next/og";

export const alt = "ROBOTECH Молдова — команда FTC #25491";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#080808", color: "#f7f7f5", padding: "72px 82px", border: "18px solid #111" }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><div style={{ display: "flex", fontSize: 34, letterSpacing: 7, fontWeight: 800 }}>ROBOTECH</div><div style={{ color: "#ff8a2a", fontSize: 25 }}>КИШИНЁВ · МОЛДОВА</div></div><div style={{ display: "flex", flexDirection: "column" }}><div style={{ display: "flex", flexDirection: "column", fontSize: 58, lineHeight: 0.94, letterSpacing: -4, fontWeight: 800 }}><span>СОБИРАЙ. ПИШИ КОД.</span><span style={{ color: "#ff6a00" }}>ПОБЕЖДАЙ.</span></div><div style={{ display: "flex", marginTop: 38, fontSize: 27, color: "#a6a6a6" }}>В экосистеме FIRST с 2018 года&nbsp;&nbsp;·&nbsp;&nbsp;Команда FTC #25491</div></div><div style={{ height: 6, width: "100%", background: "#ff6a00" }} /></div>, size);
}
