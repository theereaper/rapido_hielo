import React from "react";

type Props = {
  children: React.ReactNode;
  width?: number;
};

export const CardBackgrounSection = ({ children, width = 512 }: Props) => {
  return (
    <section className="flex flex-col justify-between min-h-screen px-6 bg-primary-soft">
      <div></div>

      {/* Card */}
      <div
        className="flex flex-col my-4 justify-start lg:justify-center w-full mx-auto z-10
        bg-white px-5 sm:px-10 py-5 rounded-xl"
        style={{
          boxShadow: "0 4px 130px rgba(150,163,181,.3)",
          maxWidth: width,
        }}
      >
        {children}
      </div>

      <div></div>
    </section>
  );
};
