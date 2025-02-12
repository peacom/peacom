export const memoryCacheService = (getItem: (params: any) => Promise<any>) => {
  const CACHE = {} as Record<string, any>;

  const fetch = async (params: any, key: string | null = null) => {
    const _key = key || JSON.stringify(params)
    console.log(`Key: ${_key}`)
    let existed = CACHE[`item_${_key}`];
    if (!existed) {
      existed = await getItem(params);
      CACHE[`item_${_key}`] = existed;
    }
    return existed;
  };
  return {
    fetch,
  };
};
