import React, { useState } from 'react';
import { Container, Nav, Tab } from 'react-bootstrap';

import Tab1 from './components/Tab1';
 import Tab2 from './components/Tab2';
 import Tab3 from './components/Tab3';
 import Tab4 from './components/Tab4';
 import NTracker from './components/NTracker';
 import RBirth from './components/RBirth';


const tabList = [
  { key: 'tab1', title: 'Tab 1', component: <Tab1 /> },
  { key: 'tab2', title: 'Tab 2', component: <Tab2 /> },
  { key: 'tab3', title: 'Tab 2', component: <Tab3 /> },
    { key: 'tab4', title: 'Tab 4', component: <Tab4 /> },
     { key: 'NTracker', title: 'NTracker', component: <NTracker /> },
          { key: 'RBirth', title: 'RBirth', component: <RBirth /> },

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
