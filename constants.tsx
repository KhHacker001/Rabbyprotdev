
import React from 'react';
import { Project, Skill, Service, Stat } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Enterprise Task Orchestrator',
    description: 'A high-concurrency task queue management system built with Django and Celery for distributed processing across multiple nodes.',
    tags: ['Django', 'Redis', 'Celery', 'PostgreSQL'],
    githubUrl: 'https://github.com/rabbyhossein',
    imageUrl: 'https://images.unsplash.com/photo-1518433278981-2ad502fdd13c?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '2',
    title: 'AI Content Analysis API',
    description: 'Advanced NLP pipeline using Python and FastAPI to extract sentiment, keywords, and summaries from large-scale document sets.',
    tags: ['FastAPI', 'PyTorch', 'NLTK', 'Docker'],
    githubUrl: 'https://github.com/rabbyhossein',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '3',
    title: 'Nexus ERP Lite',
    description: 'A comprehensive Resource Planning system for SMEs, featuring inventory management, invoicing, and real-time reporting modules.',
    tags: ['Django', 'React', 'JWT', 'AWS'],
    githubUrl: 'https://github.com/rabbyhossein',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '4',
    title: 'Logistics Streamliner',
    description: 'Real-time fleet tracking and route optimization engine utilizing GeoDjango and OpenStreetMap integration.',
    tags: ['GeoDjango', 'Python', 'Leaflet', 'PostGIS'],
    githubUrl: 'https://github.com/rabbyhossein',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop'
  }
];

export const SKILLS: Skill[] = [
  { name: 'Python', icon: 'M14.25 9.25V6L18.25 10L14.25 14V10.75C9.25 10.75 6.25 12.25 4.25 16C5.25 11 8.25 9.25 14.25 9.25Z', level: 95, category: 'Backend' },
  { name: 'Django', icon: 'M12 2L2 7L12 12L22 7L12 2Z M2 17L12 22L22 17 M2 12L12 17L22 12', level: 90, category: 'Backend' },
  { name: 'FastAPI', icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z', level: 85, category: 'Backend' },
  { name: 'PostgreSQL', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', level: 85, category: 'Database' },
  { name: 'React', icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-11.314l.707.707m11.314 11.314l.707.707', level: 75, category: 'Frontend' },
  { name: 'Docker', icon: 'M22 7.6L2 7.6 M22 12L2 12 M22 16.4L2 16.4', level: 80, category: 'Tools' },
  { name: 'Redis', icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5', level: 80, category: 'Database' },
  { name: 'Kubernetes', icon: 'M12 2L3 7v10l9 5 9-5V7l-9-5z', level: 70, category: 'Tools' }
];

export const SERVICES: Service[] = [
  {
    title: 'Enterprise Backend',
    description: 'Architecting robust, fail-safe server-side solutions using Python ecosystem with emphasis on security and speed.',
    icon: 'M20 7h-9m3 3H5m12 3h-4'
  },
  {
    title: 'Automation & ETL',
    description: 'Transforming chaotic data into actionable insights through automated Python scraping and processing pipelines.',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z'
  },
  {
    title: 'System Integration',
    description: 'Seamlessly connecting disparate platforms via high-performance RESTful or GraphQL APIs.',
    icon: 'M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'
  },
  {
    title: 'Cloud Infrastructure',
    description: 'Deploying and managing scalable applications using Docker, Kubernetes, and modern CI/CD practices.',
    icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z'
  }
];

export const STATS: Stat[] = [
  { label: 'Lines of Code', value: 240000, suffix: '+' },
  { label: 'API Endpoints', value: 850, suffix: '+' },
  { label: 'Cloud Deploys', value: 120, suffix: '+' },
  { label: 'GitHub Stars', value: 500, suffix: '+' }
];

export const ADMIN_HASH = '1f440a43d9276d4949580a56821262d1c68383e23630f40d648601c0f065a3d7';
