export async function isUserFromIran() {
  try {
    const res = await fetch('https://ipwhois.app/json/');
    const data = await res.json();
    return data.country_code === 'IR';
  } catch {
    return false;
  }
}
