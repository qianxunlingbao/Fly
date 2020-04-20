//tsx
import React ,{Component} from 'react';
import {Text,View} from 'react-native';
import Home from './Piano';

//基础类型正确与否 声明变量
//number boolean string
const str = 'abc';
let num:number = 100;
let nu:number = '100';//报错，提示不能将类型'100',赋值给number类型,仍然可以运行
//数组
let arr:Array<string> = ['1',2];
let brr:Array<number> = ['1',2];
let crr:string[] = ['aaa','bbb'];
//对象
let obj:object = {name:'zhangsan'}
let obj1:{name:string} = {name:'zhangsan'}
//元组
let tupleArr:[string,number,boolean] = ['ss',2,true];//数组内数据类型不一致
//枚举enum
enum Lev {one='青铜',two='白银',three='黄金',four='铂金'}//等级
let myLev:Lev = Lev.one;
console.log(myLev);
//any任意类型
let a:any = 'any type';

//接口
//关键字:interface:描述一个对象的取值规范,不实现具体的对象
//属性接口
interface user{
    name:string,
    age:number,
    sex:string,
    [propName:string]:any
}
let uer : user={
    name:'baobao',
    age:100,
    sex:'nan'
}
//函数接口
interface MyFunc{
    (parans1:string):boolean
}
let fun:MyFunc= function(parans1:string){//传入参数，类型一致

    return true;//函数必须有最后的返回
}

//普通函数声明
function fun1(pa1:string,pa2:number):boolean{

    return true;
}
fun1(12,3)//字符串类型

//类接口
interface User1{
    age:number
}
//继承(关键字extends)
//接口继承接口
interface person extends User1{
    name:string
}

class User2 implements User1{//implements关键字，实现
    name='zhangsan';
    age=100
}
console.log(new User2())
//接口继承类
interface User3 extends User2{
    work:string
}
let u:User3={

}
//类型断言：可以确定的指定一个值的类型
//形式：
//<Type>值，在jsx中不能用
//值 as 类型
//let u1:User3={......}
let u1 = {} as User3;
u1.work = 'ble';
u1.name = 'zhangbao'

//联合类型 或者 any类型
function getLength(p1:string|number):number{
    return (p1 as string).length
}

//类实现接口，不能继承

interface Props{
    name:string;
    data:{
        id:string,
        title:string
    }
}//引入MyTsx时，需要传入一个props
//<MyTsx props=""/>

//类
//es5方法
//function Person(name:string,age:number){
//    this.name = name;
//    this.age = age;
//}
//let user = new Person('zhang',30);
//console.log(user);
class Person{
    //访问
    protected name:string;
    //private name:string;私有
    age:number;
    constructor(name:string,age:number){
        this.name = name;
        this.age = age;
    }
    sayNmae(){

    }
}
let user = new Person('zang',18);

//类继承类
class Worker extends Person{
    //静态属性
    static money:number;
    private job:string='程序员';
    constructor(job:string,name:string,age:number){
        super(name,age)
        this.job = job;
    }
}
Worker.money = 1000;
let user0 = new Worker('zafa','zdafa',13);
console.log(user0.job)//私有不能调用



interface State{
    title:string
}





//泛型 是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。
//使用泛型来创建可重用的组件，一个组件可以支持多种类型的数据
//泛型函数
function identity<T>(arg:T):T{
    return arg;
}
console.log(identity<string>('params1'))
identity<number>(10)
function getMsg<T>(msg:any):any{
    return 'msg';
}
console.log(getMsg(100))
//泛型接口
interface GenericIdentityFn<T>{
    (arg:T):T;
}
let myIdentity : GenericIdentityFn<number> = identity;
let myIdentity1 : GenericIdentityFn<number> = function(arg){
    return 100;
};
console.log(myIdentity1(100));
console.log(myIdentity1('ss'));

//泛型类
class AddData<T>{
    list:T[] = [];
    add(data:T):T[]{
        this.list.push(data);
        return this.list;
    }
}
let datal  = new AddData<number>()
datal.list.push(1)

//装饰器
//装饰器是一种特殊类型的声明，它能够被附加到类声明、方法、属性、或参数上。装饰器使用`@expression`这种形式，expression求值后必须为一个函数，他会在运行时被调用，被装饰得声明信息作为参数传入
//装饰器其实就是一个函数，在函数里可以写一些新的逻辑
//包裹后面修饰的内容，将新的逻辑传递到被修饰的内容中去
//高级组件--其实就是一个函数，就是装饰器
//@expr语法其实就是语法糖
// 普通装饰器（无参数）
function helloWord(target: any) {
    console.log('hello Word!');
}
@helloWord
class HelloWordClass {
    sayHello(){

    }
}

class Server{
    login(){
        fetch()
    }
}
function addUrl(target:any){
    target.prototype.url = 'https://'
}
@addUrl
class HomeServer{
    url:string|undefined
    getData(){
        console.log(this.url)
    }   
}
let home = new HomeServer();
home.getData()
class UserServer{
    getInfo(){
        
    }
}

//带参数的装饰器

//类装饰器
//参数是类的构造函数
//如果类装饰器返回一个值，它会使用提供的构造函数来替换类的声明
function addUrl1(url:string){
    return function(target:any){//这才是装饰器
        target.prototype.url = url;
        return class extends target{
            name:string = 'hh'
        }
        //return class Demo{
        //    name:string = 'hh'
        //}
    }
}
@addUrl1('http://www.baidu.com')
class HomeServer1{
    url:string|undefined;
    getData(){
        console.log(this.url)
        console.log(this.name)
    }
}
let ho = new HomeServer1();
ho.getData()

function setStatuBar(color:string){
    return function(WrapComponent:any){
        return class extends Component{
            render(){
                return(
                    <>
                        <View style={{height:30,backgroundColor:color}}>

                        </View>
                        <WrapComponent />
                    </>
                )
            }
        }
    }
}
@setStatuBar('red')
export default class MyTsx extends Component<Props,State>{
    //export default class MyTsx extends Component{
        constructor(props:Props){
            super(props);
            this.state = {
                title:'typescript'
            }
        }
        componentDidMount(){
            this.setState({title:100})
            this.setState({title:'100'})
        }
        render(){
            return (
                <View>
                    <Text>textInComponent{num}</Text>
            <Text>textInComponent{crr}{obj1.name}</Text>
                </View>
            )
        }
    }



//方法装饰器
function enumerable(value: boolean) {
    console.log('enum call')
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log('enum  dec call')
        descriptor.enumerable = value;
    };
}
function log(target:any,methodName:string,des:PropertyDescriptor){
    console.log('log call')
    var oldVal = des.value;
    des.value = function(){
        console.log(methodName+'被调用')
        return oldVal.apply(this);
    }
}
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }

    @enumerable(false)
    @log
    greet(msg:string) {
        return "Hello, " + this.greeting + msg;
    }
}		
new Greeter('world').greet()
console.log(new Greeter('world').greet() )

let msg = new Greeter('world').greet();
console.log(msg)


//属性装饰器
function DefaultValue(value: string) {
    return function (target: any, propertyName: string) {
        target[propertyName] = value;
    }
}

class Hello {
    @DefaultValue("Hello")
    greeting: any;
}

console.log('属性装饰器'+new Hello().greeting);

//参数装饰器
//参数装饰器表达式会在运行时当作函数被调用，传入下列3个参数：
//对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
//成员的名字。
//参数在函数参数列表中的索引。
greet(msg:string,@log p1:number,p2:number) {
    return "Hello, " + this.greeting;
}


//装饰器组合
//一次调用，由上到下