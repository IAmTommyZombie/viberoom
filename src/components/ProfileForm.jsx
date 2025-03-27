import { useState, useEffect } from "react";

function ProfileForm({ onSave, initialData }) {
  const [name, setName] = useState(initialData?.name || "");
  const [bio, setBio] = useState(initialData?.bio || "");
  const [videoFile, setVideoFile] = useState(null);
  const [location, setLocation] = useState(initialData?.location || "");
  const [rentRange, setRentRange] = useState(initialData?.rentRange || "");
  const [age, setAge] = useState(initialData?.age || "");
  const [gender, setGender] = useState(initialData?.gender || "");
  const [roommates, setRoommates] = useState(initialData?.roommates || "");
  const [bedtime, setBedtime] = useState(initialData?.bedtime || "");
  const [workStyle, setWorkStyle] = useState(initialData?.workStyle || "");
  const [foodPrefs, setFoodPrefs] = useState(initialData?.foodPrefs || "");
  const [parking, setParking] = useState(initialData?.parking || "");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setBio(initialData.bio);
      setLocation(initialData.location);
      setRentRange(initialData.rentRange);
      setAge(initialData.age);
      setGender(initialData.gender);
      setRoommates(initialData.roommates);
      setBedtime(initialData.bedtime);
      setWorkStyle(initialData.workStyle);
      setFoodPrefs(initialData.foodPrefs);
      setParking(initialData.parking);
    }
  }, [initialData]);

  const genderOptions = [
    "Male",
    "Female",
    "Non-binary",
    "Genderqueer",
    "Genderfluid",
    "Agender",
    "Bigender",
    "Two-Spirit",
    "Other",
    "Prefer not to say",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const videoUrl = videoFile
      ? URL.createObjectURL(videoFile)
      : initialData?.videoUrl ||
        "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4";
    onSave({
      name,
      bio,
      videoUrl,
      id: initialData?.id || Date.now(),
      vibeRatings: initialData?.vibeRatings || [],
      location,
      rentRange,
      age: parseInt(age) || 25,
      gender: gender || "Prefer not to say",
      roommates: parseInt(roommates) || 1,
      bedtime,
      workStyle,
      foodPrefs,
      parking,
    });
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-purple-600 mb-4">
        {initialData ? "Edit Profile" : "Create Your Profile"}
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
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="" disabled>
            Select Gender
          </option>
          {genderOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
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
