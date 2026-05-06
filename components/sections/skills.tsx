'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { TagPill } from '@/components/ui/tag-pill';
import { skills } from '@/lib/data';

interface SkillCardProps {
  title: string;
  items: string[];
  color: 'function' | 'keyword' | 'number';
  index: number;
}

function SkillCard({ title, items, color, index }: SkillCardProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45, delay: reduced ? 0 : index * 0.15 }}
      className="border-border-default bg-bg-secondary flex flex-col gap-3.5 rounded-[10px] border px-5 pt-5 pb-[22px]"
    >
      <p className="text-text-muted font-mono text-xs tracking-[0.02em]">{title}</p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <TagPill key={item} color={color}>
            {item}
          </TagPill>
        ))}
      </div>
    </motion.div>
  );
}

export function Skills() {
  return (
    <div>
      <p className="text-text-muted mb-[18px] font-mono text-base tracking-[0.01em]">
        {'// stack'}
      </p>
      <div className="grid grid-cols-1 gap-4 [@media(min-width:1200px)]:grid-cols-3">
        <SkillCard title="// frontend" items={skills.frontend} color="function" index={0} />
        <SkillCard title="// backend" items={skills.backend} color="keyword" index={1} />
        <SkillCard title="// infra & tools" items={skills.infraAndTools} color="number" index={2} />
      </div>
    </div>
  );
}
