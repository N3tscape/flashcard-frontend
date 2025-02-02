import { useState, useEffect } from "react";
import { getFlashcards, createFlashcard, deleteFlashcard } from "../services/api";

const Dashboard = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [newFlashcard, setNewFlashcard] = useState({ question: "", answer: "", tags: "" });

    useEffect(() => {
        fetchFlashcards();
    }, []);

    const fetchFlashcards = async () => {
        const data = await getFlashcards();
        setFlashcards(data);
    };

    const handleCreateFlashcard = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        await createFlashcard(newFlashcard, token);
        fetchFlashcards();
        setNewFlashcard({ question: "", answer: "", tags: "" });
    };

    const handleDeleteFlashcard = async (id) => {
        const token = localStorage.getItem("token");
        await deleteFlashcard(id, token);
        fetchFlashcards();
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-4">Dashboard</h2>
            <form onSubmit={handleCreateFlashcard} className="mb-6">
                <input
                    type="text"
                    placeholder="Question"
                    value={newFlashcard.question}
                    onChange={(e) => setNewFlashcard({ ...newFlashcard, question: e.target.value })}
                    className="w-full p-2 mb-3 border rounded"
                />
                <input
                    type="text"
                    placeholder="Réponse"
                    value={newFlashcard.answer}
                    onChange={(e) => setNewFlashcard({ ...newFlashcard, answer: e.target.value })}
                    className="w-full p-2 mb-3 border rounded"
                />
                <input
                    type="text"
                    placeholder="Tags (séparés par des virgules)"
                    value={newFlashcard.tags}
                    onChange={(e) => setNewFlashcard({ ...newFlashcard, tags: e.target.value })}
                    className="w-full p-2 mb-3 border rounded"
                />
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                    Ajouter une Flashcard
                </button>
            </form>

            <div>
                {flashcards.map((flashcard) => (
                    <div key={flashcard._id} className="p-4 bg-gray-100 mb-4 rounded">
                        <h3 className="text-xl">{flashcard.question}</h3>
                        <p>{flashcard.answer}</p>
                        <button
                            onClick={() => handleDeleteFlashcard(flashcard._id)}
                            className="text-red-500 mt-2"
                        >
                            Supprimer
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
