/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React,{useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
  TextInput
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Icon} from '@ant-design/react-native';
import {Router, Scene, Tabs, Lightbox} from "react-native-router-flux";
import Music from './components/Music'
import Recommend from './components/Recommend'
import Condition from './components/Condition'
import My from './components/My'
import NavBar from './components/NavBar'
import MoreInfo from './components/MoreInfo'
import Manage from './components/Manage'
import Buied from './components/Buied'
import MyLike from './components/MyLike'
import Local from './components/Local'
import Recent from './components/Recent'

const App = () => {
  const [value,setValue]= useState('正在热搜:李宇春新歌');
  return (
    <>
      <Router>
        <Scene key = 'root'>
        <Tabs key='tabbar'
            hideNavBar
          >
            <Scene key="music" 
            title="音乐馆" 
            icon={()=><Icon name = 'home'/>}
            hideNavBar>
              <Scene key = "Music" component={Music} />
            </Scene>
            <Scene key="recommend" title="推荐" hideNavBar>
              <Scene key = "Recommend" component={Recommend}/>  
            </Scene>
            <Scene key="condition" title="动态" hideNavBar>
              <Scene key = "Condition" component={Condition}/>
            </Scene>
            <Scene key="my" title="我的" initial={true} 
            >
              <Scene key = "My" component={My}  navBar={()=><NavBar value = {value}/>}/>
              <Scene key = "moreInfo" component={MoreInfo}  title='更多' hideTabBar/>
              <Scene key = "like" component={MyLike}  title='我喜欢' hideTabBar/>
              <Scene key = "recent" component={Recent}  title='最近播放' hideTabBar/>
              <Scene key = "download" component={Local}  title='本地歌曲' hideTabBar/>
              <Scene key = "buy" component={Buied}  title='已购' hideTabBar/>
            </Scene>
          </Tabs>          
          </Scene>
      </Router>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
