"use client"
import React, { useState } from 'react'

export default function FinalPage() {
  const [show, setShow] = useState(false)

  return (
    <main style={{ padding: 24, fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial' }}>
      <h1 style={{ margin: 0, fontSize: 28 }}>Final Page</h1>
      <p style={{ color: '#444' }}>This is the final page — a small interactive example.</p>

      <button
        onClick={() => setShow(v => !v)}
        style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc', cursor: 'pointer', background: '#fff' }}
      >
        {show ? 'Hide' : 'Reveal'} surprise
      </button>

      {show && (
        <div style={{ marginTop: 16, padding: 12, borderRadius: 8, background: '#f6f8fa' }}>
          <strong>Surprise:</strong> You made it to the final page! 🎉
        </div>
      )}
    </main>
  )
}