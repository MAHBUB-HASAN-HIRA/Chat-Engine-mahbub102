import axios from "axios";
import React, { useContext, useEffect } from "react";
import { ConnectionBar } from "react-chat-engine";
import { DataContext } from "../../App";
import ChatFeedHeader from "./ChatFeedHeader/ChatFeedHeader";
import MessageForm from "./MessageForm/MessageForm";
import RenderMessage from "./RenderMessage/RenderMessage";

const ChatFeed = (props) => {
	const { newUser, setNewUser } = useContext(DataContext);
	const { chats, activeChat, userName, userSecret, projectID } = props;
	const chat = chats && chats[activeChat];


	useEffect(() => {
		if (newUser && projectID && userName) {
			let data = new FormData();
			data.append("title", "My Chat Group");
			data.append("is_direct_chat", "false");
			const url = "https://api.chatengine.io/chats/";
			axios
				.post(url, data, {
					headers: {
						"Project-ID": `${projectID}`,
						"User-Name": `${userName}`,
						"User-Secret": `${userSecret}`,
					},
				})
				.then(function (response) {
					if (response.data) {
						window.location.reload();
						setNewUser(false);
					}
				})
				.catch(function (error) {
					console.log(error);
				});
		}
	}, [newUser, projectID, userName, userSecret, setNewUser]);

	if (!chat)
		return (
			<div className="loader">
				<div className="lds-facebook">
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
		);

	return (
		<div className="chat-feed">
			{/* <div className="chat-title-container">
				<div className="chat-title">{chat.title}</div>
				<div className="chat-subtitle">
					{chat.people.map((person) => ` ${person.person.username}`)}
				</div>
			</div> */}

			<ChatFeedHeader />
			<ConnectionBar />
			<RenderMessage {...props} chat={chat} />
			{process.env.REACT_APP_SECRET_NAME}
			<div style={{ height: "100px" }}>
				<div className="message-form-container">
					<MessageForm {...props} chatId={activeChat} />
				</div>
			</div>
		</div>
	);
};

export default ChatFeed;
