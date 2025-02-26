import { useState } from "react";

const CreateCampaignPanel = ({ createCampaign }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      console.log(title + description + goal +  duration);
      const success = await createCampaign(title, description, goal, duration);
      if (success) {
        setMessage("✅ Campaña creada con éxito!");
        setTitle("");
        setDescription("");
        setGoal("");
        setDuration("");
      } else {
        setMessage("❌ Error al crear la campaña.");
      }
    } catch (error) {
      setMessage("❌ Ocurrió un error: " + error.message);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Crear Nueva Campaña</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
          required
        ></textarea>
        <input
          type="number"
          placeholder="Meta en ETH"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Duración en días"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Creando..." : "Crear Campaña"}
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default CreateCampaignPanel;