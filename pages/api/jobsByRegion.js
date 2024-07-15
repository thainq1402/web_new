// pages/api/jobsByRegion.js
import { createConnection } from "@lib/mysql";

export default async function handler(req, res) {
  try {
    const connection = await createConnection();

    const northCities = [24]; // Hanoi
    const southCities = [58]; // Ho Chi Minh
    const centralCities = [15]; // Da Nang

    // Fetch jobs for each region
    const [northJobs] = await connection.query(`
      SELECT * FROM Data_Lake
      WHERE ID_TinhThanh IN (?)
      LIMIT 4
    `, [northCities]);

    const [southJobs] = await connection.query(`
      SELECT * FROM Data_Lake
      WHERE ID_TinhThanh IN (?)
      LIMIT 4
    `, [southCities]);

    const [centralJobs] = await connection.query(`
      SELECT * FROM Data_Lake
      WHERE ID_TinhThanh IN (?)
      LIMIT 4
    `, [centralCities]);

    // Fetch jobs where TinhThanhID is not specified
    const [otherJobs] = await connection.query(`
      SELECT * FROM Data_Lake
      WHERE ID_TinhThanh IS NULL
      LIMIT 2
    `);

    await connection.end();

    res.status(200).json({
      north: northJobs,
      south: southJobs,
      central: centralJobs,
      other: otherJobs,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
