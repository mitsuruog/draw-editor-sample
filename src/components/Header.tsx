import * as React from "react";

type HeaderProps = {};

export const Header: React.VoidFunctionComponent<HeaderProps> = (props) => {
  return (
    <nav
      className="w-screen flex justify-between bg-slate-100 px-4 items-center border-b"
      style={{ height: "3rem" }}
    >
      <div className="flex items-center gap-4">
        <figure className="rounded-md">
          <img src="https://i.pravatar.cc/32" className="rounded-md" />
        </figure>
        <p>Draw Editor</p>
      </div>
      <div>
        <button className="bg-lime-500 hover:bg-lime-700 text-white py-1 px-4 rounded">
          Submit
        </button>
      </div>
    </nav>
  );
};
