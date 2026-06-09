-- Tabla de apuestas deportivas
CREATE TYPE bet_status AS ENUM ('pending', 'won', 'lost');

CREATE TABLE IF NOT EXISTS bets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  apuesta TEXT,
  stake NUMERIC(10, 2) NOT NULL CHECK (stake > 0),
  odds NUMERIC(6, 2) NOT NULL CHECK (odds > 1),
  status bet_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_bets_status ON bets (status);
CREATE INDEX IF NOT EXISTS idx_bets_created_at ON bets (created_at DESC);

-- Row Level Security (acceso público para app personal sin auth)
ALTER TABLE bets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir lectura pública"
  ON bets FOR SELECT
  USING (true);

CREATE POLICY "Permitir inserción pública"
  ON bets FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Permitir actualización pública"
  ON bets FOR UPDATE
  USING (true);

CREATE POLICY "Permitir eliminación pública"
  ON bets FOR DELETE
  USING (true);
