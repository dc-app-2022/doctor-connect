import React, { createContext, useState, useEffect } from "react";

const AppState = createContext({});

const AppStateProvider = (props: any) => {
  const [curPageTitle, setCurPageTitle] = useState("Home");
  useEffect(() => {}, []);

  const setPageTitle = (pageTitle: string) => {
    setCurPageTitle(pageTitle);
    const title: HTMLElement | any = document.querySelector("title");
    title.innerHTML = pageTitle as string;
  };

  const appStateValue: { curPageTitle: string; setPageTitle: Function } = {
    curPageTitle,
    setPageTitle,
  };

  return <AppState.Provider value={appStateValue} {...props} />;
};

const useAppState: any = () => React.useContext(AppState);

export { AppStateProvider, useAppState };
