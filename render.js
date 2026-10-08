import mermaid from "mermaid";

mermaid.initialize({ startOnLoad: true });
console.log("Mermaid.js initalized")

// THIS function is really simple
// Just pass in the string containerID u want the diagram in and the string code u wanna render
// It will render the diagram in the provided containerID
// e.g. renderDiagram("DebugBox", code)
export async function renderDiagram(containerId, code) {
  const element = document.getElementById(containerId);
  
  // Example of repetitive mermaid logic
  const { svg } = await mermaid.render(`svg-${containerId}`, code);
  element.innerHTML = svg;
  
  console.log(`Diagram rendered in #${containerId}`);
}