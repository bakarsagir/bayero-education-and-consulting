/*
  # Sample Data for University Database

  1. Sample Data
    - Universities with rankings and descriptions
    - Programs across different levels
    - Courses with durations and fees
    - Scholarships
*/

-- Sample Universities
INSERT INTO universities (name, country, website, ranking, description) VALUES
('Harvard University', 'United States', 'https://www.harvard.edu', 1, 'Harvard University is a private Ivy League research university in Cambridge, Massachusetts.'),
('University of Oxford', 'United Kingdom', 'https://www.ox.ac.uk', 2, 'The University of Oxford is a collegiate research university in Oxford, England.'),
('Stanford University', 'United States', 'https://www.stanford.edu', 3, 'Stanford University is a private research university in Stanford, California.'),
('University of Cambridge', 'United Kingdom', 'https://www.cam.ac.uk', 4, 'The University of Cambridge is a collegiate research university in Cambridge, United Kingdom.');

-- Sample Programs
INSERT INTO programs (name, description, level) VALUES
('Computer Science', 'Study of computation, automation, and information.', 'Bachelors'),
('Business Administration', 'Study of business management and administration.', 'Masters'),
('Physics', 'Study of matter, energy, and their interactions.', 'PhD'),
('Medicine', 'Study of the diagnosis, treatment, and prevention of disease.', 'Bachelors');

-- Sample Courses
INSERT INTO courses (university_id, program_id, name, duration_months, language, description)
SELECT 
  u.id,
  p.id,
  p.name || ' at ' || u.name,
  CASE p.level 
    WHEN 'Bachelors' THEN 48
    WHEN 'Masters' THEN 24
    WHEN 'PhD' THEN 36
  END,
  'English',
  'Full-time ' || p.level || ' program in ' || p.name
FROM universities u
CROSS JOIN programs p;

-- Sample Tuition Fees
INSERT INTO tuition_fees (course_id, amount, currency, period, student_type)
SELECT 
  c.id,
  CASE 
    WHEN u.country = 'United States' THEN 45000
    WHEN u.country = 'United Kingdom' THEN 35000
  END,
  'USD',
  'per_year',
  'international'
FROM courses c
JOIN universities u ON c.university_id = u.id;

-- Sample Scholarships
INSERT INTO scholarships (university_id, name, description, amount, currency, deadline)
SELECT 
  id,
  name || ' Merit Scholarship',
  'Merit-based scholarship for international students',
  25000,
  'USD',
  '2024-09-01'
FROM universities;