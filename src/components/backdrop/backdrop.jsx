import "./backdrop.styles.scss";

import React, { useEffect, useRef } from "react";

export default function Backdrop({ children }) {
  const backdropRef = useRef(null);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    backdropRef.current.style.overflowY = "scroll";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="popup-backdrop" ref={backdropRef}>
      {children}
    </div>
  );
}
