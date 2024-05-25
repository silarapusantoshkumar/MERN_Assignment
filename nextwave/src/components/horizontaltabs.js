import React, {useState} from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Resources from "./resources";
import Request from "./request";
import Users from "./users";
import Search from "./search";
import './tabs.css';
export default function Horizontaltabs() {

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <Tabs >
        <div class='tabs_main'>
        <section class="tabs_header">
        <div class="tabs_headings">
            <TabList>
              <Tab>Resources</Tab>
              <Tab> Requests</Tab>
              <Tab> Users</Tab>
            </TabList>
        </div>
        <div class="tabs_search">
        <Search searchTerm={searchTerm} handleSearchChange={handleSearchChange}/>
        </div>
      </section>

    <section class="tabs_body">
         <TabPanel>
          <Resources searchTerm={searchTerm}/>
        </TabPanel>

        <TabPanel>
          <Request searchTerm={searchTerm} />
        </TabPanel>

        <TabPanel>
          <Users searchTerm={searchTerm} />
        </TabPanel>

    </section>
       
        </div>
      

      </Tabs>
    </>
  );
}
