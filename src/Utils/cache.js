export function getArchitectureHash(nodes, edges) {
  if (!nodes || nodes.length === 0) return "empty";
  
  // Sort nodes and edges to ensure deterministic string representation
  const sortedNodes = [...nodes]
    .map((n) => ({
      id: n.id,
      label: n.data?.label,
      category: n.data?.category,
    }))
    .sort((a, b) => a.id.localeCompare(b.id));

  const sortedEdges = [...edges]
    .map((e) => ({
      source: e.source,
      target: e.target,
    }))
    .sort((a, b) => {
      const aVal = `${a.source}->${a.target}`;
      const bVal = `${b.source}->${b.target}`;
      return aVal.localeCompare(bVal);
    });

  const rawString = JSON.stringify({ nodes: sortedNodes, edges: sortedEdges });

  // Simple, fast hash calculation
  let hash = 0;
  for (let i = 0; i < rawString.length; i++) {
    const char = rawString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36);
}

const memoryCache = {};

export function getFromCache(archHash, nodeId) {
  if (!archHash || !nodeId) return null;

  // Check memory cache
  if (memoryCache[archHash] && memoryCache[archHash][nodeId]) {
    return memoryCache[archHash][nodeId];
  }

  // Check localStorage cache
  try {
    const cacheKey = `bf_cache_${archHash}`;
    const cachedDataString = localStorage.getItem(cacheKey);
    if (cachedDataString) {
      const cachedData = JSON.parse(cachedDataString);
      if (cachedData[nodeId]) {
        // Hydrate memory cache
        if (!memoryCache[archHash]) memoryCache[archHash] = {};
        memoryCache[archHash][nodeId] = cachedData[nodeId];
        return cachedData[nodeId];
      }
    }
  } catch (error) {
    console.warn("localStorage cache read failed:", error);
  }

  return null;
}

export function saveToCache(archHash, nodeId, details) {
  if (!archHash || !nodeId || !details) return;

  // Save to memory cache
  if (!memoryCache[archHash]) memoryCache[archHash] = {};
  memoryCache[archHash][nodeId] = details;

  // Save to localStorage
  try {
    const cacheKey = `bf_cache_${archHash}`;
    const cachedDataString = localStorage.getItem(cacheKey);
    const cachedData = cachedDataString ? JSON.parse(cachedDataString) : {};
    cachedData[nodeId] = details;
    localStorage.setItem(cacheKey, JSON.stringify(cachedData));
  } catch (error) {
    console.warn("localStorage cache write failed:", error);
  }
}
