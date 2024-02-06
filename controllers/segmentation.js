const db = require("../connection");

exports.getSegmentationByAge = async () => {
  const query = db.query(`
    SELECT 
	    CASE WHEN EXTRACT(YEAR FROM current_date) - d."Age" < 18 THEN '< 18'
	         WHEN EXTRACT(YEAR FROM current_date) - d."Age" BETWEEN 18 AND 24 THEN '18 - 24'
	         WHEN EXTRACT(YEAR FROM current_date) - d."Age" BETWEEN 25 AND 34 THEN '25 - 34'
	         WHEN EXTRACT(YEAR FROM current_date) - d."Age" BETWEEN 35 AND 44 THEN '35 - 44'
	         ELSE '45+' -- Atau rentang lain sesuai kebutuhan
	    END AS age_group,
	     COUNT(*) * 100.0 / SUM(COUNT(*)) OVER () AS percentage
	FROM dataset d 
	GROUP BY age_group
	ORDER BY age_group;`);
  return query;
};

exports.getSegmentationByGender = async () => {
  const query = db.query(`
	SELECT 
	d.gender,
	COUNT(*) * 100.0 / SUM(COUNT(*)) OVER () AS percentage
	FROM dataset d
	GROUP BY gender 
	ORDER BY gender;`);
  return query;
};

exports.getSegmentationByMerkHP = async () => {
  const query = db.query(`
	SELECT 
	d."Brand Device"  AS merk,
	Round(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (),2) AS percentage
	FROM dataset d
	GROUP BY merk 
	ORDER BY merk;`);
  return query;
};

exports.getSegmentationByDigitalInterest = async () => {
  const query = db.query(`
	SELECT 
	d."Digital Interest"  AS digital_interest,
	Round(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (),2) AS percentage
	FROM dataset d
	GROUP BY digital_interest
	ORDER BY digital_interest;`);
  return query;
};
