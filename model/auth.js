const { pool } = require('./conn')


async function finduser(id) {
    let conn = pool.getConnection
    try{
        const [row] = await conn.query(
            `SELECT id, username, full_name, email, roles, is_active FROM users WHERE id = ? LIMIT 1`,
            [id]
        )
        return row[0] || null
    }finally {
        conn.release()
    }
}

async function login(username) {
    let conn = pool.getConnection
    try{
        const [row] = await conn.query(
        `SELECT * FROM users WHERE username = ? LIMIT 1`,[username])
        return row[0] || null
    }finally{
        conn.release()
    }
}

async function register(username, hash, full_name, email, phone, position, department) {
    let conn = pool.getConnection
    try{
        const[row] = await conn.query(
            `INSERT INTO users (username,password_hash,full_name,email,phone,position,department,role) VALUES (?, ?, ?, ?, ?, ?, ?, 'assessee')`,
            [username, hash, full_name, email, phone || null, position || null, department || null]
        )
        return row.insertId || null
    }finally{
        conn.release
    }
}

async function getprofile(id) {
    let conn = pool.getConnection
    try{
        const[row] = conn.query(
            `SELECT * FROM users WHERE id = ?`,[id]
        )
        return row[0] || null
    }finally{
        conn.release
    }
}

async function editprofile(id, full_name, email, phone, position, department) {
    let conn = pool.getConnection
    try{
        await conn.query(
            `UPDATE users SET full_name = ?, email = ?, phone =?, position= ?, department =?, WHERE id = ?,`,
            [full_name,email,phone|| null,position|| null,department || null,id]
        )
    }finally{
        conn.release
    }
}

async function getpassword(id) {
    let conn = pool.getConnection()
    try{
        const[row] = await conn.query(`
            SELECT password_hash FROM users WHERE id = ?`,[id])
            return row[0] ? row[0].password_hash : null
    }finally{
        conn.release
    }
}

async function setpassword(hash, id) {
    let conn = pool.getConnection
    try{
        await conn.query(
            `UPDATE users SET password_hash = ? WHERE id = ?`,[hash,id] 
        )
    }finally{
        conn.release
    }
}

module.exports = {finduser, login, register, getprofile, editprofile, getpassword, setpassword}