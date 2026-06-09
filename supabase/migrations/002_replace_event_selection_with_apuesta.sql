-- Migración para tablas creadas con la versión anterior (event + selection)
ALTER TABLE bets ADD COLUMN IF NOT EXISTS apuesta TEXT;

UPDATE bets
SET apuesta = TRIM(
  CONCAT(
    event,
    CASE WHEN selection IS NOT NULL AND selection <> '' THEN ' - ' || selection ELSE '' END
  )
)
WHERE apuesta IS NULL
  AND (event IS NOT NULL OR selection IS NOT NULL);

ALTER TABLE bets DROP COLUMN IF EXISTS event;
ALTER TABLE bets DROP COLUMN IF EXISTS selection;
