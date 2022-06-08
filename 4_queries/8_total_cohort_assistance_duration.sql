SELECT cohorts.name as cohort_name, sum(completed_at - created_at) as total_duration 
FROM assistance_requests
JOIN students ON students.id = assistance_requests.student_id
JOIN cohorts ON cohorts.id = students.cohort_id
GROUP BY cohort_name;