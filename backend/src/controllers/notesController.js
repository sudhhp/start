import Note from "../models/Note.js"; // Add the .js extension
export async function getAllNote(req, res) {
  try {
    const note = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(note);
  } catch (error) {
    console.error("error get all notes", error);
    res.status(500).json({ message: "internal server error" });
  }
  // res.status(200).json({ message: "you just fetched notes" });
  // res.status(200).json({ message: "you just fetched notes" });
}

export async function getNoteById(req, res) {
  try {
    const noteById = await Note.findById(req.params.id);
    if (!noteById) {
      return res.status(404).json({ message: "Note doent Found" });
    }
    res.status(200).json(noteById);
  } catch (error) {
    console.error("error get the note", error);
    res.status(500).json({ message: "internal server error" });
  }
  // res.status(200).json({ message: "you just fetched notes" });
  // res.status(200).json({ message: "you just fetched notes" });
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    const nnote = await newNote.save();
    res.status(201).json({
      message: "note created successfully",
      note: nnote,
    });
  } catch (error) {
    console.error("error creating new note", error);
    res.status(500).json({ message: "Create Note Failed" });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const UpNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true } // Return the updated note
    );

    if (!UpNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({
      message: "Note updated successfully",
      note: UpNote, // Include the updated note in the response
    });
  } catch (error) {
    console.error("Error updating note:", error); // Log the actual error
    res.status(500).json({ message: "Update Note Failed" });
  }
}

export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      return res.status(404).json({ message: "Note by given id not found" });
    }
    res.status(200).json({ message: "Note was deleted" });
  } catch (error) {
    console.error("Error deleting", error); // Log the actual error
    res.status(500).json({ message: "deleting Note Failed" });
  }
}
