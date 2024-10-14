// queries/studentQueries.js

const studentQueries = {
  createTable: `
      CREATE TABLE IF NOT EXISTS student (
          ID INT AUTO_INCREMENT PRIMARY KEY,
          Name VARCHAR(100) NOT NULL,
          Email VARCHAR(100) NOT NULL
      );
  `,
 
};

export default studentQueries;
