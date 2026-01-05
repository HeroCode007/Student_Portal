import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  Calendar,
  TrendingUp,
  User,
  LogOut,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: BookOpen, label: 'Courses', path: '/courses' },
    { icon: ClipboardList, label: 'Assignments', path: '/assignments' },
    { icon: Calendar, label: 'Schedule', path: '/schedule' },
    { icon: TrendingUp, label: 'Grades', path: '/grades' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:static inset-y-0 left-0 z-50 w-64
          bg-gradient-to-b from-indigo-600/90 via-purple-600/90 to-pink-600/90
          backdrop-blur-xl text-white shadow-2xl border-r border-white/20
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <div className="h-9 w-9 bg-white/20 rounded-lg flex items-center justify-center border border-white/20">
              <span className="text-white font-bold text-sm">SP</span>
            </div>
            <span className="font-semibold text-white tracking-wide">Student Portal</span>
          </div>
          <button onClick={onClose} className="md:hidden p-2 text-white/60 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Menu */}
        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => onClose()}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300
                    ${isActive(item.path)
                      ? 'bg-white/20 text-white shadow-md ring-2 ring-white/30'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }
                  `}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className="absolute bottom-4 left-4 right-4">
          <button className="flex items-center space-x-3 w-full px-4 py-3 text-red-200 hover:text-white hover:bg-red-500/30 rounded-xl transition-all duration-300 backdrop-blur-sm">
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
