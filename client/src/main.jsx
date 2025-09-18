import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import WorkflowEditor from "./pages/WorkflowEditor.tsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WorkflowEditor />
  </StrictMode>
);
