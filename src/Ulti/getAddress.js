import axios from "axios";

export async function getAddress(lat, lon) {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}
