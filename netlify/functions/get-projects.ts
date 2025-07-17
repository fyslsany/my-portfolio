
// NOTE: When you have a database configured with 'npx netlify db:init',
// you can uncomment the neon import and the database query below.
// import { neon } from '@netlify/neon';

const fallbackProjects = [
  { id: 1, title: 'QuantumLeap Inc.', category: 'Brand Identity', imageUrl: 'https://picsum.photos/seed/quantum/600/400' },
  { id: 2, title: 'Nova Financial', category: 'Logo & Web', imageUrl: 'https://picsum.photos/seed/nova/600/400' },
  { id: 3, title: 'Aether Cosmetics', category: 'Packaging Design', imageUrl: 'https://picsum.photos/seed/aether/600/400' },
  { id: 4, title: 'Zenith Robotics', category: 'Full Rebrand', imageUrl: 'https://picsum.photos/seed/zenith/600/400' },
];

export default async (req, context) => {
  try {
    // In a real-world scenario with a configured DB, you would use this:
    // const sql = neon(); 
    // const projects = await sql`SELECT id, title, category, image_url as "imageUrl" FROM projects ORDER BY id;`;
    
    // For now, we return static data to demonstrate the function.
    const projects = fallbackProjects;

    return new Response(JSON.stringify(projects), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    // Return static data as a fallback on server-side error
    return new Response(JSON.stringify({ message: 'Failed to fetch projects', error: error.message }), {
        headers: { "Content-Type": "application/json" },
        status: 500,
    });
  }
};

export const config = {
  path: "/api/get-projects",
};