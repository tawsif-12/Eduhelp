import React, { useState, useEffect } from 'react';

export default function TestCoursePage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        console.log('Fetching courses from: http://localhost:5003/api/courses');
        const response = await fetch('http://localhost:5003/api/courses');
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Courses data:', data);
        setCourses(data);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <div className="p-8">Loading courses...</div>;
  if (error) return <div className="p-8 text-red-600">Error: {error}</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Course Debug Page</h1>
      <p className="mb-4">Found {courses.length} courses</p>
      
      {courses.length === 0 ? (
        <div className="bg-yellow-100 p-4 rounded">
          <p>No courses found. This could mean:</p>
          <ul className="list-disc ml-6 mt-2">
            <li>Backend server is not running</li>
            <li>Database is empty</li>
            <li>API endpoint is not working</li>
          </ul>
        </div>
      ) : (
        <div className="space-y-4">
          {courses.map((course, index) => (
            <div key={course._id || index} className="border p-4 rounded bg-gray-50">
              <h3 className="font-bold">{course.title}</h3>
              <p className="text-sm text-gray-600">ID: {course._id}</p>
              <p className="text-sm text-gray-600">Category: {course.category}</p>
              <p className="text-sm text-gray-600">Price: ${course.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}