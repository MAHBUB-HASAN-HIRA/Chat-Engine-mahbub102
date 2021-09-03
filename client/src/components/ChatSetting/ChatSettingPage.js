import { LogoutOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./ChatSettingPage.css";

const ChatSettingPage = ({ chat }) => {

	const [activeUser, setActiveUser] = useState({})
	const history = useHistory();
	const removeUser = () => {
		localStorage.removeItem("SIDCC");
		history.push("/login");
	};
	useEffect(() => {
		const user_name = localStorage
			.getItem("SIDCC")
			?.split("bcryptjsmahbubjsonalgorithm101develop")[0];

		if (user_name && user_name !== undefined) {
			axios
				.get("https://api.chatengine.io/users/", {
					headers: {
						"PRIVATE-KEY": "8a137cb4-2255-4ce0-b873-18dd95cba5a3",
					},
				})
				.then(function (response) {
					if (response.data.length > 0) {
						const activePerson = response.data.find(
							(item) => item.username === user_name
						);
						const onlineUser = {
							person: {
								avatar: activePerson?.avatar,
								username: activePerson?.username,
								first_name: activePerson?.first_name,
								last_name: activePerson?.last_name,
								is_online: activePerson?.is_online,
							},
						};
						setActiveUser(onlineUser);
					}
				})
				.catch(function (error) {
					console.log(error);
				});
		}
	}, [setActiveUser]);

	return (
		<div className="chat_sitting_container">
			<div onClick={removeUser} className="logout">
				Logout <LogoutOutlined />
			</div>
			{activeUser?.person ? (
				<div className="my_profile">
					<img
						className="user_avatar"
						src={activeUser?.person?.avatar}
						alt=""
					/>
					<h3>{activeUser?.person?.username}</h3>
					<h1>{`${
						(activeUser?.person?.first_name !== undefined ||
							activeUser?.person?.first_name !== null) &&
						activeUser?.person?.first_name
					}
					${
						(activeUser?.person?.last_name !== undefined ||
							activeUser?.person?.last_name !== null) &&
						activeUser?.person?.last_name
					}
					`}</h1>
				</div>
			) : (
				<div className="loader">
					<div className="lds-facebook">
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ChatSettingPage;
