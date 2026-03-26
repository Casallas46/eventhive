import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold">
                E
              </div>
              <span className="text-xl font-bold text-slate-900">
                EventHive
              </span>
            </Link>
            <p className="text-sm text-slate-500 max-w-xs">
              La plataforma moderna para gestionar y descubrir eventos que importan.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Explorar</h4>
            <ul className="space-y-2">
              <li><Link href="/eventos" className="text-sm text-slate-500 hover:text-primary-600">Eventos</Link></li>
              <li><Link href="#" className="text-sm text-slate-500 hover:text-primary-600">Categorías</Link></li>
              <li><Link href="#" className="text-sm text-slate-500 hover:text-primary-600">Ciudades</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Soporte</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-slate-500 hover:text-primary-600">Centro de ayuda</Link></li>
              <li><Link href="#" className="text-sm text-slate-500 hover:text-primary-600">Contacto</Link></li>
              <li><Link href="#" className="text-sm text-slate-500 hover:text-primary-600">Privacidad</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Comunidad</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-slate-500 hover:text-primary-600">Blog</Link></li>
              <li><Link href="#" className="text-sm text-slate-500 hover:text-primary-600">Twitter</Link></li>
              <li><Link href="#" className="text-sm text-slate-500 hover:text-primary-600">LinkedIn</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} EventHive Inc. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-xs text-slate-400">
            <Link href="#" className="hover:text-slate-600 transition-colors">Términos</Link>
            <Link href="#" className="hover:text-slate-600 transition-colors">Privacidad</Link>
            <Link href="#" className="hover:text-slate-600 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
