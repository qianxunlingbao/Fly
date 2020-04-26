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
import Icon from 'react-native-vector-icons/FontAwesome';
import {Router, Scene, Tabs, Lightbox, Modal, Actions} from "react-native-router-flux";
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
import Dongtai from './components/Dongtai'
import Fabu from './components/Fabu'
import DongTaiLike from './components/Like'
import Music from './components/MusicHall'
import Search from './components/Search'
import CustomScrollView from './components/CustomScrollView'
import CustomTabBar from './components/CustomTabBar'
import SongList from './components/SongList'
import SongNav from './components/SongNav'
import Publish from './components/Publish'
const App = () => {
  const [value,setValue]= useState('正在热搜:李宇春新歌');
  return (
    <>
      <Router>
        <Scene key = 'root' >
        <Tabs key='tabbar'
            hideNavBar
          >
            <Scene key="music" 
            title="音乐馆" 
            icon={()=><Icon name = 'home' size = {30}/>}
            
           >
              <Scene key = "Music" component={Music} hideNavBar/>
              <Scene key = "search" component={Search} hideNavBar hideTabBar/>
              <Scene key = "songList" component={SongList} hideTabBar  hideNavBar/>
              <Scene key = "publish" component={Publish} hideTabBar  hideNavBar/>
            </Scene>
            <Scene key="recommend" title="推荐" 
            icon={()=><Icon name = 'carry-out' size = {30}/>}
            hideNavBar
            >
              <Scene key = "Recommend" component={Recommend}/>  
            </Scene>
            <Scene key="condition" title="动态" 
            icon={()=><Icon name = 'smile' size = {30}/>}
            hideNavBar
            >
              <Scene key = "Condition" component={Condition}/>
              <Scene key = "dongTai" component={Dongtai}/>
              <Scene key = "faBu" component={Fabu}/>
              <Scene key = "dongTaiLike" component={DongTaiLike}/>
              <Scene key="CustomScrollView" component={CustomScrollView} />
            </Scene>
            <Scene key="my" title="我的"  
            icon={()=><Icon name = 'user' size = {30}/>}
            >
              <Scene key = "My" component={My}  navBar={()=><NavBar value = {value}/>}/>
              <Scene key = "moreInfo" component={MoreInfo}  title='更多' hideTabBar  />
              <Scene key = "manage" component={Manage}  title='歌单管理' hideTabBar  />
              <Scene key = "like" component={MyLike}  title='我喜欢' hideTabBar  />
              <Scene key = "recent" component={Recent}  title='最近播放' hideTabBar  />
              <Scene key = "download" component={Local}  title='本地歌曲' hideTabBar />
              <Scene key = "buy" component={Buied}  title='已购' hideTabBar/>
            </Scene>
          </Tabs>          
          </Scene>
      </Router>
    </>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
