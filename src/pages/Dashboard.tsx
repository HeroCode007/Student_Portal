import { BookOpen, Clock, TrendingUp, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../services/api';

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalCourses: 0,
    assignmentsDue: 0,
    gpa: 0,
    classesThisWeek: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const courses = await api.getCourses();
        const assignments = await api.getAssignments();
        const student = await api.getStudent('013');

        const pendingAssignments = assignments.filter((a: any) => a.status === 'pending').length;
        const classesThisWeek = courses.reduce((total: number, course: any) =>
          total + (course.schedule?.length || 0), 0
        );

        setStats({
          totalCourses: courses.length,
          assignmentsDue: pendingAssignments,
          gpa: student.gpa || 0,
          classesThisWeek
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statsDisplay = [
    { title: 'Total Courses', value: stats.totalCourses.toString(), icon: BookOpen, color: 'bg-indigo-500/20 text-indigo-300' },
    { title: 'Assignments Due', value: stats.assignmentsDue.toString(), icon: Clock, color: 'bg-amber-500/20 text-amber-300' },
    { title: 'Current GPA', value: stats.gpa.toFixed(1), icon: TrendingUp, color: 'bg-emerald-500/20 text-emerald-300' },
    { title: 'This Week', value: stats.classesThisWeek.toString(), subtitle: 'Classes', icon: Calendar, color: 'bg-purple-500/20 text-purple-300' },
  ];

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-300">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="animate-slideIn">
        <h1 className="text-4xl font-bold gradient-text mb-2">Dashboard</h1>
        <p className="text-gray-300 text-lg">Welcome back! Here's your academic summary.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsDisplay.map((stat, index) => (
          <div
            key={index}
            style={{ animationDelay: `${index * 0.1}s` }}
            className="glass-card p-6 hover:shadow-2xl hover:shadow-purple-500/20 animate-fadeIn group cursor-pointer transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400 mb-1">{stat.title}</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                {stat.subtitle && (
                  <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
                )}
              </div>

              <div className={`p-4 rounded-xl ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="h-7 w-7" />
              </div>
            </div>

            <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                style={{ width: '75%', transition: 'width 1s ease-out' }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="glass-card-static p-8 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="h-1 w-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
          <h3 className="text-2xl font-bold text-white">Quick Actions</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => navigate('/courses')}
            className="group p-6 rounded-xl bg-gradient-to-br from-indigo-600/20 to-indigo-600/5 border border-indigo-500/20 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 text-left transform hover:-translate-y-1"
          >
            <div className="p-3 bg-indigo-500/20 rounded-lg w-fit mb-3 group-hover:bg-indigo-500/30 transition-colors">
              <BookOpen className="h-7 w-7 text-indigo-300" />
            </div>
            <p className="text-base font-semibold text-white mb-1">View Courses</p>
            <p className="text-xs text-gray-400">Manage your courses</p>
          </button>

          <button
            onClick={() => navigate('/assignments')}
            className="group p-6 rounded-xl bg-gradient-to-br from-amber-600/20 to-amber-600/5 border border-amber-500/20 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300 text-left transform hover:-translate-y-1"
          >
            <div className="p-3 bg-amber-500/20 rounded-lg w-fit mb-3 group-hover:bg-amber-500/30 transition-colors">
              <Clock className="h-7 w-7 text-amber-300" />
            </div>
            <p className="text-base font-semibold text-white mb-1">Assignments</p>
            <p className="text-xs text-gray-400">Track your tasks</p>
          </button>

          <button
            onClick={() => navigate('/schedule')}
            className="group p-6 rounded-xl bg-gradient-to-br from-emerald-600/20 to-emerald-600/5 border border-emerald-500/20 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 text-left transform hover:-translate-y-1"
          >
            <div className="p-3 bg-emerald-500/20 rounded-lg w-fit mb-3 group-hover:bg-emerald-500/30 transition-colors">
              <Calendar className="h-7 w-7 text-emerald-300" />
            </div>
            <p className="text-base font-semibold text-white mb-1">Schedule</p>
            <p className="text-xs text-gray-400">View timetable</p>
          </button>

          <button
            onClick={() => navigate('/grades')}
            className="group p-6 rounded-xl bg-gradient-to-br from-purple-600/20 to-purple-600/5 border border-purple-500/20 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 text-left transform hover:-translate-y-1"
          >
            <div className="p-3 bg-purple-500/20 rounded-lg w-fit mb-3 group-hover:bg-purple-500/30 transition-colors">
              <TrendingUp className="h-7 w-7 text-purple-300" />
            </div>
            <p className="text-base font-semibold text-white mb-1">Grades</p>
            <p className="text-xs text-gray-400">Check performance</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
