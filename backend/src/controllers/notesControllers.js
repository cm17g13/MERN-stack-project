// export const getAllNotes = (req, res) => {
//     res.status(200).send("You have fetched all the notes");
// };

//import the Note schema
import Note from "../models/Note.js";
import mongoose from "mongoose";

export async function getAllNotes(req, res) {
	//res.status(200).send("You have fetched all the notes");
	try {
		//Created order
		//const notes = await Note.find();
		//Most recent first
		const notes = await Note.find().sort({ createdAt: -1 });
		res.status(200).json(notes);
	} catch (error) {
		console.log("Error in getAllNotes method", error);
		res.status(500).json({ message: "Interal server error" });
	}
}

export async function getNoteByID(req, res) {
	const id = req.params.id;
	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(400).json({ message: "Note ID is not valid!" });
	try {
		const note = await Note.findById(id);
		console.log(note);
		if (!note) return res.status(404).json({ message: "Note not found!" });
		res.json(note);
	} catch (error) {
		console.error("Error in getNoteByID controller", error);
		res.status(500).json({ message: "Internal server error" });
	}
}

export async function createNote(req, res) {
	//res.status(201).json({ message: `Note created successfully` })
	try {
		const { title, content } = req.body;
		const newNote = new Note({
			title,
			content,
		});
		await newNote.save();
		res.status(201).json({ message: "note created successfully " });
	} catch (error) {
		console.log("Error in createNote method", error);
		res.status(500).json({ message: "Interal server error" });
	}
}

export async function updateNote(req, res) {
	//res.status(200).json({ message: `Note ${req.params.id} has been updated successfully` })
	try {
		const { title, content } = req.body;
		const id = req.params.id;
		// console.log(id);
		// const notesArray = await Note.find({ _id: id });
		// const noteToUpdate = notesArray[0];
		// //const noteToUpdate = await Note.findById(id);
		// console.log(noteToUpdate);
		// noteToUpdate.title = title;
		// noteToUpdate.content = content;
		// await noteToUpdate.save();
		const updateNote = await Note.findByIdAndUpdate(
			id,
			{ title, content },
			{ new: true }
		);
		if (!updateNote) {
			return res.status(404).json({ message: "Note not found" });
		}
		res.status(200).json({ message: "note updated successfully " });
	} catch (error) {
		console.log("Error in updateNote method", error);
		res.status(500).json({ message: "Interal server error" });
	}
}

export async function deleteNote(req, res) {
	//res.status(200).json({ message: `Note ${req.params.id} has been deleted successfully` });
	try {
		const id = req.params.id;
		const updateNote = await Note.findByIdAndDelete(id);
		if (!updateNote) {
			return res.status(404).json({ message: "Note not found" });
		}
		res.status(200).json({ message: "note deleted successfully " });
	} catch (error) {
		console.log("Error in deleteNote method", error);
		res.status(500).json({ message: "Interal server error" });
	}
}
