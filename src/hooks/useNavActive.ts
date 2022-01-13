import { useState, useCallback } from "react";

type NavActive = {
  navActive: boolean;
  toggleNavActive: () => void;
};

const useNavActive = (): NavActive => {
  const [navActive, setNavActive] = useState(false);

  const toggleNavActive = useCallback(
    (): void => setNavActive((prevState) => !prevState),
    []
  );

  return {
    navActive,
    toggleNavActive,
  };
};

export default useNavActive;
