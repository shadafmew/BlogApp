// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { StyleSheet, Text, View, FlatList, Image, Modal, TextInput, Button, TouchableOpacity } from 'react-native';
// import { MaterialIcons } from '@expo/vector-icons';
// import React from 'react';
// import DashboardScreen from '../screens/DashboardScreen';



// // Bottom Tab Navigator
// const Tab = createBottomTabNavigator();

// export default function App() {
//   return (
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ color, size }) => {
//             let iconName;
//             if (route.name === 'Home') {
//               iconName = 'home';
//             } else if (route.name === 'Blog') {
//               iconName = 'list';
//             } else if (route.name === 'Profile') {
//               iconName = 'person';
//             }
//             return <MaterialIcons name={iconName} size={size} color={color} />;
//           },
//           tabBarActiveTintColor: '#4f46e5',
//           tabBarInactiveTintColor: 'gray',
//         })
    
//     }
//       >
//         <Tab.Screen options={{ headerShown: false }} name="Home" component={DashboardScreen} />
//         {/* <Tab.Screen name="Blog" component={BlogScreen} /> */}
//         <Tab.Screen options={{ headerShown: false }} name="Profile" component={DashboardScreen} />
//       </Tab.Navigator>
//   );
// }

// // Dummy Home Screen
// function HomeScreen() {
//   return (
//     <View>
//       <Text>Home Screen</Text>
//     </View>
//   );
// }

// // Dummy Profile Screen
// function ProfileScreen() {
//   return (
//     <View>
//       <Text>Profile Screen</Text>
//     </View>
//   );
// }














import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import DashboardScreen from '../screens/DashboardScreen';

// Dummy Screens
function HomeScreen() {
  return (
    <View style={styles.screen}>
      <Text>Home Screen</Text>
    </View>
  );
}

function BlogScreen() {
  return (
    <View style={styles.screen}>
      <Text>Blog Screen</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={styles.screen}>
      <Text>Profile Screen</Text>
    </View>
  );
}

function AnalyticsScreen() {
  return (
    <View style={styles.screen}>
      <Text>Analytics Screen</Text>
    </View>
  );
}




// Bottom Tab Navigator
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          // Define icons for each tab
          if (route.name === 'Home') {
            iconName = 'home'; // Home icon
            return <MaterialIcons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Blog') {
            iconName = 'file-document'; // Document icon (currently selected)
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Profile') {
            iconName = 'chart-bar'; // Bar chart icon
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Analytics') {
            iconName = 'chart-line'; // Line chart icon
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: '#4f46e5', // Color when the tab is active
        tabBarInactiveTintColor: 'gray', // Color when the tab is inactive
        tabBarShowLabel: false, // Hide labels to match the style in the image
      })}
    >
      <Tab.Screen options={{ headerShown: false }} name="Home" component={DashboardScreen} />
      <Tab.Screen options={{ headerShown: false }} name="Blog" component={DashboardScreen} />
      <Tab.Screen options={{ headerShown: false }} name="Profile" component={DashboardScreen} />
      <Tab.Screen options={{ headerShown: false }} name="Analytics" component={DashboardScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});