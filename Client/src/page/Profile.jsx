import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../reducer/slice/authSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-orange-500 text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-orange-500 text-white p-6 rounded-b-3xl">
        <h1 className="text-2xl font-bold">My Profile</h1>
      </div>

      {/* Profile Card */}
      <div className="px-4 -mt-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
              {user?.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <span className="text-3xl font-bold text-orange-500">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">{user?.name}</h2>
              <p className="text-gray-500">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="px-4 mt-6 space-y-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-gray-800">{user?.email}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium text-gray-800">{user?.mobile || 'Not provided'}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="font-medium text-gray-800">{user?.address || 'Not provided'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Account Info */}
      <div className="px-4 mt-6">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Member Since</p>
                <p className="font-medium text-gray-800">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;