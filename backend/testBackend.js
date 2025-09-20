// Simple test to check backend connectivity
const testBackend = async () => {
  try {
    console.log('Testing backend connection...');
    
    // Test courses endpoint
    const coursesResponse = await fetch('http://localhost:5003/api/courses');
    console.log('Courses endpoint status:', coursesResponse.status);
    
    if (coursesResponse.ok) {
      const coursesData = await coursesResponse.json();
      console.log('Courses data:', coursesData);
      console.log('Number of courses:', coursesData.length);
    } else {
      console.error('Failed to fetch courses:', coursesResponse.statusText);
    }
    
    // Test categories endpoint
    const categoriesResponse = await fetch('http://localhost:5003/api/categories');
    console.log('Categories endpoint status:', categoriesResponse.status);
    
    if (categoriesResponse.ok) {
      const categoriesData = await categoriesResponse.json();
      console.log('Categories data:', categoriesData);
      console.log('Number of categories:', categoriesData.length);
    } else {
      console.error('Failed to fetch categories:', categoriesResponse.statusText);
    }
    
  } catch (error) {
    console.error('Backend test error:', error);
  }
};

// Run the test
testBackend();