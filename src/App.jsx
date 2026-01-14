import { useState, useCallback } from "react";
import "./App.css";

const STUDENT_COUNT = 10;
const ASPEK_COUNT = 4;
const SCORE_OPTIONS = Array.from({ length: 10 }, (_, i) => i + 1);

export default function App() {
  const [scores, setScores] = useState(() => {
    const initial = {};
    for (let i = 1; i <= STUDENT_COUNT; i++) {
      initial[`Mahasiswa ${i}`] = Array(ASPEK_COUNT).fill(1);
    }
    return initial;
  });

  const handleChange = useCallback((studentKey, aspectIndex, value) => {
    setScores(prev => {
      const updated = { ...prev };
      const aspekScores = [...updated[studentKey]];
      aspekScores[aspectIndex] = Number(value);
      updated[studentKey] = aspekScores;
      return updated;
    });
  }, []);

  const handleSave = () => {
    const result = {};

    for (let a = 0; a < ASPEK_COUNT; a++) {
      result[`aspek_penilaian_${a + 1}`] = {};
      Object.entries(scores).forEach(([student, values]) => {
        result[`aspek_penilaian_${a + 1}`][student] = values[a];
      });
    }

    console.log(result);
    alert(JSON.stringify(result, null, 2));
  };

  return (
    <div className="card">
      <h2 className="title">Aplikasi Penilaian Mahasiswa</h2>

      {/* Header */}
      <div className="table-header">
        <div>Mahasiswa</div>
        <div>Aspek Penilaian 1</div>
        <div>Aspek Penilaian 2</div>
        <div>Aspek Penilaian 3</div>
        <div>Aspek Penilaian 4</div>
      </div>

      {Object.entries(scores).map(([student, values]) => (
        <div key={student} className="table-row">
          {/* Desktop */}
          <div className="desktop-only">
            <strong>{student}</strong>

            {values.map((value, idx) => (
              <select
                key={idx}
                className="select"
                value={value}
                onChange={e => handleChange(student, idx, e.target.value)}
              >
                {SCORE_OPTIONS.map(n => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            ))}
          </div>

          {/* Mobile */}
          <div className="mobile-only">
            <strong>{student}</strong>

            <div className="aspek-group">
              {values.map((value, idx) => (
                <div key={idx} className="aspek-item">
                  <label>Aspek {idx + 1}</label>
                  <select
                    className="select"
                    value={value}
                    onChange={e => handleChange(student, idx, e.target.value)}
                  >
                    {SCORE_OPTIONS.map(n => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      <button onClick={handleSave}>Simpan</button>
    </div>
  );
}
