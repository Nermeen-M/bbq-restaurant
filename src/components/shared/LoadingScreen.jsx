import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

export default function LoadingScreen() {
  return (
    <div className="loader">
      <FontAwesomeIcon icon={solid("spinner")} spin />
    </div>
  );
}
