import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Ticket, Shield, Share2, Heart, ArrowLeft, Users, Loader2, CheckCircle } from 'lucide-react';

export default function DetalleEvento() {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState(false);
  const [purchased, setPurchased] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchEvent = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${id}`);
        if (!response.ok) throw new Error('Evento no encontrado');
        const data = await response.json();
        setEvent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleBuyTicket = async () => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      router.push('/login');
      return;
    }

    const user = JSON.parse(savedUser);
    setBuying(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tickets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          eventId: event.id
        }),
      });

      if (!response.ok) throw new Error('Error al procesar la compra');
      
      setPurchased(true);
      setTimeout(() => router.push('/dashboard'), 2000);
    } catch (err) {
      alert(err.message);
    } finally {
      setBuying(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-20 bg-slate-50">
        <Loader2 className="w-16 h-16 text-primary-600 animate-spin mb-6" />
        <p className="text-slate-600 font-bold text-xl">Preparando los detalles del evento...</p>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">¡Ops! El evento no está disponible</h1>
        <p className="text-slate-500 mb-8 text-lg">Es posible que el evento haya sido cancelado o que el enlace sea incorrecto.</p>
        <Link href="/eventos" className="btn-primary px-8 py-3 font-bold inline-flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" />
          Volver a la cartelera
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* Header / Hero */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-slate-900">
           <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10" />
           <div className="absolute inset-0 bg-primary-600/30 blur-3xl opacity-50" />
        </div>
        
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-full max-w-7xl px-4 z-20">
           <Link href="/eventos" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 backdrop-blur-md bg-white/10 px-4 py-2 rounded-full transition-all font-medium">
             <ArrowLeft className="w-4 h-4" />
             Volver a eventos
           </Link>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-full max-w-7xl px-4 z-20">
          <div className="inline-block bg-primary-600 px-3 py-1 rounded-full text-xs font-bold text-white mb-4 tracking-wider uppercase shadow-lg shadow-primary-600/20">
            {event.category}
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 max-w-4xl tracking-tight leading-tight">
            {event.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-white/90">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary-400" />
              <span className="font-semibold text-lg">{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary-400" />
              <span className="font-semibold text-lg">{event.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <span className="w-1.5 h-8 bg-primary-600 rounded-full"></span>
                Sobre este evento
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-lg">
                <p className="mb-6">{event.fullDescription}</p>
                <div className="bg-primary-50 border-l-4 border-primary-500 p-6 rounded-r-2xl">
                  <p className="text-primary-900 font-medium italic">"No te pierdas esta oportunidad única de aprender, conectar y crecer profesionalmente. Las plazas son limitadas y se asignarán por orden de inscripción."</p>
                </div>
              </div>
            </section>
            
            <section className="bg-slate-50 rounded-3xl p-8 border border-slate-200">
               <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                 <Users className="w-5 h-5 text-primary-600" />
                 Organizador
               </h3>
               <div className="flex items-center gap-4">
                 <div className="w-16 h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center font-extrabold text-primary-600 text-2xl shadow-sm">
                    {event.organizer.charAt(0)}
                 </div>
                 <div>
                    <h4 className="font-bold text-slate-900 text-lg">{event.organizer}</h4>
                    <p className="text-sm text-slate-500 mb-2">Empresa verificada por EventHive</p>
                    <button className="text-sm font-bold text-primary-600 hover:text-primary-700">Ver perfil completo</button>
                 </div>
               </div>
            </section>
          </div>

          {/* Sidebar / Ticket */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white border border-slate-200 rounded-3xl p-8 shadow-xl shadow-slate-200/50 overflow-hidden">
               <div className="absolute top-0 right-0 w-24 h-24 bg-primary-500/5 -mr-8 -mt-8 rounded-full blur-2xl"></div>
               <div className="mb-6 relative">
                 <span className="text-slate-500 text-sm font-medium">Precio por ticket</span>
                 <div className="text-4xl font-extrabold text-slate-900 tracking-tight">
                   {Number(event.price).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                 </div>
               </div>

               {purchased ? (
                 <div className="w-full bg-green-50 text-green-700 p-4 rounded-2xl flex flex-col items-center gap-2 border border-green-200 animate-in fade-in zoom-in duration-300">
                    <CheckCircle className="w-10 h-10" />
                    <span className="font-bold">¡Entrada Comprada!</span>
                    <span className="text-xs">Redirigiendo a tus tickets...</span>
                 </div>
               ) : (
                 <button 
                   onClick={handleBuyTicket}
                   disabled={buying}
                   className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-3 mb-4 font-bold shadow-lg shadow-primary-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70"
                 >
                   {buying ? (
                     <>
                       <Loader2 className="w-6 h-6 animate-spin" />
                       Procesando...
                     </>
                   ) : (
                     <>
                       <Ticket className="w-6 h-6" />
                       Comprar Ticket Ahora
                     </>
                   )}
                 </button>
               )}

               <div className="space-y-4 pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Shield className="w-5 h-5 text-green-500 shrink-0" />
                    <span>Compra protegida y 100% segura</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Calendar className="w-5 h-5 text-primary-600 shrink-0" />
                    <span>Reembolso disponible hasta 7 días antes</span>
                  </div>
               </div>

               <div className="flex gap-4 mt-8">
                 <button className="flex-1 btn-secondary py-3 flex items-center justify-center gap-2 text-sm font-bold">
                   <Heart className="w-4 h-4" /> Guardar
                 </button>
                 <button className="flex-1 btn-secondary py-3 flex items-center justify-center gap-2 text-sm font-bold">
                   <Share2 className="w-4 h-4" /> Compartir
                 </button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
