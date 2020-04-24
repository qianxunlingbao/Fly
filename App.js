/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
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

import Dongtai from './components/Dongtai';

import Like from './components/Like';


console.disableYellowBox = true;

const App = () => {
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
					
			</Modal>
			</Overlay>
		</Router>

  );
};

const styles = StyleSheet.create({
 
});

export default App;
