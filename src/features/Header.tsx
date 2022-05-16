import { VoidFunctionComponent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-regular-svg-icons";
import {
  faArrowRotateLeft,
  faArrowRotateRight,
  faTrashCan,
  faFillDrip,
  faPen,
} from "@fortawesome/free-solid-svg-icons";

type HeaderProps = {};

export const Header: VoidFunctionComponent<HeaderProps> = (props) => {
  return (
    <nav
      className="w-screen flex justify-between shrink-0 bg-slate-100 px-4 items-center border-b"
      style={{ height: "2rem" }}
    >
      <div className="flex gap-2">
        <FontAwesomeIcon icon={faArrowRotateLeft} />
        <FontAwesomeIcon icon={faArrowRotateRight} />
        <FontAwesomeIcon icon={faTrashCan} />
        <FontAwesomeIcon icon={faFillDrip} />
        <FontAwesomeIcon icon={faPen} />
      </div>
    </nav>
  );
};
