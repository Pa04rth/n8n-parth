// Corrected Structure for SettingsPanel.tsx
import { AiNodeForm } from "../forms/AiNodeForm";
import { EmailNodeForm } from "../forms/EmailNodeForm";

export const SettingsPanel = ({ node }: { node: any }) => {
  let formContent = null;

  switch (node.type) {
    case "aiNode":
      // We need to pass the node data down to the form
      formContent = <AiNodeForm data={node.data} />;
      break;
    case "emailNode":
      formContent = <EmailNodeForm data={node.data} />;
      break;
    default:
      formContent = <p>No specific settings available for {node.type}</p>;
      break;
  }

  return (
    <div
      style={
        {
          /* Your container styles here ONCE */
        }
      }
    >
      <h2>Settings</h2>
      <hr />
      {formContent}
    </div>
  );
};
