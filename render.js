import mermaid from "mermaid";

mermaid.initialize({
    startOnLoad: false,
    theme: "dark",
    themeVariables: {
        primaryColor: "#222222",       // Box background
        primaryTextColor: "#ffffff",   // Text inside boxes
        primaryBorderColor: "#888888", // Box outline
        lineColor: "#00bcd4"            // Arrow and line color
    }
});
console.log("Mermaid.js initalized")

// THIS function is really simple
// Just pass in the string containerID u want the diagram in and the string code u wanna render
// It will render the diagram in the provided containerID
// e.g. renderDiagram("DebugBox", code)
export async function renderDiagram(containerId, code) {
  const element = document.getElementById(containerId);
  try {
      const { svg } = await mermaid.render(
          `svg-${containerId}-${Date.now()}`,
          code
      );
      element.innerHTML = svg;

      console.log(`Diagram rendered in #${containerId}`);
  } catch (error) {
      console.error("Mermaid rendering failed:", error);
  }
  
}