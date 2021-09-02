import React from "react";

const MyMessage = ({ message }) => {
	if (message?.attachments?.length > 0) {
		return message?.text.length > 0 ? (
			<div>
				<div
					className="message"
					style={{
						float: "right",
						marginRight: "18px",
						color: "#fff",
						backgroundColor: "#3B2A50",
					}}
				>
					{message?.text}
				</div>
				<img
					src={message.attachments[0].file}
					alt="message-attachments"
					className="message-image"
					style={{
						float: "right",
						marginTop: "30px",
						marginRight: "5px",
					}}
				/>
			</div>
		) : (
			<img
				src={message.attachments[0].file}
				alt="message-attachments"
				className="message-image"
				style={{ float: "right" }}
			/>
		);
	}
	return (
		<div
			className="message"
			style={{
				float: "right",
				marginRight: "18px",
				color: "#fff",
				backgroundColor: "#3B2A50",
			}}
		>
			{message.text}
		</div>
	);
};

export default MyMessage;
