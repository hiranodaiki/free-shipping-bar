import { TopBar } from "@shopify/polaris";

type MyTopBarProps = {
  toggleNavActive: () => void;
};

const MyTopBar = ({ toggleNavActive }: MyTopBarProps) => {
  return <TopBar showNavigationToggle onNavigationToggle={toggleNavActive} />;
};

export default MyTopBar;
