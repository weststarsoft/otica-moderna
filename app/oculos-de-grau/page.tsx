'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Heart, ShoppingBag, Search, User, Calendar, Menu, X } from 'lucide-react'

const produtos = [
  { id: 3, nome: 'AETHER FRAME - CS', preco: 'R$ 590,00', novo: false, img: '/produto-03.jpg' },
]

const navLinks = [
  { label: 'NOVIDADES', href: '/' },
  { label: 'ÓCULOS DE SOL', href: '/oculos-de-sol' },
  { label: 'ÓCULOS DE GRAU', href: '/oculos-de-grau' },
  { label: 'PROMOÇÕES', href: '/promocoes' },
  { label: 'LENTES DE GRAU', href: '/lentes-de-grau' },
]

export default function OculosDeGrau() {
  const router = useRouter()
  const [curtidos, setCurtidos] = useState<number[]>([])
  const [carrinho, setCarrinho] = useState<number[]>([])
  const [menuAberto, setMenuAberto] = useState(false)

  const toggleCurtido = (id: number) => setCurtidos((prev) => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  const adicionarCarrinho = (id: number) => setCarrinho((prev) => prev.includes(id) ? prev : [...prev, id])

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-black font-sans">

      {/* BARRA TOPO */}
      <div className="bg-[#C41A1A] text-white text-center text-xs py-2 tracking-widest font-medium">
        AGENDE SUA CONSULTA GRATUITA
      </div>

      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3 lg:py-4 flex items-center justify-between">
          <button className="lg:hidden" onClick={() => setMenuAberto(true)}>
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          <div className="flex items-center cursor-pointer" onClick={() => router.push('/')}>
            <img src="/logo.png" alt="Ótica Moderna" style={{ height: 60, width: 'auto' }} />
          </div>
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); router.push(link.href) }}
                className={`text-xs font-bold tracking-widest hover:text-[#C41A1A] transition-colors ${i === 2 ? 'text-[#C41A1A]' : 'text-gray-800'}`}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3 lg:gap-5">
            <Search className="w-5 h-5 text-gray-700 cursor-pointer hover:text-[#C41A1A] transition-colors" />
            <User className="hidden lg:block w-5 h-5 text-gray-700 cursor-pointer hover:text-[#C41A1A] transition-colors" />
            <div className="relative cursor-pointer">
              <ShoppingBag className="w-5 h-5 text-gray-700 hover:text-[#C41A1A] transition-colors" />
              {carrinho.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#C41A1A] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {carrinho.length}
                </span>
              )}
            </div>
            <button className="hidden lg:flex items-center gap-2 bg-black text-white text-xs font-bold tracking-widest px-4 py-2 hover:bg-[#C41A1A] transition-colors">
              <Calendar className="w-3 h-3" /> AGENDAR
            </button>
          </div>
        </div>
      </header>

      {/* MENU MOBILE */}
      {menuAberto && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex flex-col p-6 lg:hidden">
          <button onClick={() => setMenuAberto(false)} className="self-end mb-8">
            <X className="w-7 h-7 text-white" />
          </button>
          <nav className="flex flex-col gap-6 text-2xl font-semibold">
            {navLinks.map((item) => (
              <a key={item.label} href={item.href} className="text-white hover:text-[#C41A1A] transition-colors" onClick={() => { setMenuAberto(false); router.push(item.href) }}>
                {item.label}
              </a>
            ))}
          </nav>
          <button className="mt-auto bg-[#C41A1A] text-white py-4 rounded-xl text-lg font-bold flex items-center justify-center gap-2">
            <Calendar className="w-5 h-5" /> AGENDAR CONSULTA
          </button>
        </div>
      )}

      {/* TÍTULO DA PÁGINA */}
      <section className="max-w-7xl mx-auto px-4 lg:px-6 py-10 lg:py-14">
        <div className="border-b border-gray-300 pb-6 mb-10">
          <h1 className="text-3xl lg:text-4xl font-black tracking-widest text-black">ÓCULOS DE GRAU</h1>
          <p className="text-gray-500 mt-2 text-sm tracking-wide">{produtos.length} modelo disponível</p>
        </div>

        {/* GRADE DE PRODUTOS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {produtos.map((produto) => (
            <div
              key={produto.id}
              onClick={() => router.push(`/produto/${produto.id}`)}
              className="bg-white group cursor-pointer"
            >
              <div className="relative bg-[#f0f0f0] overflow-hidden" style={{ aspectRatio: '4/3' }}>
                {produto.novo && (
                  <span className="absolute top-3 left-3 bg-[#C41A1A] text-white text-[10px] font-bold px-2 py-1 tracking-widest z-10">
                    NOVO
                  </span>
                )}
                <img
                  src={produto.img}
                  alt={produto.nome}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={(e) => { e.stopPropagation(); toggleCurtido(produto.id) }}
                  className="absolute top-3 right-3 z-10"
                >
                  <Heart className={`w-5 h-5 transition-colors ${curtidos.includes(produto.id) ? 'fill-[#C41A1A] text-[#C41A1A]' : 'text-gray-400 hover:text-[#C41A1A]'}`} />
                </button>
              </div>
              <div className="p-4">
                <p className="font-black text-sm tracking-widest text-black">{produto.nome}</p>
                <p className="text-gray-500 text-sm mt-1">{produto.preco}</p>
                <button
                  onClick={(e) => { e.stopPropagation(); adicionarCarrinho(produto.id) }}
                  className="mt-3 w-full border border-black text-black text-xs font-bold tracking-widest py-2 hover:bg-black hover:text-white transition-colors"
                >
                  {carrinho.includes(produto.id) ? '✓ ADICIONADO' : 'COMPRAR'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white py-8 text-center">
        <p className="text-xs tracking-widest text-gray-400">© 2026 ÓTICA MODERNA — TODOS OS DIREITOS RESERVADOS</p>
      </footer>

      {/* BOTÃO AGENDAR FIXO MOBILE */}
      <div className="fixed bottom-4 left-4 right-4 z-40 lg:hidden">
        <button className="w-full bg-[#C41A1A] text-white py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 shadow-lg">
          <Calendar className="w-5 h-5" /> AGENDAR CONSULTA
        </button>
      </div>

    </div>
  )
}