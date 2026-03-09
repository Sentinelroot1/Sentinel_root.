import React from 'react';
import { Shield, ShieldAlert, BookOpen, ExternalLink, Clock, Layers } from 'lucide-react';
import { motion } from 'motion/react';
import { Course } from '../data';
import { cn } from '../lib/utils';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="glass-panel overflow-hidden group cursor-pointer"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={course.thumbnail} 
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cyber-black to-transparent opacity-60" />
        <div className="absolute top-4 left-4">
          <span className={cn(
            "px-2 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider border",
            course.category === 'Offensive' ? "bg-cyber-red/20 border-cyber-red text-cyber-red" :
            course.category === 'Defensive' ? "bg-cyber-blue/20 border-cyber-blue text-cyber-blue" :
            "bg-cyber-green/20 border-cyber-green text-cyber-green"
          )}>
            {course.category}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-bold mb-2 group-hover:text-cyber-green transition-colors">{course.title}</h3>
        <p className="text-slate-400 text-sm line-clamp-2 mb-4">{course.description}</p>
        
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 uppercase tracking-widest">
          <div className="flex items-center gap-1.5">
            <Clock size={12} />
            {course.duration}
          </div>
          <div className="flex items-center gap-1.5">
            <Layers size={12} />
            {course.modules} Modules
          </div>
          <div className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">
            {course.level}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
