const db = require("../connection");

exports.getUserDetail = async (email) => {
  const query = await db.query(
    `
      SELECT DISTINCT ON (d."Name")
      d."Name" ,d.gender ,d."Email",d."No Telp" , d."Age" AS tahun_lahir
      FROM dataset d
      WHERE d."Email" = '${email}' --hallo sql injection
      GROUP BY 1,2,3,4,5;
      ` // Menggunakan parameter langsung tanpa template strin
  );
  return query;
};

exports.getUserDetail2 = async () => {
  const query = db.query(
    `
    SELECT DISTINCT ON (d."Name") 
    d."Name" ,d."Number"
    FROM dataset d
    WHERE d."Name of Location" ILIKE '%The Urban Cafe%'
    GROUP BY 1,2`
  );
  return query;
};
