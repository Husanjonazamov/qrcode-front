import axios from "axios";
import config from "../config";

const fetchItems = async ({
  page,
  setApiItems,
  setPaginationLinks,
  setTotalPages,
  setCurrentPage,
  setLoading,
  setError,
}) => {
  try {
    setLoading(true);
    const response = await axios.get(`${config.BASE_URL}/api/generate/?page=${page}`);
    const result = response.data;

    if (result?.data?.results && Array.isArray(result.data.results)) {
      const sortedItems = result.data.results.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      setApiItems(sortedItems);
      setPaginationLinks(result.data.links || { next: null, previous: null });
      setTotalPages(result.data.total_pages || 1);
      setCurrentPage(result.data.current_page || page); 
    } else {
      console.error("Unexpected response format:", result);
      setApiItems([]);
      setPaginationLinks({ next: null, previous: null });
    }

    setLoading(false);
  } catch (err) {
    setError("Ma'lumotlarni yuklashda xatolik yuz berdi");
    setLoading(false);
  }
};

export default fetchItems;
