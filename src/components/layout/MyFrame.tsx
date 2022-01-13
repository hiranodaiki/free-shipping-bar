import { Frame } from "@shopify/polaris";
import useNavActive from "@/hooks/useNavActive";
import MyNavigation from "@/components/uiGroup/MyNavigation";
import MyTopBar from "@/components/uiGroup/MyTopBar";

type MyFrameProps = {
  children: React.ReactNode;
};

const MyFrame = ({ children }: MyFrameProps) => {
  const { navActive, toggleNavActive } = useNavActive();

  return (
    <Frame
      topBar={<MyTopBar toggleNavActive={toggleNavActive} />}
      showMobileNavigation={navActive}
      onNavigationDismiss={toggleNavActive}
      navigation={<MyNavigation />}
    >
      {children}
    </Frame>
  );
};

export default MyFrame;
