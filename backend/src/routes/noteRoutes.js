import express from "express";
import {
  createNote,
  deleteNote,
  getAllNote,
  updateNote,
  getNoteById,
} from "../controllers/notesController.js";

const router = express.Router(); // Rename 'noteRotes' to 'router'

router.get("/", getAllNote);
router.get("/:id", getNoteById);

router.post("/", createNote);

router.put("/:id", updateNote);

router.delete("/:id", deleteNote);

export default router; // Export 'router'
