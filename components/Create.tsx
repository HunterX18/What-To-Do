import React, { useState } from "react";
import { useRouter } from "next/router";

const Create = () => {
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [status, setStatus] = useState("");
	const router = useRouter();
	const handleSubmit = (e: any) => {
		e.preventDefault();
		fetch("/api/create", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title,
				body,
				status
			}),
		})
			.then((res) => res.json())
			.then((result) => {
				// console.log(result);
				setTitle("");
				setBody("");
				setStatus("");
				router.push("/");
			})
			.catch((err) => console.log(err));
	};
	return (
		<>
			<h1>Create A Note</h1>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="title"
				/>
				<input
					type="text"
					value={body}
					onChange={(e) => setBody(e.target.value)}
					placeholder="description"
				/>
				<input
					type="text"
					value={status}
					onChange={(e) => setStatus(e.target.value)}
					placeholder="status"
				/>
				<input type="submit" value="submit" />
			</form>
		</>
	);
};

export default Create;
