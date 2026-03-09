import React from 'react';
import { ExternalLink, Tag, FileText, Video, Wrench, Book } from 'lucide-react';
import { Resource } from '../data';

interface ResourceCardProps {
  resource: Resource;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  const Icon = resource.type === 'Tool' ? Wrench :
               resource.type === 'Video' ? Video :
               resource.type === 'Article' ? FileText : Book;

  return (
    <a 
      href={resource.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="glass-panel p-4 flex items-start gap-4 hover:bg-white/10 transition-all group"
    >
      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-cyber-green/20 group-hover:text-cyber-green transition-colors">
        <Icon size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-bold text-sm truncate pr-2">{resource.title}</h4>
          <ExternalLink size={12} className="text-slate-500 group-hover:text-cyber-green transition-colors" />
        </div>
        <p className="text-xs text-slate-400 line-clamp-2 mb-2">{resource.description}</p>
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-mono uppercase tracking-tighter px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-500">
            {resource.type}
          </span>
          <span className="text-[9px] font-mono uppercase tracking-tighter px-1.5 py-0.5 rounded bg-cyber-green/10 border border-cyber-green/20 text-cyber-green/70">
            {resource.category}
          </span>
        </div>
      </div>
    </a>
  );
};
