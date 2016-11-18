\COPY (
SELECT row_to_json(t)
FROM (
  SELECT feature_type, feature_id,
    (
      SELECT array_to_json(array_agg(row_to_json(d)))
      FROM (
        SELECT lat, lon
        FROM features
        WHERE id = populate_feature.id
        ORDER BY id DESC
      ) d
    ) AS features
  FROM populate_feature
  WHERE feature_type = 'node'
) t
) TO '/home/OSM-geojson.json'