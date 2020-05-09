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
import {Router, Scene, Tabs, Lightbox, Modal, Actions,BackHandler} from "react-native-router-flux";
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
import DongTaiLike from './components/Like'
import Music from './components/MusicHall'
import Search from './components/Search'
import CustomScrollView from './components/CustomScrollView'
import CustomTabBar from './components/CustomTabBar'
import SongList from './components/SongList'
import SongNav from './components/SongNav'
import Publish from './components/Publish'
import Login from './components/Login'
import Register from './components/Register'
import Songword from './components/Songword'
import AddSong from './components/AddSong'
import RedAlert from './components/RedAlert'
import OverLike  from './components/OverLike'
import UserInfo  from './components/UserInfo'

const App = () => {  
  return (
    <>
      <Router
      backAndroidHandler={()=>{
        if(Actions.currentScene != 'home'){
          Actions.pop();
          return true;
        }else{
          if(new Date().getTime()-now<2000){
            BackHandler.exitApp();
          }else{
            ToastAndroid.show('确定要退出吗',100);
            now = new Date().getTime();
            return true;
          }
        }
        
      }}
      >
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
              <Scene key = "songword" component={Songword} hideTabBar  hideNavBar/>
            </Scene>
            <Scene key="recommend" title="推荐" 
            icon={()=><Icon name = 'find' size = {30}/>}
            hideNavBar
            >
              <Scene key = "Recommend" component={Recommend}/>  
            </Scene>
            <Scene key="condition" title="动态" 
            icon={()=><Icon name = 'eye' size = {30}/>}
            hideNavBar
            >
              <Scene key = "Condition" component={Condition}/>
              <Scene key = "dongTai" component={Dongtai}/>
              <Scene key = "dongTaiLike" component={DongTaiLike}/>
              <Scene key="CustomScrollView" component={CustomScrollView} />
              <Scene key="RedAlert" component={RedAlert} />
              <Scene key="OverLike" component={OverLike} />
            </Scene>
            <Scene key="my" title="我的"  
            icon={()=><Icon name = 'user' size = {30}/>}
            >
              <Scene key = "My" component={My}  navBar={()=><NavBar />}/>
              <Scene key = "moreInfo" component={MoreInfo}  title='更多' hideTabBar  />
              <Scene key = "manage" component={Manage}  title='歌单管理' hideTabBar  />
              <Scene key = "like" component={MyLike}  title='我喜欢' hideTabBar  />
              <Scene key = "recent" component={Recent}  title='最近播放' hideTabBar  />
              <Scene key = "download" component={Local}  title='本地歌曲' hideTabBar />
              <Scene key = "buy" component={Buied}  title='已购' hideTabBar/>
              <Scene key = "addsong" component={AddSong}  title='歌曲管理' hideTabBar/>
              <Scene key = 'login' component = {Login} hideNavBar hideTabBar/>      
              <Scene key = 'register' component = {Register} hideNavBar hideTabBar/>      
              <Scene key = 'userinfo' component = {UserInfo}  hideTabBar title = '我的资料'/>      
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
