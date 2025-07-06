import React, { useState } from 'react';
import { Container, Nav, Tab } from 'react-bootstrap';

import Tab1 from './components/EMICalc';
 import Tab2 from './components/Tab2';
 import Tab3 from './components/Tab3';
 import Tab4 from './components/Tab4';
 import NTracker from './components/NTracker';
 import RBirth from './components/RBirth';
 import Utilities from './components/Utilities';

  import MemoryPalaceApp from './components/MemoryPalaceApp';
   import DaxJavaCrud from './components/DaxJavaCrud';
   import DelimiterJsonTool from './components/DelimiterJsonTool';
      import JsonViewerSearchable from './components/JsonViewerSearchable';




const tabList = [

        { key: 'JsonViewerSearchable', title: 'JsonViewerSearchable', component: <JsonViewerSearchable /> },

     { key: 'DelimiterJsonTool', title: 'DelimiterJsonTool', component: <DelimiterJsonTool /> },

     { key: 'NTracker', title: 'NTracker', component: <NTracker /> },

          { key: 'DaxJavaCrud', title: 'DaxJavaCrud', component: <DaxJavaCrud /> },

     
     
     { key: 'Utilities', title: 'Utilities', component: <Utilities /> },
      { key: 'MemoryPalaceApp', title: 'MemoryPalaceApp', component: <MemoryPalaceApp /> },

            // { key: 'MemoryPalace', title: 'MemoryPalace', component: <MemoryPalaceApp /> },


  { key: 'tab1', title: 'EMI calculator', component: <Tab1 /> },
  // { key: 'tab2', title: 'Events', component: <Tab2 /> },
  { key: 'tab3', title: 'Essay Quiz', component: <Tab3 /> },
    // { key: 'tab4', title: 'Thoughts Bucket', component: <Tab4 /> },
  
    //       { key: 'RBirth', title: 'RBirth', component: <RBirth /> },

];

function App() {
  return (
    <Container className="mt-4">
      <Tab.Container defaultActiveKey="tab1">
        <Nav variant="tabs">
          {tabList.map(tab => (
            <Nav.Item key={tab.key}>
              <Nav.Link eventKey={tab.key}>{tab.title}</Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
        <Tab.Content className="mt-3">
          {tabList.map(tab => (
            <Tab.Pane key={tab.key} eventKey={tab.key}>
              {tab.component}
            </Tab.Pane>
          ))}
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
}

export default App;
