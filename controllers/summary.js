const db = require("../connection");

exports.getUserByDay = async () => {
  const query = db.query(`
  SELECT
  d."Date" AS DAY,
    COUNT(DISTINCT d."No Telp") AS unique_users_per_day
    FROM
    dataset d 
    GROUP BY
    DAY 
    ORDER BY
  DAY;`);
  return query;
};

exports.getSumUser = async () => {
  const query = db.query(`
  SELECT count(DISTINCT d."Email") AS UNIQUE_users_all
   FROM dataset d;
    `);
  return query;
};

exports.getNewUserAndReturningByDay = async () => {
  const query = db.query(`
      SELECT
        user_activity."Date" AS DAY,
        COUNT(DISTINCT CASE WHEN user_type = 'New' THEN "Email" END) AS new_users,
        COUNT(DISTINCT CASE WHEN user_type = 'Returning' THEN "Email" END) AS returning_users
    FROM (
        -- Subquery untuk menentukan tipe pengguna (New/Returning) berdasarkan aktivitas
        SELECT
          "Email",
          "Date",
          "Login Hour",
          CASE
              WHEN EXTRACT(HOUR FROM d."Login Hour"::time) >= 8 AND EXTRACT(HOUR FROM d."Login Hour"::time) < 16 THEN 'New'
              WHEN EXTRACT(HOUR FROM d."Login Hour"::time) >= 16 AND EXTRACT(HOUR FROM d."Login Hour"::time) < 24 THEN 'Returning'
              ELSE 'Other'
          END AS user_type
        FROM
          dataset d
    ) AS user_activity
    GROUP BY
        DAY
    ORDER BY
        DAY ASC;
    `);
  return query;
};

exports.getSumNewUserAndReturning = async () => {
  const query = db.query(`
      SELECT
      COUNT(DISTINCT CASE WHEN user_type = 'New' THEN "Email" END) AS new_users,
      COUNT(DISTINCT CASE WHEN user_type = 'Returning' THEN "Email" END) AS returning_users
    FROM (
      -- Subquery untuk menentukan tipe pengguna (New/Returning) berdasarkan aktivitas
      SELECT
        "Email",
        "Date",
        "Login Hour",
        CASE
            WHEN EXTRACT(HOUR FROM d."Login Hour"::time) >= 8 AND EXTRACT(HOUR FROM d."Login Hour"::time) < 16 THEN 'New'
            WHEN EXTRACT(HOUR FROM d."Login Hour"::time) >= 16 AND EXTRACT(HOUR FROM d."Login Hour"::time) < 24 THEN 'Returning'
            ELSE 'Other'
        END AS user_type
      FROM
        dataset d
    ) AS user_activity;
    `);
  return query;
};

exports.getBusyDay = async () => {
  const query = db.query(`
  SELECT d."Date", 
  COUNT("Email") AS total_users
       FROM dataset d 
       GROUP BY "Date"
       ORDER BY total_users DESC
       LIMIT 1
    `);
  return query;
};

exports.getBusyTime = async () => {
  const query = db.query(`
  SELECT d."Login Hour" , 
 	  COUNT("Email") AS total_users
      FROM dataset d 
      GROUP BY d."Login Hour" 
      ORDER BY total_users DESC
      LIMIT 1;
    `);
  return query;
};

exports.getSumAllData = async () => {
  const query = db.query(`
  SELECT count(*)
      FROM dataset d ;
    `);
  return query;
};

exports.addProduct = async (data) => {
  const query = await db.query("INSERT INTO products SET ?", [data]);
  return { id: query.insertId };
};

exports.Paginate = async (data) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10;

  try {
    const data = await ModelName.findAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
      // Tambahkan opsi pengurutan jika diperlukan
    });

    const totalCount = await ModelName.count();
    const totalPages = Math.ceil(totalCount / pageSize);

    res.json({
      data,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
