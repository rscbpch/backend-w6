//
//  This repository shall:
//  - Connect to the database (using the pool provided by the database.js)
//  - Perform the SQL queries to implement the below API
//

import db from '../utils/database.js';

// Get all articles with journalist name
export async function getArticles() {
  const sql = `
    SELECT articles.*, journalists.name AS journalist_name
    FROM articles
    JOIN journalists ON articles.journalistid = journalists.id
  `;
  const [rows] = await db.query(sql);
  return rows;
}

// Get one article by ID
export async function getArticleById(id) {
  const sql = `
    SELECT articles.*, journalists.name AS journalist_name
    FROM articles
    JOIN journalists ON articles.journalistid = journalists.id
    WHERE articles.id = ?
  `;
  const [rows] = await db.query(sql, [id]);
  return rows[0];
}

// Get all articles by journalist ID
export async function getArticlesByJournalistId(journalistId) {
  const sql = `
    SELECT articles.*, journalists.name AS journalist_name
    FROM articles
    JOIN journalists ON articles.journalistid = journalists.id
    WHERE journalists.id = ?
  `;
  const [rows] = await db.query(sql, [journalistId]);
  return rows;
}

// Create a new article (store only journalistid)
export async function createArticle(article) {
  const { title, content, category, journalistid } = article;
  const [result] = await db.query(
    `INSERT INTO articles (title, content, category, journalistid)
     VALUES (?, ?, ?, ?)`,
    [title, content, category, journalistid]
  );
  return { id: result.insertId, ...article };
}

// Update an article by ID (store only journalistid)
export async function updateArticle(id, updatedData) {
  const { title, content, category, journalistid } = updatedData;
  const [result] = await db.query(
    `UPDATE articles
     SET title = ?, content = ?, category = ?, journalistid = ?
     WHERE id = ?`,
    [title, content, category, journalistid, id]
  );
  if (result.affectedRows === 0) return null;
  return { id, ...updatedData };
}

// Delete an article by ID
export async function deleteArticle(id) {
  await db.query('DELETE FROM articles WHERE id = ?', [id]);
}
