import Link from 'next/link';
import EventCard from '@/components/EventCard';
import { mockEvents } from '@/data/mockEvents';
import { ArrowRight, Calendar, Users, Shield } from 'lucide-react';

export default function Home() {
  const featuredEvents = mockEvents.slice(0, 3);

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-primary-50/50 to-transparent -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6">
            Gestiona tus eventos <br />
            <span className="text-primary-600 italic">sin complicaciones</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            La plataforma más moderna para organizar, vender tickets y descubrir experiencias únicas. Todo en un solo lugar.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/eventos" className="btn-primary text-lg px-8 py-4 flex items-center justify-center gap-2">
              Explorar Eventos <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/register" className="btn-secondary text-lg px-8 py-4">
              Empezar Gratis
            </Link>
          </div>
          
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
             {/* Simple brand logos placeholders */}
             <div className="text-xl font-bold italic">TECH CORP</div>
             <div className="text-xl font-bold italic">MUSIC LIVE</div>
             <div className="text-xl font-bold italic">DESIGN PRO</div>
             <div className="text-xl font-bold italic">STARTUP INC</div>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Eventos Destacados</h2>
            <p className="text-slate-500">Descubre las mejores experiencias seleccionadas para ti.</p>
          </div>
          <Link href="/eventos" className="hidden sm:flex items-center gap-2 text-primary-600 font-semibold hover:underline">
            Ver todos <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-900 py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-white">¿Por qué elegir EventHive?</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Nuestra tecnología está diseñada para que tú solo te preocupes de vivir la experiencia.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary-600/20 rounded-2xl flex items-center justify-center mb-6 border border-primary-500/30">
                <Calendar className="w-8 h-8 text-primary-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Gestión Simplificada</h3>
              <p className="text-slate-400">Crea y publica tus eventos en cuestión de minutos con nuestra interfaz intuitiva.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary-600/20 rounded-2xl flex items-center justify-center mb-6 border border-primary-500/30">
                <Users className="w-8 h-8 text-primary-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Escalabilidad Total</h3>
              <p className="text-slate-400">Preparado para eventos desde 10 hasta 100,000 asistentes sin latencia.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary-600/20 rounded-2xl flex items-center justify-center mb-6 border border-primary-500/30">
                <Shield className="w-8 h-8 text-primary-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Seguridad Garantizada</h3>
              <p className="text-slate-400">Tickets digitales encriptados y acceso seguro con códigos QR únicos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary-600 rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para crear tu próximo gran evento?</h2>
            <p className="text-primary-100 mb-10 text-lg max-w-xl mx-auto">Empieza hoy mismo y descubre por qué miles de organizadores confían en EventHive.</p>
            <Link href="/register" className="bg-white text-primary-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary-50 transition-colors inline-block shadow-lg">
              Crear mi primer evento
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
