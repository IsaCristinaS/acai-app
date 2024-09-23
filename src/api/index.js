export const DB_URL = "https://66eb6eea55ad32cda47c97b5.mockapi.io/api/v1/";

export const fetchData = async(path) => {
  try {
    const response = await fetch(`${DB_URL}${path}`)
    const res = await response.json()

    return res;
  } catch (error) {
    console.log(error)
  }
};
