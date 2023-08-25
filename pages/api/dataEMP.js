// pages/api/dataEMP.js

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const { tanggal, est } = req.query;

      // Make a request to your Laravel API using fetch or a library like axios
      const response = await fetch(`http://localhost/api-srs-ssms.com/public/api/getDataEMp?tanggal=${tanggal}&est=${est}`);
      const emplacement = await response.json();

      res.status(200).json(emplacement);
    } else if (req.method === 'GET_FILTER') {
      const { idfilter } = req.query;

      // Make a request to your Laravel API to fetch filtered data based on the ID
      const response = await fetch(`http://localhost/api-srs-ssms.com/public/api/getFilter/${idfilter}`);
      const filteredData = await response.json();

      res.status(200).json(filteredData);
    } else if (req.method === 'DELETE') {
      const { id } = req.query;

      // Make a request to your Laravel API to delete the record
      const deleteResponse = await fetch(`http://localhost/api-srs-ssms.com/public/api/deleteDataEMP/${id}`, {
        method: 'DELETE',
      });

      if (deleteResponse.ok) {
        res.status(204).end(); // Successful deletion, no content to send
      } else {
        res.status(500).json({ error: 'Error deleting record' });
      }
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
}

async function getFilteredData(idfilter) {
  const response = await fetch(`http://localhost/api-srs-ssms.com/public/api/getFilter/${idfilter}`);
  const filteredData = await response.json();
  return filteredData;
}


async function updateData(idupdate, progress) {
  const response = await fetch(`http://localhost/api-srs-ssms.com/public/api/update/${idupdate}/${progress}`, {
    method: 'PUT', // Use PUT method for updates
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const update = await response.json();
  return update;
}


export { getFilteredData, updateData };
