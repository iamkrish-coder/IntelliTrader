 import React from "react";

const Footer = () => {
  var d = new Date();
  return (
    <div className="footer">
      <div className="copyright">
        <p>
          Copyright © {d.getFullYear()} {" "}
          <a href="https://github.com/iamkrish-coder" target="_blank" rel="noreferrer">
            iamkrish-coder
          </a>{" "}
        </p>
      </div>
    </div>
  );
};

export default Footer;
