import { createContext, useEffect, useState } from "react";
import { ChatEngine } from "react-chat-engine";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import ChatFeed from "./components/ChatFeed/ChatFeed";
import ChatSettingPage from "./components/ChatSetting/ChatSettingPage";
import LoginForm from "./components/Login/LoginForm";
import PrivateRoute from "./components/Login/PrivateRoute";
import Register from "./components/Login/Register";

export const DataContext = createContext("");

function App() {
	const [usernameGlobal, setUsernameGlobal] = useState("");
	const [passwordGlobal, setPasswordGlobal] = useState("");
	const [newUser, setNewUser] = useState(false);

	useEffect(() => {
		const user = localStorage
			.getItem("SIDCC")
			?.split("bcryptjsmahbubjsonalgorithm101develop");
		if (user) {
			setUsernameGlobal(user[0]);
			setPasswordGlobal(user[2]);
		}
	}, [usernameGlobal, passwordGlobal]);
	return (
		<Router>
			<Switch>
				<DataContext.Provider
					value={{
						newUser,
						setNewUser,
						setUsernameGlobal,
						setPasswordGlobal,
					}}
				>
					<PrivateRoute exact path="/">
						<ChatEngine
							height="100vh"
							projectID="0c22a016-d237-442a-be2e-6f86585f0787"
							userName={
								usernameGlobal ||
								localStorage
									.getItem("SIDCC")
									?.split("bcryptjsmahbubjsonalgorithm101develop")[0]
							}
							userSecret={
								passwordGlobal ||
								localStorage
									.getItem("SIDCC")
									?.split("bcryptjsmahbubjsonalgorithm101develop")[2]
							}
							renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
							renderChatSettingsTop={(creds, chat) => (
								<ChatSettingPage creds={creds} chat={chat} />
							)}
							// renderChatList={(chatAppState) => <ChatListLeft {...chatAppState}/>}
						/>
					</PrivateRoute>
					<Route path="/login">
						<LoginForm />
					</Route>
					<Route path="/register">
						<Register />
					</Route>
				</DataContext.Provider>
			</Switch>
		</Router>
	);
}
export default App;
