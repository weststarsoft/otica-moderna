'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ShoppingBag, Search, User, Heart, ChevronLeft, ChevronRight, Calendar, Menu, X } from 'lucide-react'

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
  { id: 1, nome: 'VORTEX X - ETTORE', preco: 'R$ 520,00', novo: true, img: '/produto-01.jpg' },
  { id: 2, nome: 'MONACO GOLD - DS', preco: 'R$ 480,00', novo: true, img: '/produto-02.jpg' },
  { id: 3, nome: 'AETHER FRAME - CS', preco: 'R$ 590,00', novo: false, img: '/produto-03.jpg' },
  { id: 4, nome: 'SUNSET NOIR - DS', preco: 'R$ 540,00', novo: true, img: '/produto-04.jpg' },
]

const navLinks = ['NOVIDADES', 'ÓCULOS DE SOL', 'ÓCULOS DE GRAU', 'PROMOÇÕES', 'LENTES DE GRAU']

export default function Home() {
  const router = useRouter()
  const [bannerAtual, setBannerAtual] = useState(0)
  const [curtidos, setCurtidos] = useState<number[]>([])
  const [carrinho, setCarrinho] = useState<number[]>([])
  const [menuAberto, setMenuAberto] = useState(false)
  const categoriasRef = useRef<HTMLDivElement>(null)
  const produtosRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerAtual((prev) => (prev + 1) % banners.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const proximoBanner = () => setBannerAtual((prev) => (prev + 1) % banners.length)
  const bannerAnterior = () => setBannerAtual((prev) => (prev - 1 + banners.length) % banners.length)
  const toggleCurtido = (id: number) => setCurtidos((prev) => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  const adicionarCarrinho = (id: number) => setCarrinho((prev) => prev.includes(id) ? prev : [...prev, id])

  const scrollCategorias = (dir: 'left' | 'right') => {
    if (categoriasRef.current) categoriasRef.current.scrollBy({ left: dir === 'right' ? 280 : -280, behavior: 'smooth' })
  }
  const scrollProdutos = (dir: 'left' | 'right') => {
    if (produtosRef.current) produtosRef.current.scrollBy({ left: dir === 'right' ? 220 : -220, behavior: 'smooth' })
  }

  const banner = banners[bannerAtual]

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
          <div className="flex items-center">
            <img src="/logo.png" alt="Ótica Moderna" style={{ height: 60, width: 'auto' }} />
          </div>
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <a key={link} href="#" className={`text-xs font-bold tracking-widest hover:text-[#C41A1A] transition-colors ${i === 0 ? 'text-[#C41A1A]' : 'text-gray-800'}`}>
                {link}
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
              <a key={item} href="#" className="text-white hover:text-[#C41A1A] transition-colors" onClick={() => setMenuAberto(false)}>
                {item}
              </a>
            ))}
          </nav>
          <button className="mt-auto bg-[#C41A1A] text-white py-4 rounded-xl text-lg font-bold flex items-center justify-center gap-2">
            <Calendar className="w-5 h-5" /> AGENDAR CONSULTA
          </button>
        </div>
      )}

      {/* HERO BANNER */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          height: 'clamp(260px, 50vw, 580px)',
          overflow: 'hidden',
          backgroundImage: banner.img ? `url(${banner.img})` : 'none',
          backgroundColor: banner.img ? '#0a0a0a' : '#e8e8e8',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {banner.img && <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.25)' }} />}

        <div style={{ position: 'absolute', right: 'clamp(16px, 6vw, 96px)', top: '50%', transform: 'translateY(-50%)', textAlign: 'right', maxWidth: 420, zIndex: 10 }}>
          <h1 style={{ fontSize: 'clamp(22px, 4vw, 48px)', fontWeight: 900, lineHeight: 1.1, marginBottom: 12, color: banner.textoDark ? '#ffffff' : '#000000', letterSpacing: '-1px' }}>
            {banner.titulo}
          </h1>
          <p style={{ fontSize: 'clamp(13px, 2vw, 18px)', marginBottom: 24, color: banner.subtituloBranco ? '#ffffff' : '#666666' }}>
            {banner.subtitulo}
          </p>
          <button style={{ padding: 'clamp(8px, 1.5vw, 12px) clamp(16px, 3vw, 32px)', fontSize: 'clamp(11px, 1.2vw, 13px)', fontWeight: 700, letterSpacing: 2, background: banner.textoDark ? '#666666' : '#000000', color: '#ffffff', border: 'none', cursor: 'pointer' }}>
            {banner.cta}
          </button>
        </div>

        <button onClick={bannerAnterior} className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-80 p-2 hover:bg-[#C41A1A] hover:text-white transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={proximoBanner} className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-80 p-2 hover:bg-[#C41A1A] hover:text-white transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>

        <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8, zIndex: 10 }}>
          {banners.map((_, i) => (
            <button key={i} onClick={() => setBannerAtual(i)} style={{ width: 24, height: 2, background: i === bannerAtual ? '#C41A1A' : '#aaaaaa', border: 'none', cursor: 'pointer', padding: 0 }} />
          ))}
        </div>
      </section>

      {/* CATEGORIAS */}
      <section className="py-10 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <h3 className="text-lg font-black tracking-widest mb-5 lg:hidden">COLEÇÕES</h3>
        </div>

        {/* DESKTOP */}
        <div className="hidden lg:grid max-w-7xl mx-auto px-6 grid-cols-3 gap-4">
          {categorias.map((cat) => (
            <div key={cat.id} className="relative h-80 cursor-pointer overflow-hidden group" style={{ background: cat.bg }}>
              <div className="absolute inset-0" style={{ backgroundImage: `url(${cat.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)' }} />
              <div className="absolute bottom-6 left-6 z-10">
                <p className="text-white font-black text-lg tracking-widest">{cat.nome}</p>
              </div>
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#C41A1A] transition-all z-10" />
            </div>
          ))}
        </div>

        {/* MOBILE carrossel */}
        <div className="relative lg:hidden">
          <div ref={categoriasRef} className="flex gap-4 overflow-x-auto px-4 snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
            {categorias.map((cat) => (
              <div key={cat.id} className="relative flex-shrink-0 w-72 h-64 cursor-pointer overflow-hidden snap-start rounded-lg" style={{ background: cat.bg }}>
                <div className="absolute inset-0" style={{ backgroundImage: `url(${cat.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)' }} />
                <div className="absolute bottom-5 left-5 z-10">
                  <p className="text-white font-black text-base tracking-widest">{cat.nome}</p>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => scrollCategorias('left')} className="absolute left-1 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 p-1 rounded-full shadow z-10">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={() => scrollCategorias('right')} className="absolute right-1 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 p-1 rounded-full shadow z-10">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* VITRINE */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-black tracking-widest text-black">DESTAQUES DA ESTAÇÃO</h2>
            <p className="text-gray-500 mt-2 text-sm tracking-wide">Conheça os modelos mais amados</p>
          </div>

          {/* DESKTOP */}
          <div className="hidden lg:grid grid-cols-4 gap-6">
            {produtos.map((produto) => (
              <div key={produto.id} onClick={() => router.push(`/produto/${produto.id}`)} className="bg-white group cursor-pointer">
                <div className="relative h-56 bg-[#f0f0f0] overflow-hidden">
                  {produto.novo && <span className="absolute top-3 left-3 bg-[#C41A1A] text-white text-[10px] font-bold px-2 py-1 tracking-widest z-10">NOVO</span>}
                  <img src={produto.img} alt={produto.nome} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <button onClick={(e) => { e.stopPropagation(); toggleCurtido(produto.id) }} className="absolute top-3 right-3 z-10">
                    <Heart className={`w-5 h-5 transition-colors ${curtidos.includes(produto.id) ? 'fill-[#C41A1A] text-[#C41A1A]' : 'text-gray-400 hover:text-[#C41A1A]'}`} />
                  </button>
                </div>
                <div className="p-4">
                  <p className="font-black text-sm tracking-widest text-black">{produto.nome}</p>
                  <p className="text-gray-500 text-sm mt-1">{produto.preco}</p>
                  <button onClick={(e) => { e.stopPropagation(); adicionarCarrinho(produto.id) }} className="mt-3 w-full border border-black text-black text-xs font-bold tracking-widest py-2 hover:bg-black hover:text-white transition-colors">
                    {carrinho.includes(produto.id) ? '✓ ADICIONADO' : 'COMPRAR'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* MOBILE carrossel */}
          <div className="relative lg:hidden">
            <div ref={produtosRef} className="flex gap-4 overflow-x-auto snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
              {produtos.map((produto) => (
                <div key={produto.id} onClick={() => router.push(`/produto/${produto.id}`)} className="bg-white flex-shrink-0 w-52 snap-start cursor-pointer">
                  <div className="relative h-44 bg-[#f0f0f0] overflow-hidden">
                    {produto.novo && <span className="absolute top-3 left-3 bg-[#C41A1A] text-white text-[10px] font-bold px-2 py-1 tracking-widest z-10">NOVO</span>}
                    <img src={produto.img} alt={produto.nome} className="w-full h-full object-cover" />
                    <button onClick={(e) => { e.stopPropagation(); toggleCurtido(produto.id) }} className="absolute top-3 right-3 z-10">
                      <Heart className={`w-4 h-4 transition-colors ${curtidos.includes(produto.id) ? 'fill-[#C41A1A] text-[#C41A1A]' : 'text-gray-400'}`} />
                    </button>
                  </div>
                  <div className="p-3">
                    <p className="font-black text-xs tracking-widest text-black">{produto.nome}</p>
                    <p className="text-gray-500 text-xs mt-1">{produto.preco}</p>
                    <button onClick={(e) => { e.stopPropagation(); adicionarCarrinho(produto.id) }} className="mt-2 w-full border border-black text-black text-[10px] font-bold tracking-widest py-2 hover:bg-black hover:text-white transition-colors">
                      {carrinho.includes(produto.id) ? '✓ ADICIONADO' : 'COMPRAR'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => scrollProdutos('left')} className="absolute -left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 p-1 rounded-full shadow z-10">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={() => scrollProdutos('right')} className="absolute -right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 p-1 rounded-full shadow z-10">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
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