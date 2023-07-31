import React from "react";
import { Outlet } from "react-router";
import { Header } from "..";

type Props = {};

const BaseLayoutClient = (props: Props) => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default BaseLayoutClient;
