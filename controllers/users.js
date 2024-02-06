const db = require("../connection");

exports.getUserByDay = async (email) => {
  const query = db.query(
    `
  SELECT DISTINCT ON (d."Name")
  d."Name" ,d.gender ,d."Email",d."No Telp" , d."Age" AS tahun_lahir
  FROM dataset d
  WHERE d."Email" = $1
  GROUP BY 1,2,3,4,5;`,
    [`${email}`]
  );
  return query;
};
