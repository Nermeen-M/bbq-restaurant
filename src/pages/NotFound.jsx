import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <main id="page-not-found">
      <FontAwesomeIcon icon={solid("triangle-exclamation")} bounce />
      <h1>Page not found</h1>
      <button className="primary-button" onClick={() => navigate("/")}>
        Back to Home
      </button>
    </main>
  );
}
