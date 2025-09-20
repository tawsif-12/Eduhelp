// Simple admin auth test
const testAdminAuth = async () => {
  try {
    console.log('Testing admin authentication...');
    
    // Check if auth token exists
    const token = localStorage.getItem('authToken');
    console.log('Auth token exists:', !!token);
    console.log('Token preview:', token ? token.substring(0, 20) + '...' : 'No token');
    
    // Test admin dashboard stats endpoint (simpler than courses)
    const response = await fetch('http://localhost:5003/api/admin/dashboard/stats', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      }
    });
    
    console.log('Dashboard stats response status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('Dashboard stats data:', data);
    } else {
      const errorText = await response.text();
      console.error('Dashboard stats error:', response.status, errorText);
    }
    
  } catch (error) {
    console.error('Admin auth test error:', error);
  }
};

// Run the test
testAdminAuth();