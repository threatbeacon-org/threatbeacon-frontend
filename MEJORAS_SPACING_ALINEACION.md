# Guía de Mejoras: Espaciado y Alineación de Textos

## Problemas Identificados

### 1. **Textos muy pegados sin margen** 
- Falta padding entre elementos
- Falta margin-bottom entre secciones
- Falta gap entre items en listas

### 2. **Alineación vertical inconsistente**
- Iconos y textos no están centrados correctamente
- Líneas de altura inconsistentes

### 3. **Responsive design incompleto**
- Algunos componentes no tienen breakpoints sm:, md:, lg:
- Tamaños de texto fijos en móvil

## Componentes a Mejorar

### 1. **Navbar** (`src/components/layout/Navbar.tsx`)

**Problemas:**
- Espaciado entre elementos muy comprimido
- Falta padding vertical

**Solución:**
```tsx
// Aumentar padding vertical
<nav className="bg-slate-900 border-b border-slate-700 h-20 px-4 sm:px-6 md:px-8 flex items-center justify-between gap-4">
```

### 2. **RiskHero** (`src/components/dashboard/RiskHero.tsx`)

**Problemas:**
- Textos y números pegados
- Falta spacing entre elementos

**Cambios necesarios:**
```tsx
// Añadir más spacing
<div className="p-4 sm:p-6 md:p-8 space-y-4">
  <div className="space-y-2">
    <h2 className="text-2xl sm:text-3xl font-bold">Risk Level</h2>
    <p className="text-slate-400">Current system threat status</p>
  </div>
</div>
```

### 3. **IncidentTable** (`src/components/dashboard/IncidentTable.tsx`)

**Problemas:**
- Columnas muy apretadas
- Falta padding en celdas
- Filas sin espaciado

**Cambios necesarios:**
```tsx
// Añadir padding a celdas
<td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">
  {/* contenido */}
</td>

// Espacio entre filas
<tr className="border-b border-slate-700 hover:bg-slate-800/30 transition-colors">
```

### 4. **AIThreatAnalysisPanel** (`src/components/dashboard/AIThreatAnalysisPanel.tsx`)

**Problemas:**
- Texto pequeño en móvil
- Falta padding en contenedor

**Cambios necesarios:**
```tsx
// Mejor padding y spacing
<Card className="h-fit w-full p-4 sm:p-6 shadow-lg">
  <div className="space-y-6">
    {/* contenido */}
  </div>
</Card>
```

---

## Clases Tailwind Recomendadas

### Para Padding (espaciado interno):
```
p-2 = 8px    (móvil)
sm:p-4 = 16px (tablet)
md:p-6 = 24px (escritorio)
lg:p-8 = 32px (pantalla grande)
```

### Para Margin (espaciado externo):
```
mb-2 = margin-bottom 8px
mb-4 = margin-bottom 16px
mb-6 = margin-bottom 24px
```

### Para Gap (espaciado entre items):
```
gap-2 = 8px
gap-3 = 12px
gap-4 = 16px
gap-6 = 24px
```

### Para Space-y (espaciado vertical en contenedores):
```
space-y-2 = 8px entre elementos
space-y-3 = 12px entre elementos
space-y-4 = 16px entre elementos
space-y-6 = 24px entre elementos
```

---

## Tamaños de Texto Recomendados

### Responsive Text Sizes:
```
text-xs sm:text-sm       = 12px → 14px
text-sm sm:text-base     = 14px → 16px
text-base sm:text-lg     = 16px → 18px
text-lg sm:text-xl       = 18px → 20px
text-xl sm:text-2xl      = 20px → 24px
text-2xl sm:text-3xl     = 24px → 30px
```

---

## Checklist de Mejoras

### Navbar
- [ ] Aumentar altura a h-20
- [ ] Aumentar padding horizontal: px-4 sm:px-6 md:px-8
- [ ] Aumentar gap entre elementos: gap-3 sm:gap-4
- [ ] Mejorar search input: py-2 sm:py-2.5

### RiskHero
- [ ] Padding general: p-4 sm:p-6 md:p-8
- [ ] Space entre secciones: space-y-4 sm:space-y-6
- [ ] Tamaño de título: text-2xl sm:text-3xl md:text-4xl
- [ ] Icono más grande: text-4xl sm:text-5xl md:text-6xl

### IncidentTable
- [ ] Padding en celdas: px-3 sm:px-4 py-2 sm:py-3
- [ ] Responsive table: overflow-x-auto en móvil
- [ ] Tamaño fuente: text-xs sm:text-sm md:text-base
- [ ] Altura mínima de filas

### AIThreatAnalysisPanel
- [ ] Card padding: p-4 sm:p-6 md:p-8
- [ ] Space entre secciones: space-y-4 sm:space-y-6
- [ ] Título responsive: text-lg sm:text-xl md:text-2xl
- [ ] Párrafos: leading-relaxed, mejor line-height

---

## Ejemplo de Componente Bien Espaciado

```tsx
export default function ComponentoMejor() {
  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
          Título Principal
        </h2>
        <p className="text-sm sm:text-base text-slate-400">
          Descripción o subtítulo
        </p>
      </div>

      {/* Content */}
      <div className="space-y-3 sm:space-y-4">
        <div className="p-3 sm:p-4 bg-slate-800 rounded-lg border border-slate-700">
          <h3 className="text-sm sm:text-base font-semibold text-white mb-2">
            Sección
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Contenido con mejor legibilidad
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 sm:gap-3 pt-4 sm:pt-6 border-t border-slate-700">
        <button className="px-3 sm:px-4 py-2 text-sm font-medium">
          Acción
        </button>
      </div>
    </div>
  );
}
```

---

## Orden de Prioridad para Arreglar

1. **🔴 Alta:** Navbar (visible siempre)
2. **🔴 Alta:** RiskHero (componente principal)
3. **🟠 Media:** IncidentTable (muchos usuarios)
4. **🟠 Media:** AIThreatAnalysisPanel (información importante)
5. **🟡 Baja:** Componentes secundarios

---

## Notas Importantes

- **Usar `space-y-*` para layouts verticales**, no margin individual
- **Usar `gap` para flexbox/grid layouts**
- **Responsive SIEMPRE:** sm:, md:, lg: breakpoints
- **Mínimo padding:** 16px (p-4) en escritorio, 12px (p-3) en móvil
- **Line-height:** Mínimo `leading-relaxed` (1.625) para párrafos largos
