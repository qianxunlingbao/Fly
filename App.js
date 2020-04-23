/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React,{useState,useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  BackHandler,
  ToastAndroid,
  AsyncStorage,
  Text,
  StatusBar,
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

import SplashScreen from 'react-native-splash-screen';

import Recommend from './components/Recommend';

import CustomScrollView from './components/CustomScrollView';

import Piano from './components/Piano';

import Person from './components/Person';

import Dongtai from './components/Dongtai';

import Like from './components/Like';

import TeOne from './components/TeOne';

import FirstOne from './components/FirstOne';

import One from './components/Fabu';

import Home from './src/home/Home';

import Goods from './src/goods/Goods';

import Userinfo from './src/userinfo/Userinfo';

import Login from './src/common/Login'

import Zhuce from './src/common/Zhuce'

import SwiperPage from './src/common/SwiperPage'

console.disableYellowBox = true;

const App = () => {
	let [isLogin,setLogin] = useState(false);
	let [isInstall,setInstall] = useState(true);
	let now = 0;
	let init = ()=>{
		AsyncStorage.getItem('isInstall')
		.then(res=>{
			console.log('isinstall',res)
			if(res){
				setInstall(false);
				SplashScreen.hide();
			}
		})
		AsyncStorage.getItem('user')
		.then(res=>{
			let user = JSON.parse(res)
			console.log(user)
			if(!user){
				SplashScreen.hide();
			}
			if(user&&user.token){
				setLogin(true);
				SplashScreen.hide();
			}
		})
	}
	useEffect(()=>{
		init();
	},[])
	let afterInstall = ()=>{
		console.log('after install')
		setInstall(false)
	}
	if(isInstall){
		return <View style={{flex:1}}>
			<SwiperPage afterInstall={afterInstall}/>
		</View>
	}
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
								{/* 首页 */}
								{/*<Scene key='homePage'
									title='首页'
									icon={
										({focused})=><Icon 
											color={focused?'red':'blue'} 
                      name="home"
                      size={30}
										/>
									}
								>
									<Scene key='home' hideNavBar={true} component={FirstOne}/>
								</Scene>*/}

								{/* 商品分类栏 */}
								{/*<Scene key='goodsPage'
									hideNavBar={true}
									title='商品分类'
									icon={
										({focused})=><Icon 
											color={focused?'red':'blue'} 
                      name="file"
                      size={30}
										/>
									}
									component={TeOne}
								/>*/}
								{/* 购物车栏 */}
								{/*<Scene 
									hideNavBar={true}
									key='login1'
									title='我的发布'
									icon={({focused})=>
										<Icon 
											color={focused?'red':'blue'} 
											name='file'
											size={30}
										/>
									}
									component={One}
								/>*/}
								
								{/* 个人中心栏 */}
								{/*<Scene 
									key='userPage'
									hideNavBar={true}
									icon={({focused})=>
										<Icon 
											color={focused?'red':'blue'} 
                      name='file'
                      size={30}
										/>
									}
									title="个人中心"
									component={Person}
								/>*/}
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
				<Scene initial={!isLogin} key="login" component={Login} />
				<Scene key="fabu" component={One} />	
				<Scene key="zhuce" component={Zhuce} />	
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
