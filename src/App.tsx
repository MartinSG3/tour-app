// Code based on TDSGram Lecture (TDS200-1 20H), reused and reworked from: Andreas Biørn-Hansen.  
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { NhostAuthProvider, NhostApolloProvider } from 'react-nhost';
import Home from './pages/Home';
import Maps from './pages/Maps';
import Detail from './pages/Detail';
import NewPost from './pages/NewPost';
import { calendar, map, addCircleOutline } from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { auth } from './utils/nhost';
import PrivateRoute from './components/PrivateRoute';

const App = () => (
  <NhostAuthProvider auth={auth}>
    <NhostApolloProvider auth={auth} gqlEndpoint={/* backend nhost url */}>
      <IonApp>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/home" component={Home} exact={true} />
              <Route path="/login" component={Login} exact={true} />
              <Route path="/signUp" component={SignUp} exact={true} />
              <Route path="/maps" component={Maps} exact={true}/>
              <PrivateRoute path="/newpost" component={NewPost} exact={true} />
              <PrivateRoute path="/detail/:id" component={Detail} exact={true} />
              <Route exact path="/" render={() => <Redirect to="/login" />} />
            </IonRouterOutlet>
            {/* Making a tab-bar to navigate easier */}
            <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/home">
              <IonIcon icon={calendar} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab="newpost" href="/newpost">
              <IonIcon icon={addCircleOutline} />
              <IonLabel>Post</IonLabel>
            </IonTabButton>
            <IonTabButton tab="maps" href="/maps">
              <IonIcon icon={map} />
              <IonLabel>Maps</IonLabel>
            </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp>
    </NhostApolloProvider>
  </NhostAuthProvider>
);

export default App;
