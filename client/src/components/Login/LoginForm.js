import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { DataContext } from "../../App";

const LoginForm = () => {
	const { setUsernameGlobal, setPasswordGlobal } = useContext(DataContext);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [passType, setPassType] = useState(false);
	const history = useHistory();
	const location = useLocation();
	let { from } = location.state || { from: { pathname: "/" } };

	const handleSubmit = async (e) => {
		e.preventDefault();

		const authObject = {
			"Project-ID": "0c22a016-d237-442a-be2e-6f86585f0787",
			"User-Name": username,
			"User-Secret": password,
		};

		try {
			// username || password => chatengine -> give message
			await axios.get("https://api.chatengine.io/chats", {
				headers: authObject,
			});
			// -> works out logged in
			setUsernameGlobal(username);
			setPasswordGlobal(password);
			localStorage.setItem("SIDCC", `${username}bcryptjsmahbubjsonalgorithm101develop${password}${username}bcryptjsmahbubjsonalgorithm101develop${password}`);
			history.replace(from);
		} catch (error) {
			//error -> try with new username
			setError("OPPS!!!, incorrect credentials...");
		};
	};
	return (
		<div className="wrapper">
			<div className="form_container">
				<h1 className="title">Welcome To Chat Application</h1>
				<h3 className="title_name">
					By{" "}
					<a
						href="https://mahbubhasanhira.com/"
						rel="noreferrer"
						target="_blank"
					>
						Mahbub Hasan
					</a>
				</h3>
				<div className="form">
					<form onSubmit={handleSubmit}>
						<input
							type="text"
							className="input marginBottom"
							placeholder="Username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
						<input
							type={passType ? "password" : "text"}
							className="input marginBottom"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						<span onClick={() => setPassType(!passType)} className="eyeLogin">
							{passType ? <EyeOutlined /> : <EyeInvisibleOutlined />}
						</span>
						<div align="center">
							<button type="submit" className="button">
								<span>Login</span>
							</button>
						</div>
						<div
							style={{ marginTop: "30px", textAlign: "center", color: "white" }}
						>
							<p>
								Don't have an account?{" "}
								<Link className="create" to="/register">
									Create Account
								</Link>
							</p>
						</div>
						<h2 className="error">{error}</h2>
					</form>
				</div>
			</div>
		</div>
	);
};

export default LoginForm;
