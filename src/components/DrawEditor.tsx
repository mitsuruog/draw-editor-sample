import * as React from "react";

type DrawEditorProps = {};

export const DrawEditor: React.VoidFunctionComponent<DrawEditorProps> = (
  props
) => {
  return (
    <iframe
      id="drawer-editor"
      className="flex-grow"
      frameBorder={0}
      src="https://embed.diagrams.net/"
    />
  );
};
