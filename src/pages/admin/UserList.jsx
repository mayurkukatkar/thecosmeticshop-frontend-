import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Trash2, Mail, Phone, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const { userInfo } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            fetchUsers();
        } else {
            navigate('/login');
        }
    }, [userInfo, navigate]);

    const fetchUsers = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            const { data } = await axios.get('/api/users', config);
            setUsers(data);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
                await axios.delete(`/api/users/${id}`, config);
                toast.success('User deleted successfully');
                fetchUsers();
            } catch (error) {
                toast.error(error.response?.data?.message || error.message);
            }
        }
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-8 text-gray-800">Users</h1>
            {/* Desktop Table View */}
            <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                            <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Admin</th>
                            <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {users.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-50 transition">
                                <td className="px-5 py-4 text-sm font-mono text-gray-500">{user._id.substring(0, 8)}...</td>
                                <td className="px-5 py-4 text-sm font-medium text-gray-800">{user.name}</td>
                                <td className="px-5 py-4 text-sm text-gray-600">
                                    <a href={`mailto:${user.email}`} className="flex items-center gap-2 hover:text-brand-accent">
                                        <Mail size={14} /> {user.email}
                                    </a>
                                </td>
                                <td className="px-5 py-4 text-sm">
                                    {user.isAdmin ? (
                                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">Admin</span>
                                    ) : (
                                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">User</span>
                                    )}
                                </td>
                                <td className="px-5 py-4 text-sm">
                                    {!user.isAdmin && (
                                        <button onClick={() => deleteHandler(user._id)} className="text-red-500 hover:text-red-700 transition p-1 rounded hover:bg-red-50">
                                            <Trash2 size={18} />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card List View */}
            <div className="md:hidden space-y-4">
                {users.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 bg-white rounded-2xl border border-gray-100">
                        No users found.
                    </div>
                ) : (
                    users.map((user) => (
                        <div key={user._id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-3">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-brand-pink text-brand-accent font-bold flex items-center justify-center text-sm uppercase">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800 text-sm">{user.name}</h3>
                                        <span className="text-[10px] text-gray-400 font-mono">ID: {user._id.substring(0, 8)}...</span>
                                    </div>
                                </div>
                                <div>
                                    {user.isAdmin ? (
                                        <span className="px-2.5 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">Admin</span>
                                    ) : (
                                        <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">User</span>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-between items-center border-t border-gray-50 pt-3">
                                <a href={`mailto:${user.email}`} className="text-xs text-gray-600 flex items-center gap-1.5 hover:text-brand-accent transition">
                                    <Mail size={14} className="text-gray-400" />
                                    <span className="truncate max-w-[180px]">{user.email}</span>
                                </a>
                                {!user.isAdmin && (
                                    <button onClick={() => deleteHandler(user._id)} className="flex items-center justify-center w-8 h-8 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition">
                                        <Trash2 size={16} />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default UserList;
