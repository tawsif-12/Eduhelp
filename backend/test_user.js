// Generate and print dummy users for testing
const users = [];

function createDummyUser(id, name, email, password, role) {
	return {
		id,
		name,
		email,
		password,
		role,
		joinedDate: new Date().toISOString().split('T')[0],
		coursesEnrolled: Math.floor(Math.random() * 10),
		coursesCompleted: Math.floor(Math.random() * 5),
		badges: ['New Member']
	};
}

users.push(createDummyUser(1, 'Alice Smith', 'alice@example.com', 'password123', 'student'));
users.push(createDummyUser(2, 'Bob Johnson', 'bob@example.com', 'password456', 'teacher'));
users.push(createDummyUser(3, 'Charlie Lee', 'charlie@example.com', 'password789', 'student'));

console.log(users);
