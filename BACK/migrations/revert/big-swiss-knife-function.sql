-- Revert bookbusters:big-swiss-knife-function from pg

BEGIN;

DROP FUNCTION get_book(integer, integer[], text[], text[], integer, integer);

COMMIT;
