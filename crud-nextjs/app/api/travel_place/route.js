import { NextResponse } from 'next/server'
import db from '../../lib/db'

export async function GET(request) {
  const sql = 'SELECT * FROM travel_place'
  try {
    const [ rows ] = await db.query(sql)
    return NextResponse.json(rows)
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}

export async function POST(request) {
  const { name, location, photo_url, rating } = await request.json()
  const sql = 'INSERT INTO travel_place VALUES (null, ?, ?, ?, ?)'
  try {
    const [ result ] = await db.query(sql, [name, location, photo_url, rating])
    return NextResponse.json({ id: result.insertId })
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}

export async function PUT(request) {
  const { id, name, location, photo_url, rating } = await request.json()
  const sql = 'UPDATE travel_place SET name = ?, location = ?, photo_url = ?, rating = ? WHERE id = ?'
  try {
    await db.query(sql, [name, location, photo_url, rating, id])
    return NextResponse.json({ status: 'OK' })
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}
