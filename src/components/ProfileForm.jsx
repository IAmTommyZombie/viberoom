import { useState } from "react";

function ProfileForm({ onSave }) {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [location, setLocation] = useState("");
  const [rentRange, setRentRange] = useState("");
  const [age, setAge] = useState("");
  const [roommates, setRoommates] = useState("");
  const [bedtime, setBedtime] = useState("");
  const [workStyle, setWorkStyle] = useState("");
  const [foodPrefs, setFoodPrefs] = useState("");
  const [parking, setParking] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const videoUrl = videoFile
      ? URL.createObjectURL(videoFile)
      : "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4";
    onSave({
      name,
      bio,
      videoUrl,
      id: Date.now(),
      vibeRatings: [],
      location,
      rentRange,
      age: parseInt(age) || 25, // Default to 25 if invalid
      roommates: parseInt(roommates) || 1,
      bedtime,
      workStyle,
      foodPrefs,
      parking,
    });
    setName("");
    setBio("");
    setVideoFile(null);
    setLocation("");
    setRentRange("");
    setAge("");
    setRoommates("");
    setBedtime("");
    setWorkStyle("");
    setFoodPrefs("");
    setParking("");
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
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location (e.g., City, State)"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="text"
          value={rentRange}
          onChange={(e) => setRentRange(e.target.value)}
          placeholder="Rent Range (e.g., $800-$1200)"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Age"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="number"
          value={roommates}
          onChange={(e) => setRoommates(e.target.value)}
          placeholder="Preferred Roommates"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="text"
          value={bedtime}
          onChange={(e) => setBedtime(e.target.value)}
          placeholder="Bedtime (e.g., 11 PM)"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="text"
          value={workStyle}
          onChange={(e) => setWorkStyle(e.target.value)}
          placeholder="Work Style (e.g., Remote)"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="text"
          value={foodPrefs}
          onChange={(e) => setFoodPrefs(e.target.value)}
          placeholder="Food Preferences (e.g., Vegan)"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="text"
          value={parking}
          onChange={(e) => setParking(e.target.value)}
          placeholder="Parking Needed? (Yes/No)"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
