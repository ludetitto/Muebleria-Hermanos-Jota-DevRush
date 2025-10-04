import React from "react";

export default function Banner({ titulo, ariaLabel, children }) {
  return (
    <section
      className="banner"
      data-bg="dark"
      aria-labelledby={ariaLabel || "banner-principal"}
    >
      <h1 className="titulo-principal" id={ariaLabel || "banner-principal"}>
        {titulo}
      </h1>
      {children}
    </section>
  );
}
