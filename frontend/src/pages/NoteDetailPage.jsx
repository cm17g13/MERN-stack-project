import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
//import axios from "axios";
import api from "../lib/axios";

const NoteDetailPage = () => {
	//const [title, setTitle] = useState("");
	//const [content, setContent] = useState("");
	const [note, setNote] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isSaving, setIsSaving] = useState(false);

	const navigate = useNavigate();

	//gets the id from the current URL
	const { id } = useParams();

	useEffect(() => {
		const fetchNote = async () => {
			try {
				const res = await api.get(`/notes/${id}`);
				console.log(res.data);
				setNote(res.data);
			} catch (error) {
				console.log(`Error fetching note`);
				console.log(error);
				//if errror contains response, check the status is 429 (rate limited)
				if (error.response?.status === 429) {
					toast.error("You have been rate limited, slow down");
				} else {
					toast.error("Failed to get note");
				}
			} finally {
				setIsLoading(false);
			}
		};
		fetchNote();
	}, [id]);

	const handleDelete = async (e) => {
		//e.preventDefault();

		if (!window.confirm("Are you sure that you want to delete this note?"))
			return;

		try {
			await api.delete(`/notes/${id}`);
			toast.success("Note deleted successfully");
			navigate("/");
		} catch (error) {
			if (error.response?.status === 429) {
				toast.error("You have been rate limited, slow down");
			} else {
				toast.error("Failed to delete note");
			}
			//console.log(error);
		}
	};

	const handleSave = async (e) => {
		e.preventDefault();
		if (!note.title.trim() || !note.content.trim()) {
			toast.error("All fields must be populated to update a note");
			return;
		}
		setIsSaving(true);
		try {
			await api.put(`/notes/${id}`, note);
			toast.success("Note updated successfully");
			navigate("/");
		} catch (error) {
			if (error.response?.status === 429) {
				toast.error("You have been rate limited, slow down");
			} else {
				toast.error("Failed to update note");
			}
			console.log(error);
		} finally {
			setIsSaving(false);
		}
	};

	if (isLoading) {
		return (
			<div className="min-h-screen bg-base-200 flex items-center justify-center">
				<LoaderIcon className="animate-spin size-10" />
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-base-200">
			<div className="container mx-auto px-4 py-8">
				<div className="max-w-2xl mx-auto">
					<div className="flex items-center justify-between mb-6">
						<Link to={"/"} className="btn btn-ghost mb-6">
							<ArrowLeftIcon className="size-5" />
							Back to Notes
						</Link>
						<button
							onClick={handleDelete}
							className="btn btn-error btn-outline"
						>
							<Trash2Icon className="h-5 w-5" />
							Delete Note
						</button>
					</div>
					<div className="card bg-base-100">
						<div className="card-body">
							<h2 className="card-title text-2xl mb-4">Update existing Note</h2>
							<form onSubmit={handleSave}>
								<div className="form-control mb-4">
									<label className="label">
										<span className="label-text">{}</span>
									</label>
									<input
										type="text"
										placeholder={note.title}
										className="input input-bordered"
										value={note.title}
										onChange={(e) =>
											setNote({ ...note, title: e.target.value })
										}
									/>
								</div>

								<div className="form-control mb-4">
									<label className="label">
										<span className="label-text">Content</span>
									</label>
									<textarea
										type="text"
										placeholder={note.content}
										className="textarea textarea-bordered h-32"
										value={note.content}
										onChange={(e) =>
											setNote({ ...note, content: e.target.value })
										}
									/>
								</div>
								<div className="card-actions justify-end">
									<button
										type="submit"
										className="btn btn-primary"
										disabled={isSaving}
									>
										{isSaving ? "Updating..." : "Update Note"}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NoteDetailPage;
