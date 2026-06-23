// components/Footer.tsx
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="border-t-2 border-stone-900 bg-stone-50 py-12 mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-[1400px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Колонка 1: О нас */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-900 mb-4">Watch39</h3>
            <p className="font-serif text-sm text-stone-600 leading-relaxed">
              Специализированное издание и бутик оригинальных часов в Калининграде. 
              Точность, стиль и официальная гарантия.
            </p>
          </div>

          {/* Колонка 2: Навигация */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-900 mb-4">Навигация</h3>
            <ul className="space-y-2 text-sm text-stone-600 font-serif">
              <li><Link href="/catalog" className="hover:text-stone-900 transition-colors">Каталог</Link></li>
              <li><Link href="/blog" className="hover:text-stone-900 transition-colors">Журнал</Link></li>
              <li><Link href="/contacts" className="hover:text-stone-900 transition-colors">Контакты и адреса</Link></li>
            </ul>
          </div>

          {/* Колонка 3: Контакты */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-900 mb-4">Связь</h3>
            <p className="text-sm text-stone-600 font-serif">
              Калининград, ул. Интернациональная<br />
              Калининград, ул. Киевская<br />
              <a href="tel:+74012000000" className="hover:text-stone-900 underline mt-2 block">+7 (4012) 00-00-00</a>
            </p>
          </div>
        </div>

        {/* Копирайт */}
        <div className="mt-12 pt-8 border-t border-stone-200 text-center text-[10px] uppercase tracking-widest text-stone-400">
          © {new Date().getFullYear()} Watch39. Все права защищены.
        </div>
      </div>
    </footer>
  );
};