import React, { Component } from 'react'
import { StyleSheet, View, Text ,Image ,SectionList,Dimensions, TouchableOpacity, ScrollView, FlatList} from 'react-native'
const {width,height} = Dimensions.get('window');

class CleverKind extends Component {

    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                showsVerticalScrollIndicator={false} 
                >
                    <View style = {{width:width * 0.85}}>
                    <SectionList
                    renderItem={({ item, index, section }) => 
                    <FlatList data={item}
                    numColumns = {item.length}
                    renderItem={({ele,index})=><TouchableOpacity  style={{marginRight:width * 0.01}}>
                        <Text>{item[index].name}
                    </Text>
                        </TouchableOpacity>}
                    />
            }
                renderSectionHeader={({ section: { title } }) => (
                <Text style={{ marginTop:20,fontWeight: "bold",fontSize:20,width:width * 0.85,height:height * 0.05}}>{title}</Text>
                )}
                sections={[
                    { title: "你喜欢的歌手与作曲", data: [[{key:1,name:"赵照"},{key:2,name:"许嵩"},{key:3,name:"毛不易"},{key:4,name:"以冬"},{key:5,name:"薛之谦"}]] },
                    { title: "主题", data: [[{key:'copy',name:"翻唱"},{key:'popular',name:"流行"}]] },
                    { title: "今日心情如何", data: [[{key:'happy',name:"欢快"},{key:'passive',name:"忧郁"}]] },
                    { title: "语言", data: [[{key:'language',name:"中文"}]] }
                ]}
                    keyExtractor={(item, index) => item + index}
/>

                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:"center",
        alignItems:"center"
    }
})

export default CleverKind