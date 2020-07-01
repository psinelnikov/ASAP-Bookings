import "react-native-gesture-handler";
import * as React from "react";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ViewBookings from "./pages/ViewBookings";
import AddBookings from "./pages/AddBookings";
import { userContext } from "./src/userContext";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
//import AsyncStorage from "@react-native-community/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const { Navigator, Screen } = createStackNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import AuthService from "./src/services/Auth";
import Login from "./pages/Login";
import Booking from "./pages/Booking";
import Takeout from "./pages/Takeout";
import Times from "./pages/Times";

function ProfileStack() {
	return (
		<Stack.Navigator
			initialRouteName="Profile"
			screenOptions={{
				headerStyle: { backgroundColor: "#aaa" },
				headerTintColor: "#f5f5f5",
				headerTitleStyle: { fontWeight: "bold" },
			}}
		>
			<Stack.Screen
				name="Profile"
				component={Profile}
				options={{ title: "Profile" }}
			/>
		</Stack.Navigator>
	);
}

function AddBookingsStack() {
	return (
		<Stack.Navigator
			initialRouteName="Home"
			screenOptions={{
				headerStyle: { backgroundColor: "#aaa" },
				headerTintColor: "#f5f5f5",
				headerTitleStyle: { fontWeight: "bold" },
			}}
		>
			<Screen name="Home" component={Home} options={{ title: "Home" }} />
			<Screen
				name="AddBookings"
				component={AddBookings}
				options={{ title: "Add a Booking" }}
			/>
			<Screen
				name="Booking"
				options={{ title: "Booking" }}
				component={Booking}
			/>
			<Screen
				name="Takeout"
				options={{ title: "Take Out" }}
				component={Takeout}
			/>
			<Screen
				name="Times"
				options={{ title: "Booking Times" }}
				component={Times}
			/>
		</Stack.Navigator>
	);
}

function ViewBookingsStack() {
	return (
		<Stack.Navigator
			initialRouteName="ViewBookings"
			screenOptions={{
				headerStyle: { backgroundColor: "#aaa" },
				headerTintColor: "#f5f5f5",
				headerTitleStyle: { fontWeight: "bold" },
			}}
		>
			<Screen
				name="ViewBookings"
				component={ViewBookings}
				options={{ title: "View Bookings" }}
			/>
		</Stack.Navigator>
	);
}

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {},
		};
	}

	componentDidMount() {
		AuthService.subscribeAuthChange((user) => this.setState({ user }));
	}

	refreshBookings = () => {
		console.log("k");
	};

	render() {
		const { route } = this.props;
		return (
			// Pass user state as value to context.Provider so it can be consumed by context.Consumer
			<userContext.Provider value={this.state.user}>
				{this.state.user ? (
					<NavigationContainer>
						<Tab.Navigator
							initialRouteName="AddBookingsStack"
							tabBarOptions={{
								activeTintColor: "#000",
							}}
						>
							<Tab.Screen
								name="Profile"
								component={ProfileStack}
								options={{
									tabBarLabel: "Profile",
									tabBarIcon: ({ color, size }) => (
										<MaterialCommunityIcons
											name="account"
											color={color}
											size={size}
										/>
									),
								}}
							/>
							<Tab.Screen
								name="AddBookingsStack"
								component={AddBookingsStack}
								options={{
									tabBarLabel: "Add Bookings",
									tabBarIcon: ({ color, size }) => (
										<MaterialCommunityIcons
											name="alarm-plus"
											color={color}
											size={size}
										/>
									),
								}}
							/>
							<Tab.Screen
								name="ViewBookingsStack"
								component={ViewBookingsStack}
								options={{
									tabBarLabel: "View Bookings",
									tabBarIcon: ({ color, size }) => (
										<MaterialCommunityIcons
											name="alarm-check"
											color={color}
											size={size}
										/>
									),
								}}
							/>
						</Tab.Navigator>
					</NavigationContainer>
				) : (
					<Login />
				)}
			</userContext.Provider>
		);
	}
}

// export default function App({ navigation }) {
// 	const [user, setUser] = useState({});

// 	const token = AuthService.loginWithFacebook();

// 	AuthService.subscribeAuthChange((user) => setUser(user));

// 	return (
// 		<AuthContext.Provider value={user}>
// 			<Stack.Navigator>
// 				{state.userToken == null ? (
// 					<Stack.Screen name="SignIn" component={SignInScreen} />
// 				) : (
// 					<Stack.Screen name="Home" component={HomeScreen} />
// 				)}
// 			</Stack.Navigator>
// 		</AuthContext.Provider>
// 	);
// }
