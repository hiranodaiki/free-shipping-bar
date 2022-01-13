import { useRouter } from "next/router";
import { Navigation } from "@shopify/polaris";
import { HomeMajor, EmailMajor } from "@shopify/polaris-icons";

const MyNavigation = () => {
  const router = useRouter();

  const navItems = [
    {
      url: "/",
      label: "ダッシュボード",
      icon: HomeMajor,
      selected: router.pathname == "/",
      onClick: () => {
        router.push("/");
      },
    },
    {
      url: router.pathname,
      label: "お問い合わせ",
      icon: EmailMajor,
      selected: false,
      onClick: () => {
        window.open("https://reterior.jp/contact");
      },
    },
  ];

  return (
    <Navigation location="/">
      <Navigation.Section items={navItems} fill />
    </Navigation>
  );
};

export default MyNavigation;
