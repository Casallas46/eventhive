import { useState, useEffect } from 'react';
import EventCard from '@/components/EventCard';
import { Search, Filter, SlidersHorizontal, Loader2 } from 'lucide-react';

export default function Eventos() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`);
        if (!response.ok) throw new Error('Error al cargar eventos');
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Explorar Eventos</h1>
          <p className="text-slate-500">Encuentra tu próxima experiencia inolvidable.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Nombre, ciudad o categoría..." 
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all shadow-sm"
            />
          </div>
          <button className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
            <SlidersHorizontal className="w-5 h-5 text-slate-600" />
          </button>
        </div>
      </div>

      <div className="flex gap-4 mb-8 overflow-x-auto pb-2 no-scrollbar">
        {['Todos', 'Tecnología', 'Música', 'Diseño', 'Emprendimiento', 'Deportes', 'Culinaria'].map((cat, i) => (
          <button 
            key={cat} 
            className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              i === 0 ? 'bg-primary-600 text-white shadow-md shadow-primary-200' : 'bg-white text-slate-600 border border-slate-200 hover:border-primary-400 hover:text-primary-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-12 h-12 text-primary-600 animate-spin mb-4" />
          <p className="text-slate-500 font-medium text-lg">Cargando eventos increíbles...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl text-center">
          <p className="font-bold mb-1 text-lg">¡Vaya! Algo salió mal</p>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {events.length > 0 ? (
            events.map(event => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <p className="text-slate-500 text-lg">No se encontraron eventos disponibles por el momento.</p>
            </div>
          )}
        </div>
      )}
      
      {!loading && !error && events.length > 0 && (
        <div className="mt-16 text-center">
          <button className="btn-secondary px-8 py-3 font-bold">Cargar más eventos</button>
        </div>
      )}
    </div>
  );
}
