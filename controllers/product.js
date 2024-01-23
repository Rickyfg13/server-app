const db = require("../connection");

exports.fetchProduct = async () => {
  const query = db.query("SELECT count(*) FROM dataset");
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
