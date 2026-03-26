import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Mail, Lock, User, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: 'attendee'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al registrar el usuario');
      }

      // Éxito - Redirigir al login
      router.push('/login?registered=true');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full flex flex-col md:flex-row bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden">
        {/* Sidebar Info */}
        <div className="hidden md:flex md:w-2/5 bg-primary-600 p-10 flex-col justify-between text-white relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-700 opacity-50" />
          <div className="relative z-10">
            <Link href="/" className="inline-flex items-center gap-2 mb-12">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-white font-bold backdrop-blur-sm">E</div>
              <span className="text-xl font-bold">EventHive</span>
            </Link>
            <h2 className="text-3xl font-bold leading-tight mb-6 tracking-tight">Únete a la mejor comunidad de eventos.</h2>
            <ul className="space-y-4 text-primary-100">
              <li className="flex items-start gap-3 text-sm">
                <ShieldCheck className="w-5 h-5 text-white shrink-0" />
                <span>Tickets 100% seguros y digitales</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <ShieldCheck className="w-5 h-5 text-white shrink-0" />
                <span>Acceso exclusivo a preventas</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <ShieldCheck className="w-5 h-5 text-white shrink-0" />
                <span>Gestión de eventos profesional</span>
              </li>
            </ul>
          </div>
          <div className="relative z-10 text-xs text-primary-200 font-medium">
            © 2026 EventHive Inc.
          </div>
        </div>

        {/* Form */}
        <div className="p-8 md:p-12 md:w-3/5">
          <div className="mb-8">
            <h1 className="text-2xl font-extrabold text-slate-900 mb-2 tracking-tight">Crear cuenta</h1>
            <p className="text-sm text-slate-500 font-medium">Empieza tu aventura en EventHive hoy.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-medium rounded-r-lg">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-widest">Nombre de Usuario</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="input-field pl-10 text-sm py-2.5" 
                  placeholder="ej: juanperez99"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-widest">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field pl-10 text-sm py-2.5" 
                  placeholder="tu@email.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-widest">Contraseña</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="password" 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="input-field pl-10 text-sm py-2.5" 
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-widest">Confirmar</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="password" 
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="input-field pl-10 text-sm py-2.5" 
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 py-2">
              <input type="checkbox" id="terms" className="w-4 h-4 text-primary-600 border-slate-300 rounded focus:ring-primary-500" required />
              <label htmlFor="terms" className="text-xs text-slate-500 font-medium leading-relaxed">
                Acepto los <Link href="#" className="text-primary-600 font-bold hover:underline">términos y condiciones</Link> de servicio.
              </label>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full btn-primary py-3.5 flex items-center justify-center gap-3 font-bold shadow-lg shadow-primary-600/20 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creando cuenta...
                </>
              ) : (
                <>
                  Crear mi cuenta <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500 font-medium">
              ¿Ya tienes una cuenta? {' '}
              <Link href="/login" className="font-bold text-primary-600 hover:text-primary-700 underline decoration-2 underline-offset-4 decoration-primary-600/30">
                Inicia Sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
