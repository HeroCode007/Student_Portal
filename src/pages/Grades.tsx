import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { TrendingUp, Award, BookOpen } from 'lucide-react';

function Grades() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const coursesData = await api.getCourses();

      // Add mock grades to courses for demo
      const coursesWithGrades = coursesData.map((course: any) => ({
        ...course,
        grade: getRandomGrade(),
        credits: 3,
      }));

      setCourses(coursesWithGrades);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to generate random grades for demo
  const getRandomGrade = () => {
    const grades = ['A', 'A-', 'B+', 'B', 'B-', 'C+'];
    return grades[Math.floor(Math.random() * grades.length)];
  };

  const getGradePoint = (grade: string) => {
    const gradePoints: any = {
      'A': 4.0,
      'A-': 3.7,
      'B+': 3.3,
      'B': 3.0,
      'B-': 2.7,
      'C+': 2.3,
      'C': 2.0,
      'C-': 1.7,
      'D': 1.0,
      'F': 0.0,
    };
    return gradePoints[grade] || 0;
  };

  const calculateSemesterGPA = () => {
    if (courses.length === 0) return '0.00';
    const totalPoints = courses.reduce((sum, course) =>
      sum + (getGradePoint(course.grade) * course.credits), 0
    );
    const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
    return (totalPoints / totalCredits).toFixed(2);
  };

  const getTotalCredits = () => {
    return courses.reduce((sum, course) => sum + course.credits, 0);
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-400 bg-green-400/20';
    if (grade.startsWith('B')) return 'text-blue-400 bg-blue-400/20';
    if (grade.startsWith('C')) return 'text-yellow-400 bg-yellow-400/20';
    return 'text-red-400 bg-red-400/20';
  };

  const getProgressWidth = (grade: string) => {
    const point = getGradePoint(grade);
    return `${(point / 4.0) * 100}%`;
  };

  if (loading) {
    return (
      <div className="p-4 space-y-6">
        <h1 className="text-3xl font-bold text-white">Grades</h1>
        <p className="text-gray-300">Loading grades...</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Grades</h1>
        <p className="text-gray-300">View your academic performance</p>
      </div>

      {/* GPA Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 rounded-xl bg-gradient-to-br from-indigo-600/30 to-purple-600/30 backdrop-blur-xl border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm">Semester GPA</p>
              <p className="text-4xl font-bold text-white mt-1">{calculateSemesterGPA()}</p>
            </div>
            <div className="p-3 rounded-full bg-indigo-500/30">
              <TrendingUp className="h-8 w-8 text-indigo-300" />
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl bg-gradient-to-br from-teal-600/30 to-green-600/30 backdrop-blur-xl border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm">Total Credits</p>
              <p className="text-4xl font-bold text-white mt-1">{getTotalCredits()}</p>
            </div>
            <div className="p-3 rounded-full bg-teal-500/30">
              <BookOpen className="h-8 w-8 text-teal-300" />
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl bg-gradient-to-br from-amber-600/30 to-orange-600/30 backdrop-blur-xl border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm">Courses Completed</p>
              <p className="text-4xl font-bold text-white mt-1">{courses.length}</p>
            </div>
            <div className="p-3 rounded-full bg-amber-500/30">
              <Award className="h-8 w-8 text-amber-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Course Grades Table */}
      <div className="rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden">
        <div className="p-4 border-b border-white/10">
          <h2 className="text-xl font-semibold text-white">Course Grades</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Course</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Code</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Credits</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Grade</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Points</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Performance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {courses.map((course) => (
                <tr key={course._id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-white font-medium">{course.name}</p>
                    <p className="text-sm text-gray-400">{course.instructor}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{course.code}</td>
                  <td className="px-6 py-4 text-gray-300">{course.credits}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getGradeColor(course.grade)}`}>
                      {course.grade}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{getGradePoint(course.grade).toFixed(1)}</td>
                  <td className="px-6 py-4">
                    <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
                        style={{ width: getProgressWidth(course.grade) }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grade Distribution */}
      <div className="rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Grade Point Scale</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { grade: 'A', points: '4.0', color: 'bg-green-500/30 border-green-400/30' },
            { grade: 'A-', points: '3.7', color: 'bg-green-500/20 border-green-400/20' },
            { grade: 'B+', points: '3.3', color: 'bg-blue-500/30 border-blue-400/30' },
            { grade: 'B', points: '3.0', color: 'bg-blue-500/20 border-blue-400/20' },
            { grade: 'B-', points: '2.7', color: 'bg-blue-500/10 border-blue-400/10' },
            { grade: 'C+', points: '2.3', color: 'bg-yellow-500/30 border-yellow-400/30' },
            { grade: 'C', points: '2.0', color: 'bg-yellow-500/20 border-yellow-400/20' },
            { grade: 'C-', points: '1.7', color: 'bg-yellow-500/10 border-yellow-400/10' },
            { grade: 'D', points: '1.0', color: 'bg-red-500/20 border-red-400/20' },
            { grade: 'F', points: '0.0', color: 'bg-red-500/30 border-red-400/30' },
          ].map((item) => (
            <div
              key={item.grade}
              className={`p-3 rounded-lg border ${item.color} text-center`}
            >
              <p className="text-lg font-bold text-white">{item.grade}</p>
              <p className="text-sm text-gray-400">{item.points} pts</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Grades;
