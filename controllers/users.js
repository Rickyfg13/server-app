const db = require("../connection");

exports.getUserDetail = async (email) => {
  const query = await db.query(
    `
      SELECT DISTINCT ON (d."Name")
      d."Name" ,d.gender ,d."Email",d."No Telp" , d."Age" AS tahun_lahir
      FROM dataset d
      WHERE d."Email" = $1 --hallo sql injection
      GROUP BY 1,2,3,4,5;
      `,
    [`${email}`]
  );
  return query;
};

exports.getTop5Loc = async (name) => {
  const query = db.query(
    `
    SELECT
    "Name",
    "Name of Location",
    Frequency
  FROM (
    SELECT
      "Name",
      "Name of Location",
      COUNT(*) AS Frequency,
      ROW_NUMBER() OVER (PARTITION BY "Name of Location" ORDER BY COUNT(*) DESC) AS row_num
    FROM dataset d
    WHERE "Name of Location" ilike  $1
    GROUP BY "Name", "Name of Location"
    ORDER BY frequency DESC 
  ) AS UserFrequency
  WHERE row_num <= 5;
  `,
    [`%${name}%`]
  );
  return query;
};
