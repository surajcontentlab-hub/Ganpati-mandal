'use client';

import React, { useState } from 'react';
import PublicLayout from '@/components/PublicLayout';
import { Button, Input } from '@/components/ui';
import { supabase } from '@/lib/supabase';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  
  const { login } = useApp();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      if (isLogin) {
        // Mock Login Flow (Normally you'd use supabase.auth.signInWithPassword)
        // Since we are using mobile instead of email for this Indian audience app, we'll check our custom table
        const { data: users, error } = await supabase
          .from('mandal_users')
          .select('*')
          .eq('mobile', mobile)
          .eq('password', password); // NOT FOR PRODUCTION. Just a demo since true mobile auth needs OTP or custom auth server.
          
        if (error) throw error;
        
        if (users && users.length > 0) {
          const user = users[0];
          
          if (!user.is_verified) {
            setMessage({ text: 'Your account is pending verification from the Admin. Please wait.', type: 'error' });
            setLoading(false);
            return;
          }
          
          login({
            id: user.id,
            name: user.name,
            mobile: user.mobile,
            email: '',
            role: user.role || 'member',
            mandalId: 'mandal_001',
            language: 'mr',
            isLoggedIn: true,
          });
          
          router.push('/profile');
        } else {
          setMessage({ text: 'Invalid credentials. Please try again.', type: 'error' });
        }
      } else {
        // Registration Flow
        const { data: existingUser } = await supabase
          .from('mandal_users')
          .select('id')
          .eq('mobile', mobile);
          
        if (existingUser && existingUser.length > 0) {
          setMessage({ text: 'User with this mobile number already exists.', type: 'error' });
          setLoading(false);
          return;
        }

        const { error } = await supabase
          .from('mandal_users')
          .insert([
            { name, mobile, password, is_verified: false, role: 'user' }
          ]);

        if (error) throw error;
        
        setMessage({ text: 'Registration successful! Please wait for admin approval to log in.', type: 'success' });
        setIsLogin(true);
        setName('');
        setPassword('');
      }
    } catch (err: any) {
      console.error(err);
      setMessage({ text: err.message || 'Something went wrong. Have you created the mandal_users table in Supabase?', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicLayout>
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-xl border border-amber-100">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-3xl shadow-lg mx-auto mb-4">
              🙏
            </div>
            <h1 className="text-2xl font-black text-stone-900">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
            <p className="text-stone-500 text-sm mt-1">GanpatiMitra User Portal</p>
          </div>

          {message.text && (
            <div className={`p-3 rounded-xl text-sm font-semibold text-center mb-5 ${message.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-700'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <Input
                label="Full Name (पूर्ण नाव)"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            )}
            
            <Input
              label="Mobile Number (मोबाईल क्रमांक)"
              placeholder="10-digit mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
            
            <Input
              label="Password (पासवर्ड)"
              type="password"
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button type="submit" className="w-full mt-4" size="lg" disabled={loading}>
              {loading ? 'Processing...' : (isLogin ? 'Login' : 'Register')}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button 
              onClick={() => { setIsLogin(!isLogin); setMessage({text:'', type:''}); }}
              className="text-sm font-medium text-orange-600 hover:underline"
            >
              {isLogin ? "Don't have an account? Register here" : "Already have an account? Login here"}
            </button>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
