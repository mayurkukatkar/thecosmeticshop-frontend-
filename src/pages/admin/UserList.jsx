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
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
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
        </div>
    );
};

export default UserList;
