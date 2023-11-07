import React from "react";

import { Logo, ModeSwitch, Profile } from ".";

const Header = React.memo(() => {
  return (
    <header className="hbox items-center h(100) z(99) gap(auto)">
      <Logo />
      <div className="hbox gap(20)">
        <ModeSwitch />
        <Profile />
      </div>
    </header>
  );
});

Header.displayName = "Header";

export default Header;
