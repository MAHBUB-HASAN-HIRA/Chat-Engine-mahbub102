import {
	EyeInvisibleOutlined,
	EyeOutlined,
	PictureOutlined,
} from "@ant-design/icons";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory, useLocation } from "react-router-dom";
import { DataContext } from "../../App";

const Register = () => {
	const { setUsernameGlobal, setPasswordGlobal, setNewUser } =
		useContext(DataContext);
	const [serverError, setServerError] = useState("");
	const [passType, setPassType] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const history = useHistory();
	const location = useLocation();
	let { from } = location.state || { from: { pathname: "/" } };

	const handleFormData = async (data) => {
		let formData = new FormData();
		formData.append("first_name", data.first_name);
		formData.append("last_name", data.last_name);
		formData.append("username", data.username);
		formData.append("secret", data.secret);
		formData.append("avatar", Object.values(data.user_avatar)[0]);
		const url = "https://api.chatengine.io/users/";

		try {
			await axios
				.post(url, formData, {
					headers: { "PRIVATE-KEY": "8a137cb4-2255-4ce0-b873-18dd95cba5a3" },
				})
				.then((response) => {
					if (response.status === 201) {
						setNewUser(true);
						setUsernameGlobal(data.username);
						setPasswordGlobal(data.secret);
						localStorage.setItem(
							"SIDCC",
							`${data.username}bcryptjsmahbubjsonalgorithm101develop${data.secret}${data.username}bcryptjsmahbubjsonalgorithm101develop${data.secret}`
						);
						history.replace(from);
					}
				});
		} catch (error) {
			console.log(error.response);
			if (error?.response?.data?.message) {
				setServerError(error?.response?.data?.message);
			} else {
				setServerError("OPPS!!!, incorrect credentials...");
			}
		}
	};

	return (
		<div className="wrapper">
			<div className="form_container form_container_register">
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
				<h2 style={{ marginBottom: "5px" }} className="form_error">
					{serverError}
				</h2>
				<div className="form">
					<form onSubmit={handleSubmit(handleFormData)}>
						{errors.first_name && errors.first_name.type === "required" && (
							<span className="form_error">First Name is required!!</span>
						)}
						{errors.first_name && errors.first_name.type === "maxLength" && (
							<span className="form_error">Max length exceeded!!!</span>
						)}
						<input
							type="text"
							name="first_name"
							className="input register_input"
							placeholder="First Name"
							{...register("first_name", { required: true, maxLength: 20 })}
						/>

						{errors.last_name && errors.last_name.type === "required" && (
							<span className="form_error">Last Name is required!!</span>
						)}
						{errors.last_name && errors.last_name.type === "maxLength" && (
							<span className="form_error">Max length exceeded!!!</span>
						)}
						<input
							type="text"
							name="last_name"
							className="input register_input"
							placeholder="Last Name"
							{...register("last_name", { required: true, maxLength: 20 })}
						/>

						{errors.username && errors.username.type === "required" && (
							<span className="form_error">Username is required!!</span>
						)}
						{errors.username && errors.username.type === "maxLength" && (
							<span className="form_error">Max length exceeded!!!</span>
						)}
						{errors.username && errors.username.type === "minLength" && (
							<span className="form_error">Minimum 6 characters required</span>
						)}
						<input
							type="text"
							name="username"
							className="input register_input"
							placeholder="Username"
							{...register("username", {
								required: true,
								minLength: 6,
								maxLength: 50,
							})}
						/>
						<div style={{ marginBottom: "0px!important", height: "70px" }}>
							{errors.secret && errors.secret.type === "required" && (
								<span className="form_error">Password is required!!</span>
							)}
							{errors.secret && errors.secret.type === "minLength" && (
								<span className="form_error">
									Minimum 6 characters required
								</span>
							)}
							<input
								type={passType ? "password" : "text"}
								name="secret"
								className="input register_input"
								placeholder="Password"
								{...register("secret", {
									required: true,
									minLength: 6,
								})}
							/>
							<span onClick={() => setPassType(!passType)} className="eye">
								{passType ? <EyeOutlined /> : <EyeInvisibleOutlined />}
							</span>
						</div>
						<div className="image_container">
							{errors.user_avatar && errors.user_avatar.type === "required" && (
								<span className="form_error">Please Upload an Image!!</span>
							)}
							<label
								className="input register_input"
								style={{ marginTop: "0px" }}
								htmlFor="userImage"
							>
								<span className="image-button">
									<PictureOutlined className="picture" />
								</span>
								Upload Image
							</label>
							<input
								type="file"
								name="avatar"
								multiple={false}
								className="input register_input image_file"
								id="userImage"
								placeholder="Image"
								{...register("user_avatar", { required: true })}
							/>
						</div>
						<div align="center">
							<button type="submit" className="button register_button">
								<span>Register</span>
							</button>
						</div>
						<div
							style={{ marginTop: "30px", textAlign: "center", color: "white" }}
						>
							<p>
								Already have an account?{" "}
								<Link className="create" to="/login">
									Go to Login
								</Link>
							</p>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;
