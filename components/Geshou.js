import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Modal,
    TouchableOpacity,
    Dimensions,
    Image,
    Linking,
    ScrollView
} from 'react-native';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
const { width } = Dimensions.get('window');

export default class Geshou extends Component {
    render() {
        return (
            <View style={
                {
                    flex: 1,
                    //justifyContent: 'center',
                    //alignItems:'center'
                    backgroundColor:'white'
                }
            }>
                {/*头部*/}
                <View style={{
                    width: width,
                    height: width * 0.1,
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    borderBottomWidth:0.5,
                    borderBottomColor:'black'
                }}>
                    <View style={{
                        //width: width * 0.1, 
                        //height: width * 0.1
                    }}>
                        <TouchableOpacity onPress={() => Actions.pop()}>
                            <Text style={{
                                textAlign: "center",
                                fontSize: 25, marginTop: width * 0.01
                            }}>〈</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{}}>
                        <TouchableOpacity style={
                            {
                                marginLeft: width * 0.3
                            }
                        }
                            onPress={() =>
                                Linking.openURL('https://mr.baidu.com/r/ns12jyu?f=cp&u=2d1bf10f7c052540')
                            }
                        >
                            <Text selectable={true} style={{
                                fontSize: 30,
                                color: 'black',
                                textAlign: 'center'
                            }}>歌手详情</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView>
                <View style={
                    {
                        marginLeft: 20
                    }
                }>
                    <Text selectable={true} style={
                        {
                            fontSize: 21,
                            marginTop: 20
                        }
                    }>简介</Text>
                    <View style={
                        {
                            marginTop: 20
                        }
                    }>
                        <Text selectable={true} style={
                            {
                                //color:'#FFFFFF',
                                lineHeight:25
                            }
                        }>
                            刘瑞琦（Richael），1993年9月2日出生于安徽，中国内地创作女歌手。013年1月，因在雪地吉他弹唱《明明就》而走红网络受到关注；4月参加湖南卫视励志音乐类真人秀节目《中国最强音》，终晋级全国十二强;10月推出单曲《房间》;11月6日发行个人首张EP《私房歌》;12月推出歌曲《房间》MV 。
                            2014年5月17日荣获首座奖杯-首届中国新歌榜虾米音乐人推荐大奖；7月参加厦门草莓音乐节;9月11日，推出单曲《三度和弦》;9月25日发行第二张EP《早安，琦》。2015年2月5日推出歌曲《歌路》MV，5月28日推出单曲《初夏》，12月15日推出单曲《爱需要练习》。
                            2019年1月8日推出单曲《离开的借口》；4月29日，推出单曲《元气夏天》；8月1日，受邀演唱电视剧《小欢喜》同名主题曲《小欢喜》；10月22日，为欧莱雅创作歌曲《熬夜的100种理由》。
                        </Text>
                    </View>
                </View>
                <View style={
                    {
                        marginLeft: 20
                    }
                }>
                    <Text selectable={true} style={
                        {
                            fontSize: 21,
                            marginTop: 20
                        }
                    }>基本资料</Text>
                    <View style={
                        {
                            marginTop: 20
                        }
                    }>
                        <Text selectable={true} style={
                                {
                                    marginTop:10
                                }
                            }>
                            中文名：刘瑞琦
                        </Text>
                        <Text selectable={true} style={
                                {
                                    marginTop:10
                                }
                            }>
                            外文名：Richael
                        </Text>
                        <Text selectable={true} style={
                                {
                                    marginTop:10
                                }
                            }>
                            生日：9月2日
                        </Text>
                        <Text selectable={true} style={
                                {
                                    marginTop:10
                                }
                            }>
                            国籍：中国
                        </Text>
                        <Text selectable={true} style={
                                {
                                    marginTop:10
                                }
                            }>
                            民族：汉族
                        </Text>
                        <Text selectable={true} style={
                                {
                                    marginTop:10
                                }
                            }>
                            出生地：安徽
                        </Text>
                        <Text selectable={true} style={
                                {
                                    marginTop:10,
                                    lineHeight:25
                                }
                            }>
                            代表作品：《早安》、《歌路》、《房间》、《玩笑》、《Mr.Lovabla》、《每次和你走在路上都会看见一只喵》
                        </Text>
                        <Text selectable={true} style={
                                {
                                    marginTop:10
                                }
                            }>
                            学生、音乐人
                        </Text>
                        <Text selectable={true} style={
                                {
                                    marginTop:10
                                }
                            }>
                            毕业院校：杭州电子科技大学
                        </Text>
                    </View>
                </View>
                <View style={
                    {
                        marginLeft: 20
                    }
                }>
                    <Text selectable={true} style={
                        {
                            fontSize: 21,
                            marginTop: 20
                        }
                    }>从艺历程</Text>
                    <View style={
                        {
                            //marginTop: 20
                        }
                    }>
                        <Text selectable={true} style={
                                {
                                    marginTop:20,
                                    lineHeight:25
                                }
                            }>
                            2013年05月03日，《中国最强音》大众演唱会第二场，演唱《一样的夏天》和自己的原创歌曲《每次和你走在路上都会看见一只喵》脱颖而出，进入训练营之战；05月17日，《中国最强音》训练营之战，随机分组后和队员一起演唱罗大佑老师的《野百合也有春天》而成功晋级导师之家24强；05月18日，《中国最强音》导师之家，凭借自己改编陈奕迅的《爱是怀疑》成功晋级全国12强；05月24日，《中国最强音》最强联赛升降赛，演唱萧亚轩的《Cappuccino》成功晋级，进入冠军组；06月01日，《中国最强音》冠军战第一战，演唱《True love》，成功留在冠军组；06月08日，《中国最强音》冠军战第二场，一首《夏天的风》被降级，离开冠军组的舞台；06月21日，《中国最强音》逆袭战第四场，也就是最后一场逆袭战，虽没有逆袭成功，但是在随后演唱的《Payphone》成功吸引到陈奕迅老师；10月16日，刘瑞琦推出首张专辑《私房歌》的主打歌《房间》；10月16日，刘瑞琦担任百度音乐校园新声代成都赛区评委；11月06日，刘瑞琦担任百度音乐校园新声代南京赛区评委；11月06日，刘瑞琦个人首张EP《私房歌》全网数字发行；12月04日，刘瑞琦参加“用我的声音做你的眼睛” 天翼飞Young声援团校园好声音公益行动并担任评委；12月05日，刘瑞琦做客腾讯大楚网，首次弹唱《房间》；12月10日，2013年红牛新能量音乐计划，刘瑞琦与杨宗纬首度合作，杨宗纬演唱刘瑞琦原创作品《歌路》。
                        </Text>
                        <Text  selectable={true} style={
                                {
                                    marginTop:20,
                                    lineHeight:25
                                }
                            }>
                            2014年02月24日，刘瑞琦原创歌曲《房间》成为电视剧《大丈夫》（王志文、李小冉主演）插曲，用歌声演绎温暖亲情；02月25日，中国最强音刘瑞琦做客56红人馆分享创作蜕变；05月11日，刘瑞琦亲临阿迪达斯运动体验日现场，分享独家运动健身心得；06月08日，刘瑞琦录制浙江卫视热门节目《我爱记歌词》；07月13日，刘瑞琦草莓音乐节厦门站开唱；08月15日，推出励志单曲《歌路》；10月25日，刘瑞琦发行了第二张EP《早安，琦》，制作人郑楠、牛奶咖啡保驾护航，联手打造；10月02日，刘瑞琦献唱草莓音乐节天津站；10月05日，刘瑞琦草莓音乐节郑州站开唱。
                            </Text>
                            <Text  selectable={true} style={
                                {
                                    marginTop:20,
                                    lineHeight:25
                                }
                            }>
                            2015年02月05日，推出专辑 《早安，琦》EP里的主打歌《歌路》MV；05月28日，受邀网剧《天才J》演唱插曲《初夏》；06月18日，“青春留言刘瑞琦毕业音乐分享会”在杭州电子科技大学活动中心剧院举办；12月15日，刘瑞琦温情献唱热播剧《爱情碟中谍》宣传曲《爱需要练习》。
                            </Text>
                            <Text  selectable={true} style={
                                {
                                    marginTop:20,
                                    lineHeight:25
                                }
                            }>
                            2016年05月23日，刘瑞琦出席OK！四周年颁奖典礼，并担任表演嘉宾；09月05日，刘瑞琦受邀参加全新梅赛德斯-奔驰长轴距E级车上市盛典并献唱。
                            </Text>
                            <Text  selectable={true} style={
                                {
                                    marginTop:20,
                                    lineHeight:25
                                }
                            }>
                            2017年04月22日，刘瑞琦参加荣耀制噪者音乐节杭州站并作为压轴嘉宾演出；05月19日，在大陆发行专辑《晚安，琦》，收录了包括《来不及》等在内的6首歌曲，同年8月全球发行，进入台湾五大唱片销量榜前20名；07月24日，刘瑞琦受邀参加“腾讯音乐人计划”的发布会并献唱；09月02日，刘瑞琦在自己生日当天推出巡回演唱会同名主题曲《温暖的房间》；09月08日，刘瑞琦“温暖的房间”巡回演唱会首站——杭州站开演（杭州，上海，广州，深圳，武汉，成都，北京，长沙，重庆，天津，南京，厦门，西安，苏州，东莞，无锡，太原，宁波，大连，昆明，哈尔滨，沈阳，石家庄，佛山，合肥，香港，天津，重庆，济南，最后于北京北展剧院顺利收官，巡回27城，共30站）；11月05日，刘瑞琦接受《乐器》杂志的采访。
                        </Text>
                    </View>
                </View>
                <View style={
                    {
                        marginLeft: 20
                    }
                }>
                    <Text selectable={true} style={
                        {
                            fontSize: 21,
                            marginTop: 20
                        }
                    }>荣誉记录</Text>
                    <View style={
                        {
                            marginTop: 20
                        }
                    }>
                        <Text selectable={true}>
                            ▪2018-08-02 福布斯中国30位30岁以下精英榜(音乐领域） （获奖）
                        </Text>
                    </View>
                </View>
                <View style={
                    {
                        marginLeft: 20
                    }
                }>
                    <Text selectable={true} style={
                        {
                            fontSize: 21,
                            marginTop: 20
                        }
                    }>个人作品</Text>
                    <View style={
                        {
                            marginTop: 20
                        }
                    }>
                        <Text selectable={true} style={
                                {
                                    marginTop:10
                                }
                            }>
                            《玉米赤烧开(Demo)》
                        </Text>
                        <Text selectable={true} style={
                                {
                                    marginTop:10
                                }
                            }>
                            《抽屉(Demo)》
                        </Text>
                        <Text selectable={true} style={
                                {
                                    marginTop:10
                                }
                            }>
                            《歌路(Demo)》
                        </Text>
                        <Text selectable={true} style={
                                {
                                    marginTop:10
                                }
                            }>
                            《烟火的轨迹(Demo)》
                        </Text>
                        <Text selectable={true} style={
                                {
                                    marginTop:10
                                }
                            }>
                            《夏天的风》
                        </Text>
                        <Text selectable={true} style={
                                {
                                    marginTop:10
                                }
                            }>
                            《TrueLove》
                        </Text>
                        <Text selectable={true} style={
                                {
                                    marginTop:10
                                }
                            }>
                            《爱是怀疑》
                        </Text>
                        <Text selectable={true} style={
                                {
                                    marginTop:10
                                }
                            }>
                            《Cappuccino》
                        </Text>
                        <Text selectable={true} style={
                                {
                                    marginTop:10
                                }
                            }>
                            《一样的夏天》
                        </Text>
                        <Text selectable={true} style={
                                {
                                    marginTop:10
                                }
                            }>
                            《乌克丽丽》
                        </Text>
                    </View>
                </View>
                </ScrollView>
            </View>
        )
    }
}