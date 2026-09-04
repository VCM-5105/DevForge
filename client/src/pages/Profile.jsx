import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import { useAuth } from "../hooks/useAuth";

const Profile = () => {
  const { user, updateUserData } = useAuth();
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    bio: "",
    skills: "",
    github: "",
    linkedin: "",
    avatar: "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await API.get("/auth/profile");
        const data = response.data.data;
        setProfileData({
          name: data.name || "",
          email: data.email || "",
          bio: data.bio || "Lorem ipsum dolor sit amet, full-stack developer passionate about building web apps.",
          skills: Array.isArray(data.skills) ? data.skills.join(", ") : data.skills || "React, Node.js, Express, MongoDB",
          github: data.github || "",
          linkedin: data.linkedin || "",
          avatar: data.avatar || "",
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setSaving(true);

    try {
      const formData = new FormData();
      formData.append("name", profileData.name);
      formData.append("bio", profileData.bio);
      formData.append("skills", profileData.skills);
      formData.append("github", profileData.github);
      formData.append("linkedin", profileData.linkedin);

      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      const response = await API.put("/auth/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const updated = response.data.data;
      updateUserData(updated);
      setMessage("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] bg-gray-50">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <main className="flex-1 p-6 md:p-10 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Developer Profile</h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage your personal profile details, bio, links, and avatar image.
          </p>
        </div>

        {message && (
          <div
            className={`mb-6 p-3 text-xs rounded-lg border ${
              message.includes("success")
                ? "bg-green-50 text-green-700 border-green-200"
                : "bg-red-50 text-red-700 border-red-200"
            }`}
          >
            {message}
          </div>
        )}

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          {loading ? (
            <div className="text-center py-8 text-xs text-gray-400">
              Loading profile
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
                <div className="w-16 h-16 rounded-full bg-neutral-200 overflow-hidden flex items-center justify-center border border-gray-300 font-bold text-gray-500 text-xl">
                  {profileData.avatar ? (
                    <img
                      src={`http://localhost:5000${profileData.avatar}`}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    profileData.name.charAt(0).toUpperCase() || "D"
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Upload Profile Picture
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-neutral-900 file:text-white hover:file:bg-neutral-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Email Address (Read-only)
                  </label>
                  <input
                    type="email"
                    disabled
                    value={profileData.email}
                    className="w-full px-3.5 py-2 text-xs border border-gray-200 bg-gray-50 text-gray-500 rounded-lg cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Bio / Developer Tagline
                </label>
                <textarea
                  rows="3"
                  name="bio"
                  value={profileData.bio}
                  onChange={handleChange}
                  placeholder="Lorem ipsum dolor sit amet, full-stack developer..."
                  className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Skills (comma separated)
                </label>
                <input
                  type="text"
                  name="skills"
                  value={profileData.skills}
                  onChange={handleChange}
                  placeholder="React, Node.js, Express, MongoDB, Tailwind"
                  className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    GitHub Profile Link
                  </label>
                  <input
                    type="url"
                    name="github"
                    value={profileData.github}
                    onChange={handleChange}
                    placeholder="https://github.com/username"
                    className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    LinkedIn Profile Link
                  </label>
                  <input
                    type="url"
                    name="linkedin"
                    value={profileData.linkedin}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors disabled:opacity-50"
                >
                  {saving ? "Saving Changes..." : "Save Profile"}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
};

export default Profile;