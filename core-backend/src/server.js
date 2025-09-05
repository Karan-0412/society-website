import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { nanoid } from "nanoid";
import pool, {sql } from "../connection/db.js";

dotenv.config();

const app = express();
const PORT = process.env.CORE_PORT || 5050;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Helper function to get database connection
async function getConnection() {
  try {
    return await pool;
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
}

// Routes
app.get("/health", (req, res) => res.json({ ok: true }));

// Core team auth - accepts { idOrEmail, password }
app.post("/api/core-auth/login", async (req, res) => {
  console.log("Auth endpoint hit with body:", req.body);
  const { idOrEmail, password } = req.body || {};

  if (!idOrEmail || !password) {
    return res.status(400).json({ message: "idOrEmail and password are required" });
  }

  try {
    const connection = await getConnection();

    // Check against both id and email
    const result = await connection.request()
      .input("idOrEmail", sql.NVarChar, idOrEmail.toLowerCase())
      .query(`
        SELECT TOP 1 * 
        FROM core_team 
        WHERE LOWER(id) = @idOrEmail OR LOWER(email) = @idOrEmail
      `);

    if (result.recordset.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = result.recordset[0];

    // ⚠️ Currently comparing plain text passwords - should use bcrypt in production
    if (user.passwordHash !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate demo token
    const token = `core.${user.id}.${Date.now()}`;

    res.json({
      token,
      role: "core_team",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        phone_no: user.phone_no,
        status: user.status
      }
    });

  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ message: "Database error" });
  }
});

// Members CRUD
app.get("/api/members", async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.request().query("SELECT * FROM members ORDER BY joinDate DESC");

    res.json(result.recordset);
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

app.post("/api/members", async (req, res) => {
  const { name, email, role = "Member", phone = "", status = "active" } = req.body || {};
  
  if (!name || !email) {
    return res.status(400).json({ error: "name and email are required" });
  }

  const id = nanoid(10);
  const joinDate = new Date().toISOString().slice(0, 10);

  try {
    const connection = await getConnection();

    await connection.request()
      .input("id", sql.NVarChar, id)
      .input("name", sql.NVarChar, name)
      .input("email", sql.NVarChar, email)
      .input("role", sql.NVarChar, role)
      .input("phone", sql.NVarChar, phone)
      .input("status", sql.NVarChar, status)
      .input("joinDate", sql.Date, joinDate)
      .query(`
        INSERT INTO members (id, name, email, role, phone, status, joinDate)
        VALUES (@id, @name, @email, @role, @phone, @status, @joinDate)
      `);

    res.status(201).json({ id, name, email, role, phone, status, joinDate });
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ error: "Database insert failed" });
  }
});

app.put("/api/members/:memberId", async (req, res) => {
  const { memberId } = req.params;
  const { name, email, role, phone, status } = req.body || {};

  try {
    const connection = await getConnection();

    // Check if member exists
    const result = await connection.request()
      .input("id", sql.NVarChar, memberId)
      .query("SELECT * FROM members WHERE id = @id");

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: "Member not found" });
    }

    // Update fields (only if provided)
    const existing = result.recordset[0];
    await connection.request()
      .input("id", sql.NVarChar, memberId)
      .input("name", sql.NVarChar, name || existing.name)
      .input("email", sql.NVarChar, email || existing.email)
      .input("role", sql.NVarChar, role || existing.role)
      .input("phone", sql.NVarChar, phone || existing.phone)
      .input("status", sql.NVarChar, status || existing.status)
      .query(`
        UPDATE members
        SET name = @name,
            email = @email,
            role = @role,
            phone = @phone,
            status = @status
        WHERE id = @id
      `);

    res.json({
      id: memberId,
      name: name || existing.name,
      email: email || existing.email,
      role: role || existing.role,
      phone: phone || existing.phone,
      status: status || existing.status,
      joinDate: existing.joinDate
    });

  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ error: "Database update failed" });
  }
});

app.delete("/api/members/:memberId", async (req, res) => {
  const { memberId } = req.params;

  try {
    const connection = await getConnection();

    // Check if member exists
    const result = await connection.request()
      .input("id", sql.NVarChar, memberId)
      .query("SELECT * FROM members WHERE id = @id");

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: "Member not found" });
    }

    // Delete the member
    await connection.request()
      .input("id", sql.NVarChar, memberId)
      .query("DELETE FROM members WHERE id = @id");

    res.json({ ok: true });

  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ error: "Database delete failed" });
  }
});

