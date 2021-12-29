import { ReactElement } from "react";
import "./PageFooter.scss";

export default function PageFooter(): ReactElement {
  return (
    <div className="page-footer">
      <p className="page-footer__text">
        &copy; InStock Inc. All Rights Reserved.
      </p>
    </div>
  );
}
