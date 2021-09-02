import React, { useEffect, useRef } from "react";
import MyMessage from "../MyMessage/MyMessage";
import TheirMessage from "../TheirMessage/TheirMessage";

const RenderMessage = (props) => {
	const { chats, activeChat, userName, messages } = props;
	const chat = chats && chats[activeChat];

	const messageRef = useRef();
	useEffect(() => {
		if (messageRef.current) {
			messageRef.current.scrollIntoView({
				behavior: "smooth",
				block: "end",
				inline: "nearest",
			});
		}
	}, [messages]);
	const keys = Object.keys(messages);
	return keys.map((key, index) => {
		const message = messages[key];
		const lastMessageKey = index === 0 ? null : keys[index - 1];
		const isMyMessage = userName === message.sender.username;

		return (
			<div key={`msg_${index}`} ref={messageRef}>
				<div className="message-block">
					{isMyMessage ? (
						<MyMessage message={message} />
					) : (
						<TheirMessage
							message={message}
							lastMessage={messages[lastMessageKey]}
						/>
					)}
				</div>
				<div
					className="read-receipts"
					style={{
						marginRight: isMyMessage ? "18px" : "0px",
						marginLeft: isMyMessage ? "0px" : "68px",
					}}
				>
					{chat?.people?.map(
						(person, index) =>
							person.last_read === message.id && (
								<div
									key={`read_${index}`}
									className="read-receipt"
									style={{
										marginTop: "5px",
										float: isMyMessage ? "right" : "left",
										backgroundImage: `url(${person?.person?.avatar})`,
									}}
								/>
							)
					)}
				</div>
			</div>
		);
	});
};

export default RenderMessage;
