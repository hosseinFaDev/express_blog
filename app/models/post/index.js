const db = require('../../../database/mysql');

exports.count = async () => {
    const [rows, fields] = await db.query(`
    SELECT COUNT(id) as pageCount
    FROM posts
    `);

    return rows[0].pageCount;
}
exports.findPostInPagination = async (currentPage = 1, postPerPage = 10) => {
    const offset = (currentPage - 1) * postPerPage;
    const [rows, fields] = await db.query(`
    SELECT p.* , u.full_name
     FROM posts p 
     JOIN users u ON p.author_id=u.id 
    ORDER BY created_at DESC
    LIMIT ? , ?
    `, [offset, postPerPage]);

    return rows;
}
exports.findAll = async () => {
    const [rows, fields] = await db.query(`
    SELECT p.* , u.full_name
     FROM posts p 
     JOIN users u ON p.author_id=u.id 
    ORDER BY created_at DESC
    `,);

    return rows;
}

exports.create = async (postData) => {
    const [result] = await db.query(`INSERT INTO posts SET ?`, [postData]);
    return result.insertId;
}

exports.delete = async (postID) => {
    const [result] = await db.query(`
    DELETE FROM posts WHERE id=? LIMIT 1
    ` , [postID]);
}

exports.find = async (postID) => {
    const [rows, fields] = await db.query(`
    SELECT p.* , u.full_name
    FROM posts p 
    JOIN users u ON p.author_id=u.id 
    WHERE p.id=? LIMIT 1`
        , [postID]);
    return rows.length > 0 ? rows[0] : false;
}

exports.update = async (postID, updateFields) => {
    const [result] = await db.query(`
            UPDATE posts SET ? WHERE id=? LIMIT 1`
        , [updateFields, postID]);
}

exports.findBySlug = async (postSlug) => {
    const [result] = await db.query(`
SELECT * FROM posts WHERE slug = ? LIMIT 1`
        , [postSlug])
    return result;
}

exports.keyword = async (keyword) => {
    const [raws] = await db.query(`
    SELECT p.* , u.full_name
    FROM posts p  
    LEFT JOIN users u ON p.author_id=u.id
    WHERE p.title LIKE ? 
    ORDER BY created_at DESC
    `,['%' + keyword + '%'])
    return raws
}
exports.lastestPosts = async (limit = 10) => {
    const [raws] = await db.query(`
    SELECT p.* , u.full_name
    FROM posts p  
    LEFT JOIN users u ON p.author_id=u.id
    ORDER BY created_at DESC
    LIMIT ? 
    `,[limit])
    return raws
}