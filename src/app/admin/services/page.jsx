'use client';

import { useState } from 'react';
import AdminHeader from '@/components/AdminHeader';
import { 
  Briefcase, Plus, Edit, Trash2, CheckCircle2, 
  Sparkles, Layers, ShieldCheck, Cpu, Code2, Database, Globe 
} from 'lucide-react';

const initialServices = [
  {
    id: 'srv-1',
    title: 'Custom Enterprise SaaS Platforms',
    category: 'Software Engineering',
    status: 'Active',
    description: 'High-concurrency microservices, multi-tenant architecture, and cloud SaaS product development.',
    features: ['Multi-tenant Isolation', '99.99% Reliability SLA', 'Automated CI/CD Deployment']
  },
  {
    id: 'srv-2',
    title: 'AI & Data Engineering Solutions',
    category: 'Artificial Intelligence',
    status: 'Active',
    description: 'Predictive analytics, custom machine learning models, Power BI business intelligence dashboards.',
    features: ['Real-time Telemetry', 'Predictive ML Pipelines', 'Automated Reporting']
  },
  {
    id: 'srv-3',
    title: 'Cloud Infrastructure & DevOps',
    category: 'Cloud Architecture',
    status: 'Active',
    description: 'Kubernetes orchestration, serverless security compliance, and zero-downtime database migration.',
    features: ['Kubernetes Orchestration', 'ISO Security Audit', 'Zero-Downtime Deployment']
  },
  {
    id: 'srv-4',
    title: 'Corporate IT & Engineering Upskilling',
    category: 'Training & Development',
    status: 'Active',
    description: 'Hands-on developer workshops, web stack mastery, system design and corporate training modules.',
    features: ['Hands-on Code Labs', 'Customized Curriculum', 'Certification Support']
  }
];

export default function ServicesManagerPage() {
  const [services, setServices] = useState(initialServices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', category: 'Software Engineering', description: '' });

  const toggleStatus = (id) => {
    setServices(services.map(s => s.id === id ? { ...s, status: s.status === 'Active' ? 'Draft' : 'Active' } : s));
  };

  const handleDelete = (id) => {
    if (confirm('Delete this service offering?')) {
      setServices(services.filter(s => s.id !== id));
    }
  };

  const handleAddService = (e) => {
    e.preventDefault();
    if (!formData.title) return;
    const newSrv = {
      id: `srv-${Date.now()}`,
      ...formData,
      status: 'Active',
      features: ['Enterprise SLA', 'Dedicated Engineer Support']
    };
    setServices([...services, newSrv]);
    setIsModalOpen(false);
    setFormData({ title: '', category: 'Software Engineering', description: '' });
  };

  return (
    <div className="flex-1 flex flex-col font-outfit">
      <AdminHeader title="Services &amp; Product Solutions" />

      <main className="p-6 md:p-10 space-y-6 max-w-7xl w-full mx-auto">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl">
          <div>
            <h1 className="text-xl font-black text-white flex items-center gap-2">
              <span>IT Services &amp; Solutions</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-950 text-purple-400 border border-purple-800 uppercase font-mono">
                {services.length} Active Services
              </span>
            </h1>
            <p className="text-xs text-slate-400 font-jakarta">Configure corporate service capabilities, pricing models, and client features.</p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs uppercase tracking-wider font-jakarta transition-all shadow-lg shadow-purple-600/30 flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Plus size={16} />
            <span>Add New Service</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((srv) => (
            <div key={srv.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 flex flex-col justify-between">
              <div className="space-y-3 font-outfit">
                <div className="flex items-center justify-between font-jakarta">
                  <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-purple-950 text-purple-300 border border-purple-800 uppercase">
                    {srv.category}
                  </span>
                  <button
                    onClick={() => toggleStatus(srv.id)}
                    className={`px-3 py-1 rounded-full text-[10px] font-extrabold cursor-pointer ${
                      srv.status === 'Active' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {srv.status}
                  </button>
                </div>

                <h3 className="text-lg font-black text-white">{srv.title}</h3>
                <p className="text-xs text-slate-400 font-medium leading-relaxed font-outfit">{srv.description}</p>

                <div className="space-y-1.5 pt-2">
                  {srv.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-bold text-slate-300 font-jakarta">
                      <CheckCircle2 size={13} className="text-purple-400" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between font-jakarta text-xs">
                <span className="font-mono text-slate-500 font-bold">{srv.id}</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleDelete(srv.id)} className="p-2 rounded-xl bg-rose-950 text-rose-400 hover:bg-rose-900">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}
