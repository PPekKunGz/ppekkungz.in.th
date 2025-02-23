"use client"
import { useEffect, useState } from 'react';
import fetchProject from '@/service/fetchProject';
import { IProject } from '@/types/interface';
import Image from 'next/image';

export default function Page() {
  const [project, setProject] = useState<IProject[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProject();
        setProject(data);
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full h-full container flex flex-wrap gap-5 justify-center items-center mt-10">
      <div className="absolute animate-bounce text-center top-36 right-0 bg-purple-300 px-4 py-1 rounded-xl text-muted font-clash font-medium">
        <p>Experimental Data</p>
        <p className="text-sm shadow-xl text-white">without design</p>
      </div>
      {error ? (
        <div className="error">{error}</div>
      ) : (
        project.map((project, index) => (
          <div key={index}>
            <div className="rounded-lg w-56 w-56 h-56">
              <Image src={project.image} alt={project.title} width={0} height={200} draggable="false" className="w-full h-full rounded-lg object-cover"/>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
