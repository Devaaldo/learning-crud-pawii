import { NextResponse } from 'next/server'
import db from '../../../lib/db'

export async function GET(request, context) {
  const { id } = await context.params
  const sql = `SELECT * FROM travel_place WHERE id = ?`
  try {
    const [ rows ] = await db.query(sql, [id])
    return NextResponse.json(rows)
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}

export async function DELETE(request, context) {
  const { id } = await context.params
  const sql = `DELETE FROM travel_place WHERE id = ?`
  try {
    await db.query(sql, [id])
    return NextResponse.json({ status: 'OK' })
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}
