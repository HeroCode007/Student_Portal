import { Menu, Bell } from 'lucide-react';

interface NavbarProps {
  onMenuClick: () => void;
}

function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <nav className="bg-gradient-to-r from-indigo-500/90 via-purple-500/90 to-pink-500/90 backdrop-blur-md shadow-lg border-b border-white/20">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Section */}
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="md:hidden p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition"
            >
              <Menu className="h-6 w-6" />
            </button>

            <div className="hidden md:block">
              <h1 className="text-xl font-semibold text-white drop-shadow-sm tracking-wide">
                Student Portal
              </h1>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 text-white/80 hover:text-white transition">
              <Bell className="h-6 w-6" />
              <span className="absolute top-0 right-0 h-2.5 w-2.5 bg-red-400 rounded-full ring-2 ring-purple-600"></span>
            </button>

            {/* User Info */}
            <div className="flex items-center space-x-3">
              <div className="hidden sm:block text-right">
                <div className="text-sm font-semibold text-white">
                  Waqar ul Hasan
                </div>
                <div className="text-xs text-white/70">
                  Computer Science
                </div>
              </div>

              <div className="h-9 w-9 bg-white/20 text-white rounded-xl flex items-center justify-center border border-white/20">
                <span className="text-sm font-medium">WH</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
