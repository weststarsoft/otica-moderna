'use client'

import { useState } from 'react'
import { ShoppingBag, Search, User, Heart, ChevronLeft, ChevronRight, Calendar } from 'lucide-react'

const banners = [
  { id: 1, titulo: 'NOVA COLEÇÃO 2026', subtitulo: 'Linhas ousadas, sofisticação atemporal', cta: 'EXPLORAR COLEÇÃO', img: '/banner-01.jpg', textoDark: true, subtituloBranco: true },
  { id: 2, titulo: 'ÓCULOS DE GRAU', subtitulo: 'Veja o mundo com mais clareza e estilo', cta: 'VER MODELOS', img: '/banner-02.jpg', textoDark: false, subtituloBranco: true },
  { id: 3, titulo: 'LENTES DE QUALIDADE', subtitulo: 'Tecnologia avançada para sua visão', cta: 'CONHECER LENTES', img: '/banner-03.jpg', textoDark: false, subtituloBranco: true },
]

const categorias = [
  { id: 1, nome: 'COLEÇÃO MASCULINA', bg: '#1a1a1a', img: '/colecao-masculina.jpg' },
  { id: 2, nome: 'COLEÇÃO FEMININA', bg: '#2a2a2a', img: '/colecao-feminina.jpg' },
  { id: 3, nome: 'COLEÇÃO INFANTIL', bg: '#b5936b', img: '/colecao-infantil.jpg' },
]

const produtos = [
  { id: 1, nome: 'WAYFARER CLASSIC', preco: 'R$ 450,00', novo: true },
  { id: 2, nome: 'AVIATOR SLIM', preco: 'R$ 520,00', novo: true },
  { id: 3, nome: 'OVAL ELEGANCE', preco: 'R$ 390,00', novo: false },
  { id: 4, nome: 'RETRO SQUARE', preco: 'R$ 480,00', novo: true },
]

const navLinks = ['NOVIDADES', 'ÓCULOS DE SOL', 'ÓCULOS DE GRAU', 'PROMOÇÕES', 'LENTES DE GRAU']

export default function Home() {
  const [bannerAtual, setBannerAtual] = useState(0)
  const [curtidos, setCurtidos] = useState<number[]>([])
  const [carrinho, setCarrinho] = useState<number[]>([])

  const proximoBanner = () => setBannerAtual((prev) => (prev + 1) % banners.length)
  const bannerAnterior = () => setBannerAtual((prev) => (prev - 1 + banners.length) % banners.length)
  const toggleCurtido = (id: number) => setCurtidos((prev) => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  const adicionarCarrinho = (id: number) => setCarrinho((prev) => prev.includes(id) ? prev : [...prev, id])

  const banner = banners[bannerAtual]

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-black font-sans">

      {/* BARRA TOPO */}
      <div className="bg-[#C41A1A] text-white text-center text-xs py-2 tracking-widest font-medium">
        AGENDE SUA CONSULTA GRATUITA
      </div>

      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <img src="/logo.png" alt="Ótica Moderna" style={{ height: 80, width: 'auto' }} />
          </div>
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <a key={link} href="#" className={`text-xs font-bold tracking-widest hover:text-[#C41A1A] transition-colors ${i === 0 ? 'text-[#C41A1A]' : 'text-gray-800'}`}>
                {link}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-5">
            <Search className="w-5 h-5 text-gray-700 cursor-pointer hover:text-[#C41A1A] transition-colors" />
            <User className="w-5 h-5 text-gray-700 cursor-pointer hover:text-[#C41A1A] transition-colors" />
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

      {/* HERO BANNER */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          height: 580,
          overflow: 'hidden',
          backgroundImage: banner.img ? `url(${banner.img})` : 'none',
          backgroundColor: banner.img ? '#0a0a0a' : '#e8e8e8',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {banner.img && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.25)' }} />
        )}

        <div style={{ position: 'absolute', right: 96, top: '50%', transform: 'translateY(-50%)', textAlign: 'right', maxWidth: 420, zIndex: 10 }}>
          <h1 style={{ fontSize: 48, fontWeight: 900, lineHeight: 1.1, marginBottom: 16, color: banner.textoDark ? '#ffffff' : '#000000', letterSpacing: '-1px' }}>
            {banner.titulo}
          </h1>
          <p style={{ fontSize: 18, marginBottom: 32, color: banner.subtituloBranco ? '#ffffff' : '#666666' }}>
            {banner.subtitulo}
          </p>
          <button style={{ padding: '12px 32px', fontSize: 13, fontWeight: 700, letterSpacing: 2, background: banner.textoDark ? '#666666' : '#000000', color: '#ffffff', border: 'none', cursor: 'pointer' }}>
            {banner.cta}
          </button>
        </div>

        <button onClick={bannerAnterior} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', zIndex: 10, background: 'rgba(255,255,255,0.8)', border: 'none', padding: 8, cursor: 'pointer' }}>
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={proximoBanner} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', zIndex: 10, background: 'rgba(255,255,255,0.8)', border: 'none', padding: 8, cursor: 'pointer' }}>
          <ChevronRight className="w-5 h-5" />
        </button>

        <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8, zIndex: 10 }}>
          {banners.map((_, i) => (
            <button key={i} onClick={() => setBannerAtual(i)} style={{ width: 24, height: 2, background: i === bannerAtual ? '#C41A1A' : '#aaaaaa', border: 'none', cursor: 'pointer', padding: 0 }} />
          ))}
        </div>
      </section>

      {/* CATEGORIAS */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-3 gap-4">
          {categorias.map((cat) => (
            <div key={cat.id} className="relative h-80 cursor-pointer overflow-hidden group" style={{ background: cat.bg }}>
              {/* Imagem de fundo */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${cat.img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              {/* Gradiente inferior */}
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)' }} />
              {/* Título */}
              <div className="absolute bottom-6 left-6 z-10">
                <p className="text-white font-black text-lg tracking-widest">{cat.nome}</p>
              </div>
              {/* Hover border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#C41A1A] transition-all z-10" />
            </div>
          ))}
        </div>
      </section>

      {/* VITRINE */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black tracking-widest text-black">DESTAQUES DA ESTAÇÃO</h2>
          <p className="text-gray-500 mt-2 text-sm tracking-wide">Conheça os modelos mais amados</p>
        </div>
        <div className="grid grid-cols-4 gap-6">
          {produtos.map((produto) => (
            <div key={produto.id} className="bg-white group cursor-pointer">
              <div className="relative h-56 bg-[#f0f0f0] flex items-center justify-center overflow-hidden">
                {produto.novo && (
                  <span className="absolute top-3 left-3 bg-[#C41A1A] text-white text-[10px] font-bold px-2 py-1 tracking-widest">NOVO</span>
                )}
                <span className="text-6xl opacity-40 group-hover:scale-110 transition-transform duration-300">🕶️</span>
                <button onClick={() => toggleCurtido(produto.id)} className="absolute top-3 right-3">
                  <Heart className={`w-5 h-5 transition-colors ${curtidos.includes(produto.id) ? 'fill-[#C41A1A] text-[#C41A1A]' : 'text-gray-400 hover:text-[#C41A1A]'}`} />
                </button>
              </div>
              <div className="p-4">
                <p className="font-black text-sm tracking-widest text-black">{produto.nome}</p>
                <p className="text-gray-500 text-sm mt-1">{produto.preco}</p>
                <button onClick={() => adicionarCarrinho(produto.id)} className="mt-3 w-full border border-black text-black text-xs font-bold tracking-widest py-2 hover:bg-black hover:text-white transition-colors">
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

    </div>
  )
}