// Events CRUD
app.get("/api/events", async (req, res) => {
  try {
    const connection = await getConnection();

    // Fetch events with participant count
    const result = await connection.request().query(`
      SELECT 
        e.*,
        COUNT(ep.member_id) as attendees
      FROM events e
      LEFT JOIN event_participants ep ON e.id = ep.event_id
      GROUP BY e.id, e.title, e.description, e.date, e.time, e.location, e.status, e.category, e.maxAttendees
      ORDER BY e.date DESC
    `);

    const list = result.recordset.map(e => ({
      id: e.id,
      title: e.title,
      description: e.description,
      date: e.date,
      time: e.time,
      location: e.location,
      attendees: e.attendees || 0,
      status: e.status,
      category: e.category,
      maxAttendees: e.maxAttendees || undefined
    }));

    res.json(list);

  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ error: "Database fetch failed" });
  }
});

app.get("/api/events/:eventId", async (req, res) => {
  const { eventId } = req.params;

  try {
    const connection = await getConnection();

    // Get event
    const eventResult = await connection.request()
      .input("id", sql.UniqueIdentifier, eventId)
      .query("SELECT * FROM events WHERE id = @id");

    if (eventResult.recordset.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    const event = eventResult.recordset[0];

    // Get participants with attendance state
    const partResult = await connection.request()
      .input("eventId", sql.UniqueIdentifier, eventId)
      .query(`
        SELECT 
          m.id,
          m.name,
          m.email,
          m.phone,
          m.teamName,
          m.uid,
          ep.attended,
          ep.dlNo
        FROM event_participants ep
        INNER JOIN members m ON ep.member_id = m.id
        WHERE ep.event_id = @eventId
      `);

    const participants = partResult.recordset.map(p => ({
      id: p.id,
      name: p.name,
      email: p.email,
      phone: p.phone,
      teamName: p.teamName,
      uid: p.uid,
      attended: p.attended,
      dlNo: p.dlNo || ""
    }));

    res.json({ ...event, participants });

  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ error: "Database fetch failed" });
  }
});

app.post("/api/events", async (req, res) => {
  const {
    title,
    description,
    date,
    time,
    location,
    status = "upcoming",
    category = "meeting",
    participants = [],
  } = req.body || {};

  if (!title || !date || !time || !location) {
    return res.status(400).json({ 
      error: "title, date, time, location are required" 
    });
  }

  try {
    const connection = await getConnection();
    const eventId = nanoid(10);

    // Insert into events
    await connection.request()
      .input("id", sql.NVarChar, eventId)
      .input("title", sql.NVarChar(255), title)
      .input("description", sql.NVarChar(sql.MAX), description || "")
      .input("date", sql.Date, date)
      .input("time", sql.Time, time)
      .input("location", sql.NVarChar(255), location)
      .input("status", sql.NVarChar(50), status)
      .input("category", sql.NVarChar(50), category)
      .query(`
        INSERT INTO events (id, title, description, date, time, location, status, category)
        VALUES (@id, @title, @description, @date, @time, @location, @status, @category)
      `);

    // Insert participants (if any)
    for (const memberId of participants) {
      await connection.request()
        .input("event_id", sql.NVarChar, eventId)
        .input("member_id", sql.NVarChar(50), memberId)
        .query(`
          INSERT INTO event_participants (event_id, member_id)
          VALUES (@event_id, @member_id)
        `);
    }

    res.status(201).json({
      id: eventId,
      title,
      description,
      date,
      time,
      location,
      status,
      category,
      participants,
    });
  } catch (err) {
    console.error("Error inserting event:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.patch("/api/events/:eventId", async (req, res) => {
  const { eventId } = req.params;
  const allowed = ["title", "description", "date", "time", "location", "status", "category"];

  // Keep only valid fields
  const updates = Object.fromEntries(
    Object.entries(req.body || {}).filter(([k]) => allowed.includes(k))
  );

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: "No valid fields to update" });
  }

  try {
    const connection = await getConnection();

    // Check if event exists first
    const checkResult = await connection.request()
      .input("eventId", sql.UniqueIdentifier, eventId)
      .query("SELECT id FROM events WHERE id = @eventId");

    if (checkResult.recordset.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Build SET clause dynamically
    const setClause = Object.keys(updates)
      .map((key, i) => `${key} = @val${i}`)
      .join(", ");

    const request = connection.request();
    request.input("eventId", sql.UniqueIdentifier, eventId);

    Object.entries(updates).forEach(([key, val], i) => {
      // Determine SQL type based on field
      let sqlType = sql.NVarChar;
      if (key === 'date') sqlType = sql.Date;
      else if (key === 'time') sqlType = sql.Time;
      
      request.input(`val${i}`, sqlType, val);
    });

    await request.query(`UPDATE events SET ${setClause} WHERE id = @eventId`);

    // Get updated event
    const result = await connection.request()
      .input("eventId", sql.UniqueIdentifier, eventId)
      .query("SELECT * FROM events WHERE id = @eventId");

    res.json(result.recordset[0]);
  } catch (err) {
    console.error("Error updating event:", err);
    res.status(500).json({ error: "Failed to update event" });
  }
});

