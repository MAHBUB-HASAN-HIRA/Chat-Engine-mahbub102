import React from "react";

const TheirMessage = ({ lastMessage, message }) => {
	const isFirstMessageByUser =
		!lastMessage || lastMessage.sender.username !== message.sender.username;

	return (
		<div className="message-row">
			{isFirstMessageByUser && (
				<div
					className="message-avatar"
					style={{ backgroundImage: `url(${message?.sender?.avatar})`, objectFit:'cover' }}
				/>
			)}

			{message?.attachments?.length > 0 ? (
				message?.text.length > 0 ? (
					<div>
						<div
							className="message"
							style={{
								float: "left",
								backgroundColor: "#CABCDC",
								objectFit: "fill",
								objectPosition: "center",
								marginLeft: isFirstMessageByUser ? "4px" : "48px",
							}}
						>
							{message.text}
						</div>
						<img
							src={message.attachments[0].file}
							alt="message-attachments"
							className="message-image"
							style={{
								marginTop: "30px",
								marginLeft: "5px",
							}}
						/>
					</div>
				) : (
					<img
						src={message.attachments[0].file}
						alt="message-attachments"
						className="message-image"
						style={{
							marginLeft: isFirstMessageByUser ? "4px" : "48px",
							marginTop: "10px",
						}}
					/>
				)
			) : (
				<div
					className="message"
					style={{
						float: "left",
						backgroundColor: "#CABCDC",
						marginLeft: isFirstMessageByUser ? "4px" : "48px",
					}}
				>
					{message.text}
				</div>
			)}
		</div>
	);
};

export default TheirMessage;
