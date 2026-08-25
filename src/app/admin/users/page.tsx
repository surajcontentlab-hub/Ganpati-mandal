'use client';

import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Card, Button, Badge } from '@/components/ui';
import { supabase } from '@/lib/supabase';

export default function UsersManagementPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('mandal_users')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      setUsers(data || []);
    } catch (err: any) {
      console.error(err);
      setError('Could not load users. Make sure the mandal_users table exists in Supabase.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleApprove = async (id: number, selectedRole: string) => {
    try {
      const { error } = await supabase
        .from('mandal_users')
        .update({ is_verified: true, role: selectedRole })
        .eq('id', id);
        
      if (error) throw error;
      
      // Update local state
      setUsers(users.map(u => u.id === id ? { ...u, is_verified: true, role: selectedRole } : u));
    } catch (err: any) {
      alert('Failed to approve user: ' + err.message);
    }
  };
  
  const handleReject = async (id: number) => {
    if (!confirm('Are you sure you want to reject and delete this user registration?')) return;
    
    try {
      const { error } = await supabase
        .from('mandal_users')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      setUsers(users.filter(u => u.id !== id));
    } catch (err: any) {
      alert('Failed to delete user: ' + err.message);
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">User Approvals</h1>
          <p className="text-sm text-stone-500">Manage registrations and access to the app</p>
        </div>
        <Button onClick={fetchUsers} variant="secondary">Refresh</Button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 border border-red-100">
          <p className="font-bold">Database Error</p>
          <p className="text-sm">{error}</p>
          <div className="mt-2 text-xs opacity-80">
            You need to create a table named <code>mandal_users</code> with columns: <code>id</code>, <code>name</code>, <code>mobile</code>, <code>password</code>, <code>is_verified</code> (boolean), <code>role</code>, <code>created_at</code>.
          </div>
        </div>
      )}

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-amber-100 text-sm text-stone-500">
                <th className="pb-3 font-semibold">Name</th>
                <th className="pb-3 font-semibold">Mobile</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Role</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-50">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-stone-400">Loading users...</td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-stone-400">No users found.</td>
                </tr>
              ) : (
                users.map(user => (
                  <tr key={user.id} className="text-sm">
                    <td className="py-3 font-medium text-stone-900">{user.name}</td>
                    <td className="py-3 text-stone-600">{user.mobile}</td>
                    <td className="py-3">
                      <Badge variant={user.is_verified ? 'green' : 'saffron'}>
                        {user.is_verified ? 'Verified' : 'Pending'}
                      </Badge>
                    </td>
                    <td className="py-3 text-stone-600 capitalize">{user.role || 'user'}</td>
                    <td className="py-3 text-right">
                      {!user.is_verified ? (
                        <div className="flex justify-end gap-2 items-center">
                          <select id={`role-${user.id}`} className="text-xs border border-amber-200 rounded px-2 py-1 bg-white">
                            <option value="user">User</option>
                            <option value="volunteer">Volunteer</option>
                            <option value="accountant">Accountant</option>
                            <option value="mandal_admin">Admin</option>
                          </select>
                          <Button size="sm" onClick={() => {
                            const roleSelect = document.getElementById(`role-${user.id}`) as HTMLSelectElement;
                            handleApprove(user.id, roleSelect.value);
                          }}>Approve</Button>
                          <Button size="sm" variant="danger" onClick={() => handleReject(user.id)}>Reject</Button>
                        </div>
                      ) : (
                        <span className="text-stone-400 text-xs">Approved</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </AdminLayout>
  );
}
