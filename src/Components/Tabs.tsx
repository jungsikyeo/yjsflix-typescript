import React, { useEffect, useState } from "react";
import { IVideo } from "../pages/Detail";
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
    if (props.seasons !== undefined) {
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
    <div className="flex">
      <ul className="">
        <>
          {tabs.map((tab, index) => (
            <li key={index} onClick={() => onClickTab(index)}>
              <div className={``}>{tab.tabTitle}</div>
            </li>
          ))}
        </>
      </ul>
      <div>{tabs[tabIndex].tabContent}</div>
    </div>
  );

  return (
    <div className="grid grid-cols-2 gap-10">
      {props.videos.map((video: any) => (
        <div className="bg-red-900">Video</div>
      ))}
    </div>
  );
};

export default Tabs;
