import React, { useState } from 'react';
import { 
  Shield, 
  ShieldAlert,
  Terminal, 
  BookOpen, 
  Library, 
  LayoutDashboard, 
  Settings, 
  LogOut,
  Menu,
  X,
  Search,
  Bell,
  Sun,
  Moon,
  Cpu,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { COURSES, RESOURCES } from './data';
import { CourseCard } from './components/CourseCard';
import { ResourceCard } from './components/ResourceCard';
import { Chatbot } from './components/Chatbot';
import { cn } from './lib/utils';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'courses' | 'resources' | 'labs'>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = COURSES.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredResources = RESOURCES.filter(r => 
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('light');
  };

  return (
    <div className={cn(
      "min-h-screen flex transition-colors duration-300",
      isDarkMode ? "bg-cyber-black text-slate-300" : "bg-slate-50 text-slate-900"
    )}>
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 260 : 80 }}
        className={cn(
          "fixed left-0 top-0 bottom-0 z-40 border-r transition-colors duration-300",
          isDarkMode ? "bg-cyber-gray border-white/5" : "bg-white border-slate-200"
        )}
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyber-green flex items-center justify-center shrink-0 shadow-lg shadow-cyber-green/20">
            <Cpu className="text-cyber-black" size={24} />
          </div>
          {isSidebarOpen && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-mono font-bold text-xl tracking-tighter text-white"
            >
              SENTINEL<span className="text-cyber-green">_ROOT</span>
            </motion.span>
          )}
        </div>

        <nav className="mt-6 px-4 space-y-2">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
            { id: 'courses', icon: BookOpen, label: 'Courses' },
            { id: 'resources', icon: Library, label: 'Resources' },
            { id: 'labs', icon: Terminal, label: 'Virtual Labs' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group",
                activeTab === item.id 
                  ? (isDarkMode ? "bg-cyber-green/10 text-cyber-green" : "bg-cyber-green/10 text-cyber-green font-bold")
                  : (isDarkMode ? "text-slate-500 hover:bg-white/5 hover:text-slate-300" : "text-slate-500 hover:bg-slate-100 hover:text-slate-900")
              )}
            >
              <item.icon size={20} />
              {isSidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              {activeTab === item.id && isSidebarOpen && (
                <motion.div layoutId="active-pill" className="ml-auto w-1 h-4 rounded-full bg-cyber-green" />
              )}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-6 left-0 right-0 px-4 space-y-2">
          <button className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
            isDarkMode ? "text-slate-500 hover:bg-white/5 hover:text-slate-300" : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          )}>
            <Settings size={20} />
            {isSidebarOpen && <span className="text-sm font-medium">Settings</span>}
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-cyber-red hover:bg-cyber-red/10 transition-all">
            <LogOut size={20} />
            {isSidebarOpen && <span className="text-sm font-medium">Log Out</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className={cn(
        "flex-1 transition-all duration-300",
        isSidebarOpen ? "ml-[260px]" : "ml-[80px]"
      )}>
        {/* Header */}
        <header className={cn(
          "sticky top-0 z-30 h-20 border-b flex items-center justify-between px-8 backdrop-blur-md transition-colors duration-300",
          isDarkMode ? "bg-cyber-black/80 border-white/5" : "bg-white/80 border-slate-200"
        )}>
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyber-green transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search courses, tools, or labs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(
                  "w-full pl-10 pr-4 py-2.5 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-cyber-green/20",
                  isDarkMode 
                    ? "bg-cyber-gray border-white/5 text-slate-200 focus:border-cyber-green/50" 
                    : "bg-slate-50 border-slate-200 text-slate-900 focus:border-cyber-green/50"
                )}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className={cn(
                "p-2.5 rounded-xl border transition-all",
                isDarkMode ? "bg-cyber-gray border-white/5 text-slate-400 hover:text-white" : "bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900"
              )}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className={cn(
              "p-2.5 rounded-xl border relative transition-all",
              isDarkMode ? "bg-cyber-gray border-white/5 text-slate-400 hover:text-white" : "bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900"
            )}>
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-cyber-red rounded-full border-2 border-cyber-black" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-white">Guest User</p>
                <p className="text-[10px] font-mono text-cyber-green uppercase tracking-wider">Level 1 Initiate</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyber-green to-cyber-blue p-[2px]">
                <div className="w-full h-full rounded-full bg-cyber-black flex items-center justify-center overflow-hidden">
                  <User className="text-slate-400" size={20} />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8 cyber-grid min-h-[calc(100vh-80px)]">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="flex items-end justify-between">
                  <div>
                    <h1 className="text-4xl font-bold mb-2">Welcome back, <span className="text-cyber-green">Initiate</span></h1>
                    <p className="text-slate-400">Your path to becoming a security professional starts here.</p>
                  </div>
                  <div className="glass-panel px-6 py-3 flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-xs font-mono text-slate-500 uppercase">Streak</p>
                      <p className="text-xl font-bold text-white">12 Days</p>
                    </div>
                    <div className="w-px h-8 bg-white/10" />
                    <div className="text-center">
                      <p className="text-xs font-mono text-slate-500 uppercase">XP</p>
                      <p className="text-xl font-bold text-cyber-green">2,450</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      <BookOpen size={20} className="text-cyber-green" />
                      Continue Learning
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {COURSES.slice(0, 2).map(course => (
                        <CourseCard key={course.id} course={course} />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      <Library size={20} className="text-cyber-blue" />
                      Quick Resources
                    </h2>
                    <div className="space-y-4">
                      {RESOURCES.slice(0, 3).map(resource => (
                        <ResourceCard key={resource.id} resource={resource} />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'courses' && (
              <motion.div
                key="courses"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-4xl font-bold mb-2">Course <span className="text-cyber-green">Library</span></h1>
                    <p className="text-slate-400">Structured paths for every skill level.</p>
                  </div>
                  <div className="flex gap-2">
                    {['All', 'Offensive', 'Defensive', 'Fundamentals'].map(cat => (
                      <button key={cat} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-mono hover:bg-cyber-green/10 hover:border-cyber-green/50 transition-all">
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredCourses.map(course => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'resources' && (
              <motion.div
                key="resources"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div>
                  <h1 className="text-4xl font-bold mb-2">Resource <span className="text-cyber-blue">Vault</span></h1>
                  <p className="text-slate-400">A curated collection of tools, documentation, and videos.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredResources.map(resource => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'labs' && (
              <motion.div
                key="labs"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center justify-center py-20 text-center space-y-6"
              >
                <div className="w-20 h-20 rounded-full bg-cyber-red/20 flex items-center justify-center text-cyber-red animate-pulse">
                  <ShieldAlert size={40} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-2">Virtual Labs <span className="text-cyber-red">Locked</span></h1>
                  <p className="text-slate-400 max-w-md mx-auto">
                    Virtual labs are currently in maintenance mode. Please check back later or use our external lab resources.
                  </p>
                </div>
                <button 
                  onClick={() => setActiveTab('resources')}
                  className="px-6 py-3 rounded-xl bg-cyber-red text-white font-bold hover:scale-105 transition-transform"
                >
                  View External Labs
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Bar */}
        <footer className={cn(
          "p-4 border-t text-center text-xs font-mono transition-colors duration-300",
          isDarkMode ? "bg-cyber-gray/50 border-white/5 text-slate-500" : "bg-slate-100 border-slate-200 text-slate-600"
        )}>
          <p>
            contact developer for ads and suggestions at{' '}
            <a href="mailto:sentinelrootsupport@gmail.com" className="text-cyber-green hover:underline">
              sentinelrootsupport@gmail.com
            </a>
          </p>
        </footer>
      </main>

      {/* AI Assistant */}
      <Chatbot />
    </div>
  );
}
