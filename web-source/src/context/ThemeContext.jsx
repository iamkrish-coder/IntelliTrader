import React, { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

const ThemeContextProvider = (props) => {
  const body = document.querySelector("body");
  const [background, setBackground] = useState({ value: "light", label: "Light", });
  const [sidebarLayout, setSidebarLayout] = useState({ value: "vertical", label: "Vertical", });
  const [navigationHader, setNavigationHader] = useState("color_3");
  const [haderColor, setHaderColor] = useState("color_3");
  const [sideBarStyle, setSideBarStyle] = useState({ value: "full", label: "Full", });
  const [sidebarColor, setSidebarColor] = useState("color_1");
  const [sidebarposition, setSidebarposition] = useState({ value: "fixed", label: "Fixed", });
  const [headerposition, setHeaderposition] = useState({ value: "fixed", label: "Fixed", });
  const [direction, setDirection] = useState({ value: "ltr", label: "LTR" });
  const [containerPosition_, setcontainerPosition_] = useState({ value: "wide", label: "Wide", });
  const [primaryColor, setPrimaryColor] = useState("color_1");
  const [iconHover, setIconHover] = useState(false);
  const [sidebariconHover, setSidebariconHover] = useState(false);
  const [menuToggle, setMenuToggle] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [headWallet, setHeadWallet] = useState(false);

  // layout
  const layoutOption = [
    { value: "vertical", label: "Vertical" },
    { value: "horizontal", label: "Horizontal" },
  ];
  const sideBarOption = [
    { value: "compact", label: "Compact" },
    { value: "full", label: "Full" },
    { value: "mini", label: "Mini" },
    { value: "modern", label: "Modern" },
    { value: "overlay", label: "Overlay" },
    { value: "icon-hover", label: "Icon-hover" },
  ];
  const backgroundOption = [
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
  ];
  const sidebarpositions = [
    { value: "fixed", label: "Fixed" },
    { value: "static", label: "Static" },
  ];
  const headerPositions = [
    { value: "fixed", label: "Fixed" },
    { value: "static", label: "Static" },
  ];
  const containerPosition = [
    { value: "wide-boxed", label: "Wide Boxed" },
    { value: "boxed", label: "Boxed" },
    { value: "wide", label: "Wide" },
  ];
  const colors = [
    "color_1",
    "color_2",
    "color_3",
    "color_4",
    "color_5",
    "color_6",
    "color_7",
    "color_8",
    "color_9",
    "color_10",
    "color_11",
    "color_12",
    "color_13",
    "color_14",
    "color_15",
  ];
  const directionPosition = [
    { value: "ltr", label: "LTR" },
    { value: "rtl", label: "RTL" },
  ];
  const fontFamily = [
    { value: "poppins", label: "Poppins" },
    { value: "roboto", label: "Roboto" },
    { value: "opensans", label: "Open Sans" },
  ];
  const changePrimaryColor = (name) => {
    setPrimaryColor(name);
    body.setAttribute("data-primary", name);
  };
  const changeNavigationHader = (name) => {
    setNavigationHader(name);
    body.setAttribute("data-nav-headerbg", name);
  };
  const chnageHaderColor = (name) => {
    setHaderColor(name);
    body.setAttribute("data-headerbg", name);
  };
  const chnageSidebarColor = (name) => {
    setSidebarColor(name);
    body.setAttribute("data-sidebarbg", name);
  };
  const changeSideBarPostion = (name) => {
    setSidebarposition(name);
    body.setAttribute("data-sidebar-position", name.value);
  };
  const changeDirectionLayout = (name) => {
    setDirection(name);
    body.setAttribute("direction", name.value);
    let html = document.querySelector("html");
    html.setAttribute("dir", name.value);
    html.className = name.value;
  };
  const changeSideBarLayout = (name) => {
    if (name.value === "horizontal") {
      if (sideBarStyle.value === "overlay") {
        setSidebarLayout(name);
        body.setAttribute("data-layout", name.value);
        setSideBarStyle({ value: "full", label: "Full" });
        body.setAttribute("data-sidebar-style", "full");
      } else {
        setSidebarLayout(name);
        body.setAttribute("data-layout", name.value);
      }
    } else {
      setSidebarLayout(name);
      body.setAttribute("data-layout", name.value);
    }
  };
  const changeSideBarStyle = (name) => {
    if (sidebarLayout.value === "horizontal") {
      if (name.value === "overlay") {
        alert("Sorry! Overlay is not possible in Horizontal layout.");
      } else {
        setSideBarStyle(name);
        setIconHover(name.value === "icon-hover" ? "_i-hover" : "");
        body.setAttribute("data-sidebar-style", name.value);
      }
    } else {
      setSideBarStyle(name);
      setIconHover(name.value === "icon-hover" ? "_i-hover" : "");
      body.setAttribute("data-sidebar-style", name.value);
    }
  };

  const ChangeIconSidebar = (value) => {
    if (sideBarStyle.value === "icon-hover") {
      if (value) {
        setSidebariconHover(true);
      } else {
        setSidebariconHover(false);
      }
    }
  }

  const changeHeaderPostion = (name) => {
    setHeaderposition(name);
    body.setAttribute("data-header-position", name.value);
  };

  const openMenuToggle = () => {
    sideBarStyle.value === "overly"
      ? setMenuToggle(true)
      : setMenuToggle(false);
  };

  const changeBackground = (name) => {
    body.setAttribute("data-theme-version", name.value);
    setBackground(name);
  };

  const changeContainerPosition = (name) => {
    setcontainerPosition_(name);
    body.setAttribute("data-container", name.value);
    name.value === "boxed" &&
      changeSideBarStyle({ value: "overlay", label: "Overlay" });
  };


  useEffect(() => {
    const body = document.querySelector("body");
    // body.setAttribute("data-typography", "poppins");
    // body.setAttribute("data-theme-version", "light");
    // body.setAttribute("data-layout", "vertical");
    // body.setAttribute("data-nav-headerbg", "color_3");
    // body.setAttribute("data-headerbg", "color_3");
    // body.setAttribute("data-sidebar-style", "full");
    // body.setAttribute("data-sidebarbg", "color_1");    
    // body.setAttribute("data-sidebar-position", "fixed");
    // body.setAttribute("data-header-position", "fixed");
    // body.setAttribute("data-container", "wide");
    // body.setAttribute("direction", "ltr");
    // body.setAttribute("data-primary", "color_1");

    let resizeWindow = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
      window.innerWidth >= 768 && window.innerWidth < 1024
        ? body.setAttribute("data-sidebar-style", "mini")
        : window.innerWidth <= 768
          ? body.setAttribute("data-sidebar-style", "overlay")
          : body.setAttribute("data-sidebar-style", "full");
    };
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        body,
        sideBarOption,
        layoutOption,
        backgroundOption,
        sidebarposition,
        headerPositions,
        containerPosition,
        directionPosition,
        fontFamily,
        primaryColor,
        navigationHader,
        windowWidth,
        windowHeight,
        changePrimaryColor,
        changeNavigationHader,
        changeSideBarStyle,
        sideBarStyle,
        changeSideBarPostion,
        sidebarpositions,
        changeHeaderPostion,
        headerposition,
        changeSideBarLayout,
        sidebarLayout,
        changeDirectionLayout,
        changeContainerPosition,
        direction,
        colors,
        haderColor,
        chnageHaderColor,
        chnageSidebarColor,
        sidebarColor,
        iconHover,
        ChangeIconSidebar,
        sidebariconHover,
        menuToggle,
        openMenuToggle,
        changeBackground,
        background,
        containerPosition_,
        headWallet,
        setHeadWallet,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;