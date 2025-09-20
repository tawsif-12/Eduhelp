import React, { useState } from 'react';

export default function AdminLoginTest() {
  const [email, setEmail] = useState('irfan.cse.20230104064@aust.edu');
  const [password, setPassword] = useState('admin123');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testAdminLogin = async () => {
    setLoading(true);
    try {
      // Step 1: Try to login
      console.log('Testing admin login...');
      const loginResponse = await fetch('http://localhost:5003/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const loginData = await loginResponse.json();
      console.log('Login response:', loginData);

      if (!loginResponse.ok) {
        throw new Error(loginData.error || 'Login failed');
      }

      // Step 2: Store token and test admin endpoint
      if (loginData.token) {
        localStorage.setItem('authToken', loginData.token);
        console.log('Token stored:', loginData.token.substring(0, 20) + '...');

        // Step 3: Test admin courses endpoint
        const coursesResponse = await fetch('http://localhost:5003/api/admin/courses', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${loginData.token}`,
          },
        });

        console.log('Courses endpoint status:', coursesResponse.status);
        
        if (coursesResponse.ok) {
          const coursesData = await coursesResponse.json();
          setResult(`Success! Found ${coursesData.courses?.length || 0} courses. User role: ${loginData.user?.role}`);
        } else {
          const errorText = await coursesResponse.text();
          setResult(`Login successful but admin access failed: ${coursesResponse.status} - ${errorText}`);
        }
      } else {
        setResult('Login successful but no token received');
      }
    } catch (error) {
      console.error('Test error:', error);
      setResult(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testCreateAdmin = async () => {
    setLoading(true);
    try {
      console.log('Creating admin user...');
      
      // First check if admin exists
      const response = await fetch('http://localhost:5003/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Admin User',
          email: 'irfan.cse.20230104064@aust.edu',
          password: 'admin123',
          role: 'admin'
        }),
      });

      const data = await response.json();
      console.log('Admin creation response:', data);
      
      if (response.ok || data.error?.includes('already exists')) {
        setResult('Admin user created or already exists. Try logging in now.');
      } else {
        setResult(`Failed to create admin: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      setResult(`Error creating admin: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6">Admin Authentication Test</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div className="space-y-2">
            <button
              onClick={testCreateAdmin}
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              1. Create Admin User
            </button>
            
            <button
              onClick={testAdminLogin}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              2. Test Admin Login
            </button>
          </div>

          {loading && (
            <div className="text-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          )}

          {result && (
            <div className={`p-4 rounded-md ${result.includes('Success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              <p className="text-sm whitespace-pre-wrap">{result}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}