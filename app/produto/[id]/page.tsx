'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ChevronLeft, ChevronRight, Heart, ShoppingBag, ArrowLeft } from 'lucide-react'

const produtos = [
  {
    id: 1,
    nome: 'VORTEX X - ETTORE',
    preco: 'R$ 520,00',
    novo: true,
    fotos: ['/produto-01.jpg'],
  },
  {
    id: 2,
    nome: 'MONACO GOLD - DS',
    preco: 'R$ 480,00',
    novo: true,
    fotos: ['/produto-02.jpg'],
  },
  {
    id: 3,
    nome: 'AETHER FRAME - CS',
    preco: 'R$ 590,00',
    novo: false,
    fotos: ['/produto-03.jpg'],
  },
  {
    id: 4,
    nome: 'SUNSET NOIR - DS',
    preco: 'R$ 540,00',
    novo: true,
    fotos: ['/produto-04.jpg'],
  },
]

const WHATSAPP = '5568999793535'

export default function ProdutoPage() {
  const { id } = useParams()
  const router = useRouter()
  const produto = produtos.find((p) => p.id === Number(id))
  const [fotoAtual, setFotoAtual] = useState(0)
  const [curtido, setCurtido] = useState(false)

  if (!produto) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
        <p className="text-gray-500">Produto não encontrado.</p>
      </div>
    )
  }

  const proximaFoto = () => setFotoAtual((prev) => (prev + 1) % produto.fotos.length)
  const fotoAnterior = () => setFotoAtual((prev) => (prev - 1 + produto.fotos.length) % produto.fotos.length)

  const comprarWhatsApp = () => {
    const mensagem = encodeURIComponent(
      `Olá! Isso é um teste.\n\nTenho interesse no produto abaixo:\n\n*${produto.nome}*\nPreço: ${produto.preco}\n\nPoderia me ajudar?`
    )
    window.open(`https://wa.me/${WHATSAPP}?text=${mensagem}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] font-sans">

      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4 flex items-center justify-between">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-sm font-bold tracking-widest hover:text-[#C41A1A] transition-colors">
            <ArrowLeft className="w-4 h-4" /> VOLTAR
          </button>
          <img src="/logo.png" alt="Ótica Moderna" style={{ height: 60, width: 'auto' }} className="cursor-pointer" onClick={() => router.push('/')} />
          <ShoppingBag className="w-5 h-5 text-gray-700" />
        </div>
      </header>

      {/* CONTEÚDO */}
      <div className="max-w-5xl mx-auto px-4 lg:px-6 py-10 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

          {/* CARROSSEL DE FOTOS */}
          <div className="w-full lg:w-1/2">
            <div className="relative bg-white overflow-hidden" style={{ aspectRatio: '4/3' }}>
              {produto.novo && (
                <span className="absolute top-4 left-4 bg-[#C41A1A] text-white text-[10px] font-bold px-2 py-1 tracking-widest z-10">
                  NOVO
                </span>
              )}
              <img
                src={produto.fotos[fotoAtual]}
                alt={produto.nome}
                className="w-full h-full object-cover"
              />
              {produto.fotos.length > 1 && (
                <>
                  <button onClick={fotoAnterior} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 p-2 hover:bg-[#C41A1A] hover:text-white transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button onClick={proximaFoto} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 p-2 hover:bg-[#C41A1A] hover:text-white transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            {/* MINIATURAS */}
            {produto.fotos.length > 1 && (
              <div className="flex gap-2 mt-3">
                {produto.fotos.map((foto, i) => (
                  <button
                    key={i}
                    onClick={() => setFotoAtual(i)}
                    className={`w-16 h-16 overflow-hidden border-2 transition-colors ${i === fotoAtual ? 'border-[#C41A1A]' : 'border-transparent'}`}
                  >
                    <img src={foto} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* INFORMAÇÕES */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <h1 className="text-3xl lg:text-4xl font-black tracking-widest text-black mb-4">
              {produto.nome}
            </h1>
            <p className="text-2xl font-bold text-[#C41A1A] mb-8">
              {produto.preco}
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={comprarWhatsApp}
                className="w-full bg-black text-white font-bold tracking-widest py-4 hover:bg-[#C41A1A] transition-colors flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.522 5.855L.057 23.928a.75.75 0 00.914.914l6.073-1.465A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.726 9.726 0 01-4.964-1.362l-.355-.211-3.685.889.904-3.598-.232-.372A9.725 9.725 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
                </svg>
                COMPRAR VIA WHATSAPP
              </button>
              <button
                onClick={() => setCurtido(!curtido)}
                className="w-full border border-black text-black font-bold tracking-widest py-4 flex items-center justify-center gap-2 hover:border-[#C41A1A] hover:text-[#C41A1A] transition-colors"
              >
                <Heart className={`w-4 h-4 ${curtido ? 'fill-[#C41A1A] text-[#C41A1A]' : ''}`} />
                {curtido ? 'SALVO NOS FAVORITOS' : 'SALVAR NOS FAVORITOS'}
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}