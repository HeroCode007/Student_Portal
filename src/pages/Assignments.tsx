import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Upload, CheckCircle } from 'lucide-react';

function Assignments() {
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const data = await api.getAssignments();
      setAssignments(data);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAssignment = async (assignmentId: string) => {
    if (window.confirm('Mark this assignment as completed?')) {
      try {
        await api.updateAssignment(assignmentId, { status: 'completed' });
        fetchAssignments();
      } catch (error) {
        console.error('Error submitting assignment:', error);
        alert('Failed to submit assignment. Please try again.');
      }
    }
  };

  function getDaysLeft(dueDate: string): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate + "T23:59:59");
    if (isNaN(due.getTime())) return 0;
    const diffTime = due.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  const stats = assignments.reduce(
    (acc, assignment) => {
      if (assignment.status === "pending") {
        acc.pending++;
        if (getDaysLeft(assignment.dueDate) <= 3) acc.dueSoon++;
      } else if (assignment.status === "completed") {
        acc.completed++;
      }
      return acc;
    },
    { pending: 0, dueSoon: 0, completed: 0 }
  );

  if (loading) {
    return (
      <div className="min-h-screen p-8 text-white">
        <h1 className="text-3xl font-bold">Assignments Summary</h1>
        <p className="text-gray-300">Loading assignments...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 text-white">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Assignments Summary</h1>
          <p className="text-gray-300 mt-1">Track your pending, upcoming, and completed assignments.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-xl shadow-lg shadow-black/20 hover:bg-white/10 transition">
            <p className="text-sm text-blue-300 font-semibold mb-1">Pending</p>
            <p className="text-3xl font-bold text-blue-200">{stats.pending}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-xl shadow-lg shadow-black/20 hover:bg-white/10 transition">
            <p className="text-sm text-yellow-300 font-semibold mb-1">Due Soon</p>
            <p className="text-3xl font-bold text-yellow-200">{stats.dueSoon}</p>
            <p className="text-xs text-yellow-300 mt-1">Within 3 days</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-xl shadow-lg shadow-black/20 hover:bg-white/10 transition">
            <p className="text-sm text-green-300 font-semibold mb-1">Completed</p>
            <p className="text-3xl font-bold text-green-200">{stats.completed}</p>
          </div>
        </div>

        {/* Assignment Details */}
        <div className="space-y-4">
          {assignments.map((assignment) => {
            const daysLeft = getDaysLeft(assignment.dueDate);
            const isOverdue = daysLeft < 0;
            const isDueSoon = daysLeft >= 0 && daysLeft <= 3;

            return (
              <div
                key={assignment._id}
                className="p-4 rounded-2xl border-2 bg-white/5 backdrop-blur-xl border-white/10 shadow-lg shadow-black/20 hover:bg-white/10 hover:shadow-xl transition"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <p className="font-semibold text-white">{assignment.title}</p>
                    <p className="text-sm text-gray-400">Course: {assignment.course}</p>
                    <p className="text-sm text-gray-300">Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
                  </div>

                  <div className="text-right flex flex-col items-end gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold
                        ${assignment.status === "completed"
                          ? "bg-green-400/20 text-green-200"
                          : isOverdue
                            ? "bg-red-400/20 text-red-200"
                            : isDueSoon
                              ? "bg-yellow-400/20 text-yellow-200"
                              : "bg-blue-400/20 text-blue-200"
                        }`}
                    >
                      {assignment.status}
                    </span>
                    {assignment.status === "pending" && (
                      <>
                        <p className={`text-xs font-semibold
                          ${isOverdue ? "text-red-400" : isDueSoon ? "text-yellow-300" : "text-blue-300"}`}>
                          {isOverdue
                            ? `${Math.abs(daysLeft)} days overdue`
                            : `${daysLeft} days left`}
                        </p>
                        <button
                          onClick={() => handleSubmitAssignment(assignment._id)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition"
                        >
                          <Upload className="h-4 w-4" />
                          Submit
                        </button>
                      </>
                    )}
                    {assignment.status === "completed" && (
                      <div className="flex items-center gap-1 text-green-400 text-sm">
                        <CheckCircle className="h-4 w-4" />
                        Submitted
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Assignments;
