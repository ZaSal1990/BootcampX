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



const cohortName = process.argv[2];
const limit = process.argv[3] || 5;
// Store all potentially malicious values in an array - parameterized quesries to protect against malicious sql injections
const values = [`%${cohortName}%`, limit];


pool.query(`
SELECT students.id as student_id, students.name as name, cohorts.name as cohort
FROM students
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name LIKE '${values[0]}%'
LIMIT ${values[1]};
`)
.then(res => {
    res.rows.forEach(user => {
      console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
    })
  }).catch(err => console.error('query error', err.stack));

