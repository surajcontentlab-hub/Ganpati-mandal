'use client';

import React from 'react';

// ==============================
// STAT CARD
// ==============================
interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  gradient?: string;
  subtitle?: string;
  trend?: { value: number; positive: boolean };
}

export function StatCard({ title, value, icon, gradient, subtitle, trend }: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">{title}</p>
          <p className="text-2xl font-bold text-stone-900">{value}</p>
          {subtitle && <p className="text-xs text-amber-600 mt-1">{subtitle}</p>}
          {trend && (
            <p className={`text-xs font-semibold mt-1 ${trend.positive ? 'text-green-600' : 'text-red-500'}`}>
              {trend.positive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${gradient || 'bg-orange-50'}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

// ==============================
// BADGE
// ==============================
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'saffron' | 'gold' | 'green' | 'red' | 'gray';
}

export function Badge({ children, variant = 'saffron' }: BadgeProps) {
  const classes: Record<string, string> = {
    saffron: 'bg-orange-50 text-orange-600 border border-orange-200',
    gold: 'bg-amber-50 text-amber-700 border border-amber-200',
    green: 'bg-green-50 text-green-700 border border-green-200',
    red: 'bg-rose-50 text-rose-600 border border-rose-200',
    gray: 'bg-stone-100 text-stone-600 border border-stone-200',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${classes[variant]}`}>
      {children}
    </span>
  );
}

// ==============================
// BUTTON
// ==============================
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: string;
}

export function Button({ children, variant = 'primary', size = 'md', loading, icon, className = '', ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  const sizes: Record<string, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };
  const variants: Record<string, string> = {
    primary: 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5',
    secondary: 'bg-white text-orange-500 border-2 border-orange-400 hover:bg-orange-50',
    danger: 'bg-gradient-to-r from-rose-600 to-rose-500 text-white shadow-md hover:shadow-lg',
    ghost: 'text-orange-600 hover:bg-orange-50',
  };
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
      {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : icon && <span>{icon}</span>}
      {children}
    </button>
  );
}

// ==============================
// INPUT
// ==============================
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-semibold text-amber-800 mb-1.5">{label}</label>}
      <input className={`mandal-input ${error ? 'border-rose-400' : ''} ${className}`} {...props} />
      {error && <p className="text-xs text-rose-500 mt-1">{error}</p>}
    </div>
  );
}

// ==============================
// SELECT
// ==============================
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, options, className = '', ...props }: SelectProps) {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-semibold text-amber-800 mb-1.5">{label}</label>}
      <select className={`mandal-input ${className}`} {...props}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

// ==============================
// MODAL
// ==============================
interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function Modal({ open, onClose, title, children, size = 'md' }: ModalProps) {
  if (!open) return null;
  const maxW: Record<string, string> = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl' };
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal-content w-full ${maxW[size]}`} onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-amber-100">
          <h2 className="text-lg font-bold text-stone-900">{title}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 text-lg">✕</button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

// ==============================
// EMPTY STATE
// ==============================
interface EmptyStateProps {
  icon?: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon = '📭', title, subtitle, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="text-6xl mb-4 animate-float">{icon}</div>
      <h3 className="text-lg font-semibold text-stone-700 mb-2">{title}</h3>
      {subtitle && <p className="text-sm text-stone-400 mb-6 max-w-xs">{subtitle}</p>}
      {action}
    </div>
  );
}

// ==============================
// PAGE HEADER
// ==============================
interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  back?: () => void;
}

export function PageHeader({ title, subtitle, actions, back }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div className="flex items-center gap-3">
        {back && (
          <button onClick={back} className="w-9 h-9 rounded-xl bg-orange-50 hover:bg-orange-100 flex items-center justify-center text-orange-600 transition-all">
            ←
          </button>
        )}
        <div>
          <h1 className="text-2xl font-bold text-stone-900">{title}</h1>
          {subtitle && <p className="text-sm text-amber-700 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

// ==============================
// CARD
// ==============================
interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
}

export function Card({ children, className = '', padding = true }: CardProps) {
  return (
    <div className={`mandal-card ${padding ? 'p-5' : ''} ${className}`}>
      {children}
    </div>
  );
}

// ==============================
// TABLE WRAPPER
// ==============================
interface TableProps {
  headers: string[];
  children: React.ReactNode;
  empty?: React.ReactNode;
}

export function Table({ headers, children, empty }: TableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-amber-100">
      <table className="mandal-table">
        <thead>
          <tr>
            {headers.map(h => <th key={h}>{h}</th>)}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
      {empty}
    </div>
  );
}

// ==============================
// LOADER
// ==============================
export function Loader() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="mandal-loader" />
    </div>
  );
}

// ==============================
// CROWN STATUS INDICATOR
// ==============================
export function CrowdStatus({ status }: { status: 'low' | 'medium' | 'high' }) {
  const config = {
    low: { color: 'text-green-600 bg-green-50 border-green-200', dot: 'bg-green-500', label: 'Low Crowd 🟢' },
    medium: { color: 'text-amber-600 bg-amber-50 border-amber-200', dot: 'bg-amber-500', label: 'Medium Crowd 🟡' },
    high: { color: 'text-rose-600 bg-rose-50 border-rose-200', dot: 'bg-rose-500', label: 'High Crowd 🔴' },
  };
  const c = config[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${c.color}`}>
      <span className={`w-2 h-2 rounded-full animate-pulse ${c.dot}`} />
      {c.label}
    </span>
  );
}

// ==============================
// SEARCH BAR
// ==============================
interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = 'Search...' }: SearchBarProps) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400">🔍</span>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="mandal-input pl-10"
      />
    </div>
  );
}

// ==============================
// AVATAR
// ==============================
interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  photo?: string;
}

export function Avatar({ name, size = 'md', photo }: AvatarProps) {
  const sizes: Record<string, string> = { sm: 'w-8 h-8 text-sm', md: 'w-10 h-10 text-base', lg: 'w-14 h-14 text-xl' };
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  if (photo) return <img src={photo} alt={name} className={`${sizes[size]} rounded-full object-cover border-2 border-amber-200`} />;
  return (
    <div className={`${sizes[size]} rounded-full bg-gradient-to-br from-orange-400 to-amber-500 text-white font-bold flex items-center justify-center flex-shrink-0`}>
      {initials}
    </div>
  );
}

// ==============================
// PROGRESS BAR
// ==============================
interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
}

export function ProgressBar({ value, max, label }: ProgressBarProps) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div>
      {label && <div className="flex justify-between text-xs text-amber-700 mb-1"><span>{label}</span><span>{Math.round(pct)}%</span></div>}
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

// ==============================
// FORM SECTION
// ==============================
export function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-bold text-orange-600 uppercase tracking-wider mb-4 pb-2 border-b border-amber-100">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
