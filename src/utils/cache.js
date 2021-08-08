export default function Cache() {
  const cache = {};
  function getCache(key) {
    return cache[key];
  }
  function setCache(key, data) {
    cache[key] = data;
  }
  return [getCache, setCache];
}
