const { pool } = require('./conn')

async function addlog(userid, action, entity, entityId, detail, ip) {
    let conn =pool.getConnection
    try{
         await conn.query(
            `INSERT INTO audit_logs(user_id,action,entity,entity_id,detail,ip_address) VALUES (?,?,?,?,?,?,)`,
            [userid || null,action,entity || null, entity || null,detail ? String(detail).slice(0, 500) : null, ip || null]
        )
    }catch(e){
        console.log('audit log failed:', e.message)
    }finally{
        conn.release()
    }
}



async function getlogs(limit) {
    let conn = await pool.getConnection
    try{
        const [row] = await conn.query(
            `SELECT * l.id,action,l,entity,l.entity_id,l.detail,l.ip_address,l.created_at,u.full_name AS user_name
            FROM audit_logs l LEFT JOIN users u ON u.id = l.user_id
            ORDER BY l.id DESC LIMIT ?`,
            [limit]
        )
        return row
    }finally{
        conn.release()
    }
}
module.exports = { addlog, getlogs}