import React, { useEffect, useState } from "react";
import VideosTab from "./VideosTab";
import CompaniesTab from "./CompaniesTab";
import CountriesTab from "./CountriesTab";
import SeasonsTab from "./SeasonsTab";

interface ITab {
  tabTitle: string | null;
  tabContent: object | null;
}

const initTabs = [
  {
    tabTitle: null,
    tabContent: null,
  },
];

const Tabs = (props: any) => {
  const [tabs, setTabs] = useState<ITab[]>(initTabs);
  const [tabIndex, setTabIndex] = useState<number>(0);

  const onClickTab = (index: number) => {
    setTabIndex(index);
  };

  useEffect(() => {
    const videoTab: ITab = {
      tabTitle: "Videos",
      tabContent: <VideosTab videos={props.videos} />,
    };
    setTabs([videoTab]);
    setTabs((prevTabs) => [
      ...prevTabs,
      {
        tabTitle: "Companies",
        tabContent: <CompaniesTab companies={props.companies} />,
      },
    ]);
    setTabs((prevTabs) => [
      ...prevTabs,
      {
        tabTitle: "Countries",
        tabContent: <CountriesTab countries={props.countries} />,
      },
    ]);
    if (props.seasons !== null) {
      setTabs((prevTabs) => [
        ...prevTabs,
        {
          tabTitle: "Seasons",
          tabContent: <SeasonsTab seasons={props.seasons} />,
        },
      ]);
    }
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <ul
        className="w-full flex flex-row justify-around"
        style={{ height: "12%" }}
      >
        {tabs.map((tab, index) => (
          <li
            key={index}
            onClick={() => onClickTab(index)}
            className={`w-full flex justify-center items-center bg-black rounded-md cursor-pointer ${
              index === 1 ? `mx-1` : ``
            } ${
              tabIndex === index
                ? `opacity-100 bg-opacity-100`
                : `opacity-50 bg-opacity-50`
            }`}
          >
            {tab.tabTitle}
          </li>
        ))}
      </ul>
      <div className="w-full overflow-y-auto" style={{ height: "88%" }}>
        {tabs[tabIndex].tabContent}
      </div>
    </div>
  );
};

export default Tabs;
