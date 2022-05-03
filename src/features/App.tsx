import { VoidFunctionComponent } from "react";

import { Header, SideMenu, Main } from ".";

type AppProps = {};

export const App: VoidFunctionComponent<AppProps> = (props) => {
  return (
    <main className="fixed inset-0 w-screen h-screen flex flex-col">
      <Header />
      <div className="flex flex-grow">
        <SideMenu />
        <Main />
      </div>
    </main>
  );
};
