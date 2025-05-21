import { OpenStreetMapServices } from "../constants/googleMap-config";

const fetchNearbyTheaters = async (lat:number, lng:number) :Promise<OSMElement[]| undefined>=> {
  const radius = 10000; // meterS

 const query = `
    [out:json];
    (
      node["amenity"="cinema"](around:${radius},${lat},${lng});
      way["amenity"="cinema"](around:${radius},${lat},${lng});
      relation["amenity"="cinema"](around:${radius},${lat},${lng});
    );
    out center;
  `;
  const url = `${OpenStreetMapServices.BASE_URL}//interpreter?data=${encodeURIComponent(query)}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
 
    return data.elements;    
  } catch (error) {
    console.error('Error fetching theaters:', error);
  }
};


export const GOOGLE_MAP_SERVICES={
fetchNearbyTheaters
}
