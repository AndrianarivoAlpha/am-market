export const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
  }
};

export const fetchData = async ( url, opiton ) =>
{
  const fetchData = await fetch( url, opiton );
  const data = await fetchData.json();

  return data
}