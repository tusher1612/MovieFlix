import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import NavigationTab from '@/lib/components/NavigationTab'
import { icons } from '@/lib/constants/icons'

const _layout = () => {
  return (
   <Tabs screenOptions={{
    tabBarShowLabel:false,
    tabBarItemStyle:{
        width:'100%',
        height:"100%",
        justifyContent:'center',
        alignItems:'center'
    },
    tabBarStyle:{
        backgroundColor:'#0f0D23',
        borderRadius:50,
        marginHorizontal:10,
        marginBottom:10,
        height:55,
        position:'absolute',
        overflow:'hidden',
        borderWidth:1,
        borderColor:'#0f0D23',

    }
   }}>
   <Tabs.Screen 
   name='index'
   options={{
    title:"Home",
    headerShown:false,
    tabBarIcon:({focused})=>(
    
       <NavigationTab navTitle='Home'  icon={icons.home} focused={focused}/>
     
    )
   }}
   />


      <Tabs.Screen 
   name='search'
   options={{
    title:"Search",
    headerShown:false,
    tabBarIcon:({focused})=>(
    
        <NavigationTab navTitle='Search'  icon={icons.search} focused={focused}/>
      
     )
   }}
   />
         <Tabs.Screen 
   name='news'
   options={{
    title:"News",
    headerShown:false,
    tabBarIcon:({focused})=>(
    
        <NavigationTab navTitle='News'  icon={icons.news} focused={focused}/>
      
     )
   }}
   />

<Tabs.Screen 
   name='profile'
   options={{
    title:"Profile",
    headerShown:false,
    tabBarIcon:({focused})=>(
    
        <NavigationTab navTitle='Profile'  icon={icons.person} focused={focused}/>
      
     )
   }}
   />
   </Tabs>
  )
}

export default _layout

