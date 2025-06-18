import { useState } from 'react';

export default function MenuToggleProvider({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function menuSwitch() {
    setIsMenuOpen((prev) => !prev);
  }

  return children({ isMenuOpen, menuSwitch });
}