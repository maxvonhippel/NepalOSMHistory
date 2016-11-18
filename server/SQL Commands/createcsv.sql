\COPY (
SELECT
  date_trunc('day', timestamp) "day",
  sum(case when version = '1' then 1 else 0 end) as New_Features,
  sum(case when != '1' then 1 else 0 end) as Edits
FROM
	osmhistorynepal_feature
WHERE
	id
IN ( SELECT DISTINCT ON (feature_type, feature_id) max(id) FROM osmhistorynepal_feature ORDER BY feature_type, feature_id )
GROUP BY
  day
) TO '/home/OSM-timeline.csv' DELIMITER ',' CSV HEADER;