show databases;
use jcwd2504_hello_mysql;
show tables;

-- create data
INSERT INTO students(name, description, gender, height, isMarried, pocketMoney, score, birthday, lastSeen) VALUES
('damar','gondrong doang ga begal','Men','175',false, 1000000, 99.99, date('1991-04-11'), NOW()),
('ronal','penikmat alkohol','Men',175,false, 3000000, 79.99, date('2003-02-14'), NOW()),
('thareq','cita cita masuk youtube purwadhika career switching koki jadi developer','Men',175,false, 3000000, 99.99, date('1997-05-21'), NOW());

-- read data
SELECT * FROM students;
SELECT name, pocketMoney from students;
SELECT DISTINCT name, pocketMoney FROM students;
SELECT DISTINCT * FROM students;
SELECT name, pocketMoney FROM students WHERE name='damar';

-- update data
UPDATE students SET height = 150 WHERE name='damar';

-- delete data
DELETE FROM students WHERE id > 4;

-- sql clause 
-- urutannya : 
-- WHERE
-- GROUP BY
-- HAVING
-- ORDER BY 
-- LIMIT

-- WHERE CLAUSE
SELECT * FROM students 
WHERE (name = 'damar' AND score > 80);

SELECT * FROM students
WHERE name IN ('damar','ronal');

-- GROUP BY CLAUSE
SELECT name, SUM(pocketMoney) FROM students
WHERE score >= 80
GROUP BY name;

SELECT name, COUNT(*) FROM students
GROUP BY name;


-- HAVING CLAUSE
SELECT name, MIN(pocketMoney), MAX(pocketMoney), SUM(pocketMoney)
FROM students
GROUP BY name
HAVING SUM(pocketMoney) > 50000;

-- ORDER BY CLAUSE
SELECT name, MIN(pocketMoney), MAX(pocketMoney), SUM(pocketMoney)
FROM students
GROUP BY name
HAVING SUM(pocketMoney) > 50000
ORDER BY MIN(pocketMoney) DESC, name ASC;

-- LIMIT
SELECT name, MIN(pocketMoney), MAX(pocketMoney), SUM(pocketMoney)
FROM students
GROUP BY name
HAVING SUM(pocketMoney) > 50000
ORDER BY MIN(pocketMoney) DESC, name ASC
LIMIT 2 OFFSET 2;


