const URL_BASE = 'https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev';

export const getImages = async nodeId => {
  const url = nodeId ? `${URL_BASE}/${nodeId}` : URL_BASE;
  const res = await fetch(url);
  return await res.json();
};
