export const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '1750abdb2cmshd17289e6b27b806p1d2308jsncd5b6d529efc',
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
  };
export const newsOptions = {
  method: 'GET',
  headers: {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': '1750abdb2cmshd17289e6b27b806p1d2308jsncd5b6d529efc',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
  }
};

export const useFetch = async (url:string, options:any) => {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
}
