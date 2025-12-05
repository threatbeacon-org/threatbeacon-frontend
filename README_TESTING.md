# Testing Guide - ThreatBeacon Frontend

## 📋 Configuración de Testing

El proyecto utiliza **Jest** y **React Testing Library** para pruebas unitarias y de integración.

## 🚀 Comandos de Testing

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests en modo watch
npm run test:watch

# Ejecutar tests con cobertura
npm run test:coverage
```

## 📁 Estructura de Tests

Los tests están organizados siguiendo la estructura del proyecto:

```
src/
├── components/
│   ├── ui/
│   │   └── __tests__/
│   │       ├── Button.test.tsx
│   │       ├── Input.test.tsx
│   │       └── Badge.test.tsx
│   └── dashboard/
│       └── __tests__/
│           └── RiskHero.test.tsx
├── lib/
│   └── api/
│       └── __tests__/
│           └── client.test.ts
└── services/
    └── __tests__/
        └── authService.test.ts
```

## ✅ Tests Implementados

### Componentes UI
- ✅ **Button**: Variantes, estados de carga, eventos onClick
- ✅ **Input**: Renderizado, validación, manejo de errores
- ✅ **Badge**: Variantes de color, tamaños

### Componentes Dashboard
- ✅ **RiskHero**: Estados de carga, niveles de riesgo, indicadores

### Servicios
- ✅ **authService**: Validación de credenciales, login
- ✅ **apiClient**: Requests HTTP, manejo de autenticación, errores 401

## 🎯 Cobertura de Tests

El proyecto tiene configurado un umbral mínimo de cobertura:
- **Branches**: 50%
- **Functions**: 50%
- **Lines**: 50%
- **Statements**: 50%

## 📝 Escribir Nuevos Tests

### Ejemplo: Test de Componente

```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import MyComponent from '../MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})
```

### Ejemplo: Test de Hook

```typescript
import { renderHook } from '@testing-library/react'
import { useMyHook } from '../useMyHook'

describe('useMyHook', () => {
  it('returns expected value', () => {
    const { result } = renderHook(() => useMyHook())
    expect(result.current).toBeDefined()
  })
})
```

## 🔧 Mocks Configurados

- **Next.js Router**: `useRouter`, `usePathname`, `useParams`
- **sessionStorage**: Mock completo con funciones jest.fn()
- **window.matchMedia**: Mock para media queries
- **Notification API**: Mock para browser notifications

## 📊 Próximos Tests a Implementar

- [ ] Tests para `IncidentTable` component
- [ ] Tests para `MuteBuzzerButton` component
- [ ] Tests para `NotificationAlarm` component
- [ ] Tests para hooks personalizados (useIncidents, useRiskStatus)
- [ ] Tests de integración para páginas completas
- [ ] Tests E2E con Playwright (opcional)

## 🐛 Troubleshooting

Si los tests fallan:
1. Limpia el caché: `npm test -- --clearCache`
2. Verifica que los mocks estén correctamente configurados
3. Asegúrate de que `jest.setup.js` esté siendo cargado


