import React, { useRef, useEffect } from "react";
import styles from "./Sidetray.module.scss";

function useOutsideAlerter(ref, callback) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

const Sidetray = ({ component: Component, status, data, toggle }) => {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, toggle);

  if (status) {
    return (
      <div
        className={`${styles.sidetray} ${status ? styles.active : ""}`}
        ref={wrapperRef}
      >
        <Component data={data} toggle={toggle} />
      </div>
    );
  } else {
    return (
      <div className={`${styles.sidetray}`}>
        <Component data={data} toggle={toggle} />
      </div>
    );
  }
};

export default Sidetray;