app.delete("/api/events/:eventId", async (req, res) => {
  const { eventId } = req.params;

  try {
    const connection = await getConnection();

    // Check if event exists
    const checkResult = await connection.request()
      .input("eventId", sql.UniqueIdentifier, eventId)
      .query("SELECT id FROM events WHERE id = @eventId");

    if (checkResult.recordset.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Delete participants linked to this event first (FK cleanup)
    await connection.request()
      .input("eventId", sql.UniqueIdentifier, eventId)
      .query("DELETE FROM event_participants WHERE event_id = @eventId");

    // Then delete the event itself
    await connection.request()
      .input("eventId", sql.UniqueIdentifier, eventId)
      .query("DELETE FROM events WHERE id = @eventId");

    res.json({ ok: true });
  } catch (err) {
    console.error("Error deleting event:", err);
    res.status(500).json({ error: "Failed to delete event" });
  }
});

// Participants for an event
app.post("/api/events/:eventId/participants", async (req, res) => {
  const { eventId } = req.params;
  const { 
    teamName = "", 
    uid = "", 
    email = "", 
    phone = "", 
    name = "", 
    attended = null, 
    dlNo = "" 
  } = req.body || {};
  
  if (!name || !email) {
    return res.status(400).json({ error: "name and email are required" });
  }

  try {
    const connection = await getConnection();

    // Check if event exists
    const checkEvent = await connection.request()
      .input("eventId", sql.UniqueIdentifier, eventId)
      .query("SELECT id FROM events WHERE id = @eventId");

    if (checkEvent.recordset.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Check if member already exists by email
    let memberId;
    const memberCheck = await connection.request()
      .input("email", sql.NVarChar, email)
      .query("SELECT id FROM members WHERE email = @email");

    if (memberCheck.recordset.length > 0) {
      memberId = memberCheck.recordset[0].id;
    } else {
      // Create new member
      memberId = nanoid(10);
      await connection.request()
        .input("id", sql.NVarChar(50), memberId)
        .input("name", sql.NVarChar(100), name)
        .input("email", sql.NVarChar(100), email)
        .input("phone", sql.NVarChar(20), phone)
        .input("teamName", sql.NVarChar(100), teamName)
        .input("uid", sql.NVarChar(50), uid)
        .input("role", sql.NVarChar(50), "Member")
        .input("status", sql.NVarChar(50), "active")
        .input("joinDate", sql.Date, new Date().toISOString().slice(0, 10))
        .query(`
          INSERT INTO members (id, name, email, phone, teamName, uid, role, status, joinDate)
          VALUES (@id, @name, @email, @phone, @teamName, @uid, @role, @status, @joinDate)
        `);
    }

    // Check if participant is already registered for this event
    const participantCheck = await connection.request()
      .input("eventId", sql.UniqueIdentifier, eventId)
      .input("memberId", sql.NVarChar(50), memberId)
      .query("SELECT * FROM event_participants WHERE event_id = @eventId AND member_id = @memberId");

    if (participantCheck.recordset.length > 0) {
      return res.status(400).json({ error: "Member already registered for this event" });
    }

    // Add to event_participants
    await connection.request()
      .input("eventId", sql.UniqueIdentifier, eventId)
      .input("memberId", sql.NVarChar(50), memberId)
      .input("attended", sql.Bit, attended)
      .input("dlNo", sql.NVarChar(50), dlNo)
      .query(`
        INSERT INTO event_participants (event_id, member_id, attended, dlNo)
        VALUES (@eventId, @memberId, @attended, @dlNo)
      `);

    const participant = { 
      id: memberId, 
      name, 
      email, 
      phone, 
      teamName, 
      uid, 
      dlNo, 
      attended 
    };
    
    res.status(201).json(participant);

  } catch (err) {
    console.error("Error adding participant:", err);
    res.status(500).json({ error: "Failed to add participant" });
  }
});

app.put("/api/events/:eventId/participants/:participantId", async (req, res) => {
  const { eventId, participantId } = req.params;
  const { phone, attended, dlNo } = req.body;

  try {
    const connection = await getConnection();

    // Check if participant exists in the event
    const checkResult = await connection.request()
      .input("eventId", sql.UniqueIdentifier, eventId)
      .input("participantId", sql.NVarChar, participantId)
      .query(`
        SELECT ep.* FROM event_participants ep
        WHERE ep.event_id = @eventId AND ep.member_id = @participantId
      `);

    if (checkResult.recordset.length === 0) {
      return res.status(404).json({ error: "Participant not found" });
    }

    // Update participant in event_participants
    await connection.request()
      .input("eventId", sql.UniqueIdentifier, eventId)
      .input("participantId", sql.NVarChar, participantId)
      .input("attended", sql.Bit, attended)
      .input("dlNo", sql.NVarChar, dlNo || "")
      .query(`
        UPDATE event_participants
        SET attended = @attended, dlNo = @dlNo
        WHERE event_id = @eventId AND member_id = @participantId
      `);

    // Update member phone if provided
    if (phone !== undefined) {
      await connection.request()
        .input("participantId", sql.NVarChar, participantId)
        .input("phone", sql.NVarChar, phone)
        .query(`
          UPDATE members
          SET phone = @phone
          WHERE id = @participantId
        `);
    }

    // Get updated participant info
    const updated = await connection.request()
      .input("eventId", sql.UniqueIdentifier, eventId)
      .input("participantId", sql.NVarChar, participantId)
      .query(`
        SELECT 
          m.id, m.name, m.email, m.phone, m.teamName, m.uid,
          ep.attended, ep.dlNo
        FROM event_participants ep
        INNER JOIN members m ON ep.member_id = m.id
        WHERE ep.event_id = @eventId AND ep.member_id = @participantId
      `);

    res.json(updated.recordset[0]);

  } catch (err) {
    console.error("Error updating participant:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/api/events/:eventId/participants/:participantId", async (req, res) => {
  const { eventId, participantId } = req.params;

  try {
    const connection = await getConnection();

    // Check if event exists
    const eventCheck = await connection.request()
      .input("eventId", sql.UniqueIdentifier, eventId)
      .query("SELECT id FROM events WHERE id = @eventId");

    if (eventCheck.recordset.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Delete participant from event
    const result = await connection.request()
      .input("eventId", sql.UniqueIdentifier, eventId)
      .input("participantId", sql.NVarChar, participantId)
      .query(`
        DELETE FROM event_participants
        WHERE event_id = @eventId AND member_id = @participantId
      `);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: "Participant not found" });
    }

    res.json({ ok: true });
  } catch (err) {
    console.error("Error removing participant:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Bulk attendance update
app.put("/api/events/:eventId/attendance", async (req, res) => {
  const { eventId } = req.params;
  const { entries } = req.body || {};

  if (!Array.isArray(entries)) {
    return res.status(400).json({ error: "entries must be an array" });
  }

  try {
    const connection = await getConnection();

    // Check if event exists
    const eventCheck = await connection.request()
      .input("eventId", sql.UniqueIdentifier, eventId)
      .query("SELECT id FROM events WHERE id = @eventId");

    if (eventCheck.recordset.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Update each participant's attendance
    for (const item of entries) {
      if (!item || !item.participantId) continue;

      await connection.request()
        .input("eventId", sql.UniqueIdentifier, eventId)
        .input("participantId", sql.NVarChar, item.participantId)
        .input("attended", sql.Bit, item.attended ?? null)
        .input("dlNo", sql.NVarChar, item.dlNo ?? "")
        .query(`
          UPDATE event_participants 
          SET attended = @attended, dlNo = @dlNo
          WHERE event_id = @eventId AND member_id = @participantId
        `);
    }

    res.json({ ok: true });
  } catch (err) {
    console.error("Error updating attendance:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`[core-backend] listening on http://localhost:${PORT}`);
});