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

  return (
    <div className="min-h-screen bg-[#f5f5f5] font-sans">

      {/* HEADER SIMPLES */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4 flex items-center justify-between">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-sm font-bold tracking-widest hover:text-[#C41A1A] transition-colors">
            <ArrowLeft className="w-4 h-4" /> VOLTAR
          </button>
          <img src="/logo.png" alt="Ótica Moderna" style={{ height: 60, width: 'auto' }} />
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
              <button className="w-full bg-black text-white font-bold tracking-widest py-4 hover:bg-[#C41A1A] transition-colors">
                COMPRAR
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