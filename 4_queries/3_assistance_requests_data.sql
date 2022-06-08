SELECT teachers.name as teacher_name, students.name as student_name, assignments.name as assignments_name,  (completed_at-started_at) as duration
FROM assistance_requests
JOIN teachers ON assistance_requests.teacher_id = teachers.id
JOIN students ON assistance_requests.student_id = students.id
JOIN assignments ON assistance_requests.assignment_id = assignments.id
ORDER BY duration;

