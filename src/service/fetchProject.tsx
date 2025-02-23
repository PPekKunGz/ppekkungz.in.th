export const fetchProject = async () => {
  try {
    const response = await fetch(`${process.env.apiUrl}/projects`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching project data:', error);
    throw error;
  }
};

export default fetchProject;
