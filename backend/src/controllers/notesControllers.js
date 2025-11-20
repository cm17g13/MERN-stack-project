// export const getAllNotes = (req, res) => {
//     res.status(200).send("You have fetched all the notes");
// };

export function getAllNotes(req, res) {
    res.status(200).send("You have fetched all the notes");
};

export function createNote(req, res) {
    res.status(201).json({ message: `Note created successfully` })
};

export function updateNote(req, res) {
    res.status(200).json({ message: `Note ${req.params.id} has been updated successfully` })
};

export function deleteNote(req, res) {
    res.status(200).json({ message: `Note ${req.params.id} has been deleted successfully` })
};
