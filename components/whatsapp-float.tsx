"use client"

import { useState } from "react"
import { MessageCircle, X } from "lucide-react"
import { buildCustomWhatsAppUrl } from "@/lib/types"

export function WhatsAppFloat() {
  const [isExpanded, setIsExpanded] = useState(false)
  const whatsappUrl = buildCustomWhatsAppUrl("Hola, quisiera hacer una consulta")

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Expanded tooltip */}
      {isExpanded && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-200 bg-card rounded-2xl shadow-xl p-4 max-w-xs border border-border">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-[family-name:var(--font-poppins)] font-semibold text-foreground">
                ¿Consultas?
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Escribinos por WhatsApp y te respondemos al instante
              </p>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Cerrar"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#20BD5A] text-white font-medium rounded-xl transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            Iniciar chat
          </a>
        </div>
      )}

      {/* Main button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        onMouseEnter={() => setIsExpanded(true)}
        className={`
          flex items-center gap-2 rounded-full shadow-lg transition-all duration-300
          bg-[#25D366] hover:bg-[#20BD5A] text-white
          ${isExpanded ? "px-5 py-3" : "p-4"}
          hover:scale-105 active:scale-95
        `}
        aria-label="Abrir chat de WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
        {isExpanded && (
          <span className="font-medium animate-in fade-in duration-200">
            Escribinos
          </span>
        )}
      </button>
    </div>
  )
}
