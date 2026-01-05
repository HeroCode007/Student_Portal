import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Plus, Trash2, X, BookOpen, User, Calendar } from 'lucide-react';

function Courses() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCourse, setNewCourse] = useState({
    name: '',
    code: '',
    instructor: '',
    schedule: [{ day: '', time: '' }]
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const data = await api.getCourses();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const studentId = '679f3bb2dc3f7d35f5e03f12';
      await api.createCourse({ ...newCourse, studentId });
      setShowAddForm(false);
      setNewCourse({
        name: '',
        code: '',
        instructor: '',
        schedule: [{ day: '', time: '' }]
      });
      fetchCourses();
    } catch (error) {
      console.error('Error adding course:', error);
      alert('Failed to add course. Please try again.');
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await api.deleteCourse(courseId);
        fetchCourses();
      } catch (error) {
        console.error('Error deleting course:', error);
        alert('Failed to delete course. Please try again.');
      }
    }
  };

  const addScheduleSlot = () => {
    setNewCourse({
      ...newCourse,
      schedule: [...newCourse.schedule, { day: '', time: '' }]
    });
  };

  const removeScheduleSlot = (index: number) => {
    const newSchedule = newCourse.schedule.filter((_, i) => i !== index);
    setNewCourse({ ...newCourse, schedule: newSchedule });
  };

  const updateScheduleSlot = (index: number, field: 'day' | 'time', value: string) => {
    const newSchedule = [...newCourse.schedule];
    newSchedule[index][field] = value;
    setNewCourse({ ...newCourse, schedule: newSchedule });
  };

  if (loading) {
    return (
      <div className="p-4 space-y-6 animate-fadeIn">
        <h1 className="text-4xl font-bold gradient-text">My Courses</h1>
        <div className="glass-card p-8 text-center">
          <div className="animate-pulse">
            <div className="h-4 bg-white/10 rounded w-1/4 mx-auto mb-4"></div>
            <div className="h-4 bg-white/10 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex justify-between items-center animate-slideIn">
        <div>
          <h1 className="text-4xl font-bold gradient-text mb-2">My Courses</h1>
          <p className="text-gray-300 text-lg flex items-center gap-2">
            <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm font-semibold">
              {courses.length} Courses
            </span>
            enrolled this semester
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Add Course
        </button>
      </div>

      {/* Add Course Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 animate-fadeIn p-4">
          <div className="glass-card-static p-8 max-w-lg w-full animate-scaleIn shadow-2xl custom-scrollbar max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold gradient-text">Add New Course</h2>
                <p className="text-sm text-gray-400 mt-1">Fill in the course details below</p>
              </div>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-lg transition"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleAddCourse} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Course Name
                </label>
                <input
                  type="text"
                  required
                  value={newCourse.name}
                  onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                  className="input-field"
                  placeholder="e.g., Web Development"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Course Code
                  </label>
                  <input
                    type="text"
                    required
                    value={newCourse.code}
                    onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                    className="input-field"
                    placeholder="e.g., CS-101"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Instructor
                  </label>
                  <input
                    type="text"
                    required
                    value={newCourse.instructor}
                    onChange={(e) => setNewCourse({ ...newCourse, instructor: e.target.value })}
                    className="input-field"
                    placeholder="Dr. John Smith"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Schedule
                </label>
                <div className="space-y-3">
                  {newCourse.schedule.map((slot, index) => (
                    <div key={index} className="flex gap-2 p-3 bg-white/5 rounded-lg border border-white/10">
                      <select
                        required
                        value={slot.day}
                        onChange={(e) => updateScheduleSlot(index, 'day', e.target.value)}
                        className="select-field flex-1"
                      >
                        <option value="">Select Day</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                      </select>
                      <input
                        type="text"
                        required
                        value={slot.time}
                        onChange={(e) => updateScheduleSlot(index, 'time', e.target.value)}
                        className="input-field flex-1"
                        placeholder="9:00 AM - 10:30 AM"
                      />
                      {newCourse.schedule.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeScheduleSlot(index)}
                          className="px-3 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addScheduleSlot}
                    className="w-full px-4 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 rounded-lg transition border border-indigo-500/30 text-sm font-medium"
                  >
                    + Add another time slot
                  </button>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-white/10">
                <button type="submit" className="btn-primary flex-1">
                  Add Course
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Courses List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <div
            key={course._id}
            style={{ animationDelay: `${index * 0.1}s` }}
            className="glass-card p-6 hover:shadow-2xl hover:shadow-indigo-500/10 animate-fadeIn group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/0 to-purple-600/0 group-hover:from-indigo-600/5 group-hover:to-purple-600/5 transition-all duration-300 pointer-events-none"></div>

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="h-5 w-5 text-indigo-400" />
                    <span className="px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded text-xs font-semibold">
                      {course.code}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-1 group-hover:text-indigo-300 transition">
                    {course.name}
                  </h2>
                  <p className="text-sm text-gray-400 flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {course.instructor}
                  </p>
                </div>

                <button
                  onClick={() => handleDeleteCourse(course._id)}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-all"
                  title="Delete Course"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>

              <div className="pt-4 border-t border-white/10">
                <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Schedule</p>
                <div className="flex flex-wrap gap-2">
                  {course.schedule?.map((slot: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs"
                    >
                      <Calendar className="h-3 w-3" />
                      <span className="font-medium">{slot.day}</span>
                      <span className="text-gray-500">•</span>
                      <span>{slot.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {courses.length === 0 && (
        <div className="glass-card p-12 text-center">
          <BookOpen className="h-16 w-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No Courses Yet</h3>
          <p className="text-gray-400 mb-6">Start by adding your first course</p>
          <button onClick={() => setShowAddForm(true)} className="btn-primary mx-auto">
            <Plus className="h-5 w-5 inline mr-2" />
            Add Your First Course
          </button>
        </div>
      )}
    </div>
  );
}

export default Courses;
