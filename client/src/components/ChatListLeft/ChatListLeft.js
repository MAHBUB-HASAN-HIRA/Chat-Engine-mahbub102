import React, { useEffect, useState } from "react";
import { ChatCard, NewChatForm } from "react-chat-engine";

const ChatListLeft = (props) => {
	const [chatArr, setChatArr] = useState([]);

	useEffect(() => {
		if (props?.chats) {
			setChatArr(Object.values(props?.chats));
		}
	}, [props?.chats]);
	return (
		<>
			{chatArr.length > 0 ? (
				<>
					<NewChatForm {...props} />
					{chatArr.map((item) => (
						<>
							<ChatCard {...props} chat={item} />
						</>
					))}
				</>
			) : (
				<div className="loader">
					<div className="lds-facebook">
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>
			)}
		</>
	);
};

export default ChatListLeft;
