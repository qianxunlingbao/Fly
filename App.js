/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React,{useState,useEffect} from 'react';
import {
  StyleSheet,
  BackHandler,
  ToastAndroid,
} from 'react-native';
import {
  Router, 
  Overlay, 
  Scene, 
  Tabs, 
  Drawer, 
  Lightbox, 
  Modal,
  Actions
} from 'react-native-router-flux';

import Icon from 'react-native-vector-icons/FontAwesome';

import Recommend from './components/Recommend';

import CustomScrollView from './components/CustomScrollView';

import OverLike from './components/OverLike';

import Dongtai from './components/Dongtai';

import Like from './components/Like';

import SplashScreen from 'react-native-splash-screen';

import RedAlert from './components/RedAlert';


console.disableYellowBox = true;

const App = () => {
	useEffect(()=>{
		SplashScreen.hide();
	},[])
  return (
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
			<Overlay>
			<Modal key="modal" hideNavBar>
				<Lightbox key="lightbox">
					
						<Scene key="root">
							<Tabs 
								key='tabbar'
								hideNavBar
								activeTintColor="red"
								inactiveTintColor="black"
								tabBarStyle={{backgroundColor:'#fff'}}
							>
								<Scene 
									key='recommend'
									hideNavBar={true}
									icon={({focused})=>
										<Icon 
											color={focused?'red':'blue'} 
                      name='home'
                      size={30}
										/>
									}
									title="动态"
									component={Recommend}
								/>
							</Tabs>
						</Scene>
					
				</Lightbox>		
				<Scene key="dongtai" component={Dongtai} />	
				<Scene key="like" component={Like} />
				<Scene key="CustomScrollView" component={CustomScrollView} />
				<Scene key="RedAlert" component={RedAlert} />
				<Scene key="OverLike" component={OverLike} />
					
			</Modal>
			</Overlay>
		</Router>

  );
};

const styles = StyleSheet.create({
 
});

export default App;
