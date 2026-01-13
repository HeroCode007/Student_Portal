import { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, BookOpen, Save, Edit2, GraduationCap } from 'lucide-react';

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Muhammad Umar Munir',
    email: '2023s-mulbscs-016@mul.edu.pk',
    phone: '0303-0192804',
    address: 'Lahore, Pakistan',
    dateOfBirth: '2003-07-12',
    studentId: '2023s-mulbscs-016',
    major: 'BS Computer Science',
    semester: '6th Semester',
    gpa: '3.0',
    university: 'Minhaj University Lahore',
  });

  const courses = [
    { code: 'CS-601', name: 'Software Engineering', credits: 3 },
    { code: 'CS-602', name: 'Artificial Intelligence', credits: 3 },
    { code: 'CS-603', name: 'Computer Networks', credits: 3 },
    { code: 'CS-604', name: 'Database Systems', credits: 3 },
    { code: 'CS-605', name: 'Web Technologies', credits: 3 },
    { code: 'CS-606', name: 'Operating Systems', credits: 3 },
  ];

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
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-lg transition shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Save className="h-5 w-5" />
            Save Changes
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white rounded-lg transition shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Edit2 className="h-5 w-5" />
            Edit Profile
          </button>
        )}
      </div>

      {/* Profile Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture & Quick Info */}
        <div className="p-6 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-sky-400/20 shadow-xl">
          <div className="flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 flex items-center justify-center mb-4 shadow-2xl ring-4 ring-sky-400/30">
              <User className="h-16 w-16 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">{profile.name}</h2>
            <p className="text-sky-300">Roll No: {profile.studentId}</p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-sky-500/30 to-blue-500/30 text-sky-200 text-sm font-semibold ring-1 ring-sky-400/30">
                {profile.major}
              </span>
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-orange-500/30 to-amber-500/30 text-orange-200 text-sm font-semibold ring-1 ring-orange-400/30">
                {profile.semester}
              </span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3 text-gray-300 bg-gradient-to-r from-sky-500/10 to-blue-500/10 py-3 rounded-lg">
                <BookOpen className="h-5 w-5 text-sky-400" />
                <span className="font-semibold">GPA: <span className="text-sky-300">{profile.gpa}</span></span>
              </div>
              <div className="flex items-center justify-center gap-3 text-gray-300 bg-gradient-to-r from-sky-500/10 to-blue-500/10 py-3 rounded-lg">
                <GraduationCap className="h-5 w-5 text-sky-400" />
                <span className="font-semibold text-center">{profile.university}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="lg:col-span-2 p-6 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-sky-400/20 shadow-xl">
          <h3 className="text-2xl font-bold text-white mb-6">Personal Information</h3>

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
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500"
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
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500"
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
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500"
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
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500"
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
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                />
              ) : (
                <p className="text-white">{profile.address}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Academic Information */}
      <div className="p-6 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-sky-400/20 shadow-xl">
        <h3 className="text-2xl font-bold text-white mb-6">Academic Information</h3>

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

      {/* 6th Semester Courses */}
      <div className="p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-sky-400/20 shadow-xl">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-sky-400 to-blue-500 rounded-lg">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          6th Semester Courses
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div
              key={course.code}
              className="p-5 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 hover:border-sky-400/50 hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-3">
                <h4 className="text-white font-bold text-lg">{course.code}</h4>
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-sky-500 to-blue-500 text-white text-xs font-semibold shadow-md">
                  {course.credits} Credits
                </span>
              </div>
              <p className="text-gray-200 text-sm font-medium">{course.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
