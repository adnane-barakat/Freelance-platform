import React, { useState } from 'react';

function Profile() {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'Experienced freelancer specializing in web development and design.',
    skills: ['JavaScript', 'React', 'Node.js', 'UI/UX Design']
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Here you would typically send the updated profile to your backend
    console.log('Updated profile:', profile);
  };

  return (
      <>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">User Profile</h1>
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            {isEditing ? (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                      Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                      Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bio">
                      Bio
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="bio"
                        name="bio"
                        value={profile.bio}
                        onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="skills">
                      Skills (comma-separated)
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="skills"
                        type="text"
                        name="skills"
                        value={profile.skills.join(', ')}
                        onChange={(e) => setProfile(prev => ({
                          ...prev,
                          skills: e.target.value.split(',').map(skill => skill.trim())
                        }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                      Save Changes
                    </button>
                    <button
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
            ) : (
                <div>
                  <p className="mb-2"><strong>Name:</strong> {profile.name}</p>
                  <p className="mb-2"><strong>Email:</strong> {profile.email}</p>
                  <p className="mb-2"><strong>Bio:</strong> {profile.bio}</p>
                  <p className="mb-4"><strong>Skills:</strong> {profile.skills.join(', ')}</p>
                  <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </button>
                </div>
            )}
          </div>
        </div>
      </>

  );
}

export default Profile;

