import React, { useState, useEffect } from "react";

const API_URL = "https://jsonplaceholder.typicode.com/posts"; // fake REST API

export default function NotesApp() {
  const [notes, setNotes] = useState([]);

  // Load notes from localStorage on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("notes") || "[]");
    setNotes(saved);
  }, []);

  // Persist notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Add a new note (local only)
  const addNote = () => {
    const newNote = {
      id: Date.now(),
      title: `Note ${notes.length + 1}`,
      updatedAt: Date.now(),
      dirty: true, // mark as unsynced
    };
    setNotes((prev) => [...prev, newNote]);
  };

  // Push local → server
  const pushNotes = async () => {
    for (const note of notes) {
      if (note.dirty) {
        await fetch(`${API_URL}/${note.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(note),
        });
        note.dirty = false; // mark synced
      }
    }
  };

  // Pull server → local
  const pullNotes = async () => {
    const res = await fetch(API_URL + "?_limit=5");
    const serverNotes = await res.json();

    const merged = [...notes];
    serverNotes.forEach((serverNote) => {
      const local = merged.find((n) => n.id === serverNote.id);
      if (!local) {
        merged.push(serverNote);
      } else if (
        serverNote.updatedAt &&
        serverNote.updatedAt > local.updatedAt
      ) {
        Object.assign(local, serverNote);
      }
    });

    setNotes(merged);
  };

  // Full sync: push local → server, then pull back
  const syncNotes = async () => {
    console.log("🔄 Sync started…");
    await pushNotes();
    await pullNotes();
    console.log("✅ Sync finished");
  };

  // 👇 Sync automatically when app comes online
  useEffect(() => {
    const handleOnline = () => {
      console.log("📶 Back online → syncing…");
      syncNotes();
    };
    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, [notes]);

  // 👇 Background sync every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (navigator.onLine) {
        syncNotes();
      }
    }, 30_000); // 30 seconds
    return () => clearInterval(interval);
  }, [notes]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">📝 Notes (Auto + Periodic Sync)</h1>
      <button
        onClick={addNote}
        className="px-3 py-1 m-2 bg-blue-500 text-white rounded"
      >
        Add Note
      </button>
      <button
        onClick={syncNotes}
        className="px-3 py-1 m-2 bg-green-500 text-white rounded"
      >
        Manual Sync
      </button>

      <ul className="mt-4">
        {notes.map((note) => (
          <li key={note.id} className="p-2 border-b">
            {note.title}{" "}
            <small>
              ({note.dirty ? "🟥 unsynced" : "✅ synced"} at{" "}
              {new Date(note.updatedAt).toLocaleTimeString()})
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
}
