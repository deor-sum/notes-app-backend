const { Pool } = require("pg");

const pool = new Pool({
  user: "developer",
  host: "localhost",
  database: "companydb",
  password: "februari122018",
  port: 5432,
});

const insertEmployee = async (id, name, email, address) => {
  // Membuat objek query
  const query = {
    text: "INSERT INTO karyawan VALUES($1, $2, $3, $4) RETURNING *",
    values: [id, name, email, address],
  };

  const result = await pool.query(query);
  console.log(result.rows);
};

// insertEmployee("189", "asdzxczx", "zxc@gmail.com", `zxczxczx tukad`);

const getAllEmployees = async () => {
  // melakukan query mendapatkan seluruh data karyawan
  const result = await pool.query("SELECT * FROM karyawan");

  // mengembalikan seluruh karyawan dalam bentuk JavaScript array of object
  console.log(result.rows);
};

getAllEmployees();
