import { NextApiRequest, NextApiResponse } from "next";
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const dbPath = './database.db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Validate the data
      const validation = await validateFormData(req.body);

      if (!validation.isValid) {
        return res.status(400).json({ message: validation.message });
      }

      // Save data to SQLite database
      await saveFormDataToDatabase(req.body);

      return res.status(200).json({ message: 'Form submitted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.status(405).end();
}

// Validation function 
async function validateFormData(data: any): Promise<{ isValid: boolean; message: string }> {
  const db = await open({ filename: dbPath, driver: sqlite3.Database });

  // Check if the employee already exists in the database
  const existingEmployee = await db.get('SELECT * FROM registrations WHERE employee = ?', [data.employee]);

  await db.close();

  if (existingEmployee) {
    return { isValid: false, message: 'Employee already exists in the database' };
  }

  return {
    isValid: data.employee && data.numberOfRooms > 0 && (data.spouseJoining || data.childrenJoining > 0),
    message: 'Validation passed',
  };
}

// Save data to SQLite database
async function saveFormDataToDatabase(data: any) {
  const db = await open({ filename: dbPath, driver: sqlite3.Database });
  
  // Create a 'registrations' table if it doesn't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS registrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      employee TEXT,
      spouseJoining BOOLEAN,
      childrenJoining INTEGER,
      childrenOver18 INTEGER,
      shabbatObservance BOOLEAN,
      numberOfRooms INTEGER,
      connectingDoor BOOLEAN,
      transportation INTEGER,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Insert data into the 'registrations' table
  await db.run(`
    INSERT INTO registrations 
    (employee, spouseJoining, childrenJoining, childrenOver18, shabbatObservance, numberOfRooms, connectingDoor, transportation)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    data.employee,
    data.spouseJoining || false,
    data.childrenJoining || 0,
    data.childrenOver18 || 0,
    data.shabbatObservance || false,
    data.numberOfRooms,
    data.connectingDoor || false,
    data.transportation || 0,
  ]);

  await db.close();
}
