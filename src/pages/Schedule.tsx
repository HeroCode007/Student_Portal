import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Edit2, Save, X } from 'lucide-react';

function Schedule() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCourse, setEditingCourse] = useState<string | null>(null);
  const [editSchedule, setEditSchedule] = useState<any[]>([]);

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

  const handleEditSchedule = (course: any) => {
    setEditingCourse(course._id);
    setEditSchedule([...course.schedule]);
  };

  const handleSaveSchedule = async (courseId: string) => {
    try {
      await api.updateCourse(courseId, { schedule: editSchedule });
      setEditingCourse(null);
      fetchCourses();
    } catch (error) {
      console.error('Error updating schedule:', error);
      alert('Failed to update schedule. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    setEditingCourse(null);
    setEditSchedule([]);
  };

  const updateScheduleSlot = (index: number, field: 'day' | 'time', value: string) => {
    const newSchedule = [...editSchedule];
    newSchedule[index][field] = value;
    setEditSchedule(newSchedule);
  };

  const addScheduleSlot = () => {
    setEditSchedule([...editSchedule, { day: '', time: '' }]);
  };

  const removeScheduleSlot = (index: number) => {
    const newSchedule = editSchedule.filter((_, i) => i !== index);
    setEditSchedule(newSchedule);
  };

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = [
    '8:00 AM - 9:30 AM',
    '9:00 AM - 10:30 AM',
    '10:00 AM - 11:30 AM',
    '11:00 AM - 12:30 PM',
    '12:30 PM - 2:00 PM',
    '2:00 PM - 3:30 PM',
    '3:30 PM - 5:00 PM',
  ];

  // Create timetable grid
  const timetable: any = {};
  daysOfWeek.forEach(day => {
    timetable[day] = {};
  });

  courses.forEach(course => {
    course.schedule?.forEach((slot: any) => {
      if (timetable[slot.day]) {
        if (!timetable[slot.day][slot.time]) {
          timetable[slot.day][slot.time] = [];
        }
        timetable[slot.day][slot.time].push(course);
      }
    });
  });

  if (loading) {
    return (
      <div className="p-4 space-y-6">
        <h1 className="text-3xl font-bold text-white">Class Schedule</h1>
        <p className="text-gray-300">Loading schedule...</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Class Schedule</h1>
        <p className="text-gray-300">View and manage your weekly timetable</p>
      </div>

      {/* Timetable Grid */}
      <div className="overflow-x-auto">
        <div className="min-w-max">
          <div className="grid grid-cols-6 gap-2">
            {/* Header Row */}
            <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
              <p className="text-sm font-semibold text-gray-300 text-center">Time</p>
            </div>
            {daysOfWeek.map(day => (
              <div key={day} className="p-3 bg-white/5 border border-white/10 rounded-lg">
                <p className="text-sm font-semibold text-white text-center">{day}</p>
              </div>
            ))}

            {/* Time Slots */}
            {timeSlots.map(time => (
              <>
                <div key={time} className="p-3 bg-white/5 border border-white/10 rounded-lg">
                  <p className="text-xs text-gray-400 text-center">{time}</p>
                </div>
                {daysOfWeek.map(day => {
                  const classes = timetable[day][time] || [];
                  return (
                    <div
                      key={`${day}-${time}`}
                      className="p-2 bg-white/5 border border-white/10 rounded-lg min-h-[80px]"
                    >
                      {classes.map((course: any, idx: number) => (
                        <div
                          key={idx}
                          className="p-2 mb-1 bg-indigo-600/30 border border-indigo-400/30 rounded text-center"
                        >
                          <p className="text-xs font-semibold text-white">{course.code}</p>
                          <p className="text-xs text-gray-300">{course.name}</p>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </>
            ))}
          </div>
        </div>
      </div>

      {/* Course Schedule Editor */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Edit Course Schedules</h2>
        <div className="space-y-4">
          {courses.map(course => (
            <div
              key={course._id}
              className="p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">{course.name}</h3>
                  <p className="text-sm text-gray-400">Code: {course.code}</p>

                  {editingCourse === course._id ? (
                    <div className="mt-3 space-y-2">
                      {editSchedule.map((slot, index) => (
                        <div key={index} className="flex gap-2">
                          <select
                            value={slot.day}
                            onChange={(e) => updateScheduleSlot(index, 'day', e.target.value)}
                            className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                          >
                            <option value="">Select Day</option>
                            {daysOfWeek.map(day => (
                              <option key={day} value={day}>{day}</option>
                            ))}
                          </select>
                          <select
                            value={slot.time}
                            onChange={(e) => updateScheduleSlot(index, 'time', e.target.value)}
                            className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                          >
                            <option value="">Select Time</option>
                            {timeSlots.map(time => (
                              <option key={time} value={time}>{time}</option>
                            ))}
                          </select>
                          {editSchedule.length > 1 && (
                            <button
                              onClick={() => removeScheduleSlot(index)}
                              className="px-2 text-red-400 hover:text-red-300"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        onClick={addScheduleSlot}
                        className="text-sm text-indigo-400 hover:text-indigo-300"
                      >
                        + Add time slot
                      </button>
                    </div>
                  ) : (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {course.schedule?.map((slot: any, index: number) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-1 rounded-full bg-teal-800/30 text-teal-200"
                        >
                          {slot.day} {slot.time}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  {editingCourse === course._id ? (
                    <>
                      <button
                        onClick={() => handleSaveSchedule(course._id)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
                      >
                        <Save className="h-4 w-4" />
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="flex items-center gap-1 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                      >
                        <X className="h-4 w-4" />
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleEditSchedule(course)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
                    >
                      <Edit2 className="h-4 w-4" />
                      Edit
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Schedule;
