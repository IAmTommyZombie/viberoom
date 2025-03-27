import { useState } from "react";

function ProfileForm({ onSave }) {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [videoFile, setVideoFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const videoUrl = videoFile
      ? URL.createObjectURL(videoFile)
      : "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4"; // Mock URL if no file
    onSave({ name, bio, videoUrl, id: Date.now(), vibeRatings: [] });
    setName("");
    setBio("");
    setVideoFile(null);
  };

  return (
    <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-purple-600 mb-4">
        Create Your Profile
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell us about yourself"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideoFile(e.target.files[0])}
          className="w-full mb-4"
        />
        <button
          type="submit"
          className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
}

export default ProfileForm;
