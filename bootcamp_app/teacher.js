/* --- without authorization ---
const { Pool } = require('pg');
const pool = new Pool(); 

--- with authorization ---

const { Pool } = require('pg');
const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

--- connecting via command line ---
psql -h localhost -p 5432 -U <username/zahrasalman> bootcampx
*/

const process = require('process');
const { Pool } = require('pg');


const pool = new Pool({
  user: 'zahrasalman',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});


pool.query(`
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name = '${process.argv[2] || 'JUL02'}'
ORDER BY teacher;
`)
.then(res => {
    res.rows.forEach(query =>
      console.log(`${query.cohort}: ${query.teacher}`)
    );
  }).catch(err => console.error('query error', err.stack));

