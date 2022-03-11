import * as React from "react";

import { DrawEditor, Header, SideMenu } from ".";

type AppProps = {};

export const App: React.VoidFunctionComponent<AppProps> = (props) => {
  return (
    <main className="fixed inset-0 w-screen h-screen flex flex-col">
      <Header />
      <div className="flex flex-grow">
        <SideMenu />
        <DrawEditor />
      </div>
    </main>
  );
};
