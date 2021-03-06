import React, { useState } from "react";
import { useRouter } from "next/router";
import connect from "../../components/db";
const note = require("../../components/models/notes");
import { GetServerSideProps, GetServerSidePropsContext } from "next";

interface IPageProps {
	Otitle: string;
	Obody: string;
	Ostatus: string;
}

const Edit = ({ Otitle, Obody, Ostatus }: IPageProps) => {
	const [title, setTitle] = useState(Otitle);
	const [body, setBody] = useState(Obody);
	let Ogstatus = "";
	if (Ostatus == "UI") Ogstatus = "Urgent and Important";
	if (Ostatus == "UNI") Ogstatus = "Urgent but not Important";
	if (Ostatus == "NUI") Ogstatus = "not Urgent but Important";
	if (Ostatus == "NUNI") Ogstatus = "neither Urgent nor Important";
	const [status, setStatus] = useState(Ogstatus);
	const router = useRouter();
	const { id } = router.query;
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let x = "";
		if (status == "Urgent and Important") x = "UI";
		else if (status == "Urgent but not Important") x = "UNI";
		else if (status == "not Urgent but Important") x = "NUI";
		else if (status == "neither Urgent nor Important") x = "NUNI";
		fetch(`/api/edit/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title,
				body,
				status: x,
			}),
		})
			.then((res) => {
				router.push("/");
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<>
			<h1>Edit This Note</h1>
			<div className="card border border-0 bg-light w-50">
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						className="form-control my-1"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="title"
					/>
					<input
						className="form-control my-1"
						type="text-area"
						value={body}
						onChange={(e) => setBody(e.target.value)}
						placeholder="description"
					/>
					<input
						className="form-control my-1"
						type="text"
						value={status}
						readOnly
						placeholder="status"
					/>
					<button
						className="button btn-secondary"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						Status
					</button>
					<ul className="dropdown-menu">
						<li>
							<a
								className="dropdown-item"
								href="#"
								onClick={() => setStatus("Urgent and Important")}
							>
								Urgent and Important
							</a>
						</li>
						<li>
							<a
								className="dropdown-item"
								href="#"
								onClick={() => setStatus("Urgent but not Important")}
							>
								Urgent but not Important
							</a>
						</li>
						<li>
							<a
								className="dropdown-item"
								href="#"
								onClick={() => setStatus("not Urgent but Important")}
							>
								not Urgent but Important
							</a>
						</li>
						<li>
							<a
								className="dropdown-item"
								href="#"
								onClick={() => setStatus("neither Urgent nor Important")}
							>
								neither Urgent nor Important
							</a>
						</li>
					</ul>
					<button type="submit" className="button btn-primary float-end">
						<i className="bi bi-card-checklist me-2" />
						Add Note
					</button>
				</form>
			</div>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async (
	ctx: GetServerSidePropsContext
) => {
	connect();
	const id = ctx.params?.id;
	const Note = await note.findById(id);
	return {
		props: {
			Otitle: Note.title,
			Obody: Note.body,
			Ostatus: Note.status,
		},
	};
};

export default Edit;
