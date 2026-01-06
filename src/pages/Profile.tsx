import { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, BookOpen, Save, Edit2, GraduationCap } from 'lucide-react';

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Waqar ul Hasan',
    email: '2023s-mulbscs@mul.edu.pk',
    phone: '0311-6550203',
    address: 'Lahore, Pakistan',
    studentId: '013',
    major: 'BS Computer Science',
    semester: '6th Semester',
    gpa: '3.0',
    university: 'Minhaj University Lahore',
  });

  const handleInputChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Profile</h1>
          <p className="text-gray-300">Manage your personal information</p>
        </div>
        {isEditing ? (
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
          >
            <Save className="h-5 w-5" />
            Save Changes
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
          >
            <Edit2 className="h-5 w-5" />
            Edit Profile
          </button>
        )}
      </div>

      {/* Profile Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture & Quick Info */}
        <div className="p-6 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10">
          <div className="flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4">
              <span className="text-4xl font-bold text-white">WH</span>
            </div>
            <h2 className="text-2xl font-bold text-white">{profile.name}</h2>
            <p className="text-gray-400">Roll No: {profile.studentId}</p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <span className="px-3 py-1 rounded-full bg-indigo-600/30 text-indigo-300 text-sm">
                {profile.major}
              </span>
              <span className="px-3 py-1 rounded-full bg-teal-600/30 text-teal-300 text-sm">
                {profile.semester}
              </span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-300">
                <BookOpen className="h-5 w-5 text-indigo-400" />
                <span>GPA: {profile.gpa}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <GraduationCap className="h-5 w-5 text-indigo-400" />
                <span>{profile.university}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="lg:col-span-2 p-6 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-6">Personal Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                <User className="h-4 w-4 inline mr-2" />
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                />
              ) : (
                <p className="text-white">{profile.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                <Mail className="h-4 w-4 inline mr-2" />
                Email Address
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                />
              ) : (
                <p className="text-white">{profile.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                <Phone className="h-4 w-4 inline mr-2" />
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                />
              ) : (
                <p className="text-white">{profile.phone}</p>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                <Calendar className="h-4 w-4 inline mr-2" />
                Date of Birth
              </label>
              {isEditing ? (
                <input
                  type="date"
                  value={profile.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                />
              ) : (
                <p className="text-white">{new Date(profile.dateOfBirth).toLocaleDateString()}</p>
              )}
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-400 mb-2">
                <MapPin className="h-4 w-4 inline mr-2" />
                Address
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profile.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                />
              ) : (
                <p className="text-white">{profile.address}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Academic Information */}
      <div className="p-6 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10">
        <h3 className="text-xl font-semibold text-white mb-6">Academic Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Roll Number</label>
            <p className="text-white font-medium">{profile.studentId}</p>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Program</label>
            <p className="text-white font-medium">{profile.major}</p>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Semester</label>
            <p className="text-white font-medium">{profile.semester}</p>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">University</label>
            <p className="text-white font-medium">{profile.university}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;