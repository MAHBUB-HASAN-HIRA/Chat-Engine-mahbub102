import { PictureOutlined, SendOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { isTyping, sendMessage } from "react-chat-engine";

const MessageForm = (props) => {
	const [value, setValue] = useState("");
	const [file, setFile] = useState('');
	const { creds, chatId } = props;
	const handleSubmit = (event) => {
		event.preventDefault();
		const textContent = value.trim();
		if (textContent.length > 0 && !file) {
			sendMessage(creds, chatId, { text: textContent });
			setValue("");
		} if( file.length > 0 && (file[0]?.type.split('/')[0]) === "image") {
			sendMessage(creds, chatId, { files: file, text: textContent });
			setFile("");
			setValue("");
		}
	};

	const handleChange = (event) => {
		setValue(event.target.value);
		isTyping(props, chatId);
	};

	return (
		<form className="message-form" onSubmit={handleSubmit}>
			<input
				type="text"
				className="message-input"
				placeholder="Send a message..."
				value={value}
				onChange={handleChange}
				onSubmit={handleSubmit}
			/>
			<label htmlFor="upload-button">
				<span className="image-button">
					<PictureOutlined className="picture" />
				</span>
			</label>
			<input
				type="file"
				multiple={false}
				id="upload-button"
				style={{ display: "none" }}
				onChange={(e) => setFile(e.target.files)}
			/>
			<button type="submit" className="send-button">
				<SendOutlined />
			</button>
		</form>
	);
};

export default MessageForm;
