import { ImageResponse } from "next/og";

export const alt = "ROBOTECH Moldova — FTC Team #25491";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#080808", color: "#f7f7f5", padding: "72px 82px", border: "18px solid #111" }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><div style={{ display: "flex", fontSize: 34, letterSpacing: 7, fontWeight: 800 }}>ROBO<span style={{ color: "#ff6a00" }}>TECH</span></div><div style={{ color: "#ff8a2a", fontSize: 25 }}>CHIȘINĂU · MOLDOVA</div></div><div style={{ display: "flex", flexDirection: "column" }}><div style={{ display: "flex", flexDirection: "column", fontSize: 92, lineHeight: 0.94, letterSpacing: -4, fontWeight: 800 }}><span>BUILD. CODE.</span><span style={{ color: "#ff6a00" }}>COMPETE.</span></div><div style={{ display: "flex", marginTop: 38, fontSize: 27, color: "#a6a6a6" }}>FIRST ecosystem since 2018&nbsp;&nbsp;·&nbsp;&nbsp;FTC Team #25491</div></div><div style={{ height: 6, width: "100%", background: "#ff6a00" }} /></div>, size);
}
