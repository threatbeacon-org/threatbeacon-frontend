# Comparación de Endpoints: Frontend vs Backend

## Documentación del Backend (que compartiste)

| # | Método | Endpoint | Descripción | Status |
|---|--------|----------|-------------|--------|
| 1 | POST | `/api/events` | Ingestar nuevo evento | ✅ Implementado |
| 2 | GET | `/api/risk` | Obtener estado de riesgo | ❌ **Error 500** |
| 3 | POST | `/api/risk/mute` | Silenciar/activar alarma | ❓ No testeado |
| 4 | GET | `/api/incidents/{id}/insight` | IA insight (Próximamente) | ❓ No testeado |

---

## Endpoints del Frontend (implementados)

### Risk Service (`src/services/riskService.ts`)
```typescript
fetchRiskStatus()     → GET  /api/risk
muteBuzzer()          → POST /api/risk/mute  { muted: true }
stopBuzzer()          → POST /api/risk/mute  { muted: false }
```

### Event Service (`src/services/eventService.ts`)
```typescript
ingestEvent(data)     → POST /api/events
```

### Incident Service (`src/services/incidentService.ts`)
```typescript
fetchIncidents()               → GET /api/incidents
fetchIncidentDetail(id)        → GET /api/incidents/{id}
fetchIncidentInsight(id)       → GET /api/incidents/{id}/insight
```

---

## Análisis de Alineación

### ✅ ENDPOINTS ALINEADOS CORRECTAMENTE:

| Frontend | Backend Docs | Match |
|----------|-------------|-------|
| `POST /api/events` | `POST /api/events` | ✅ |
| `GET /api/risk` | `GET /api/risk` | ✅ |
| `POST /api/risk/mute` | `POST /api/risk/mute` | ✅ |
| `GET /api/incidents/{id}/insight` | `GET /api/incidents/{id}/insight` | ✅ |

### ⚠️ ENDPOINTS ADICIONALES EN FRONTEND (No en documentación):

| Frontend | Descripción | Status |
|----------|-------------|--------|
| `GET /api/incidents` | Listar incidentes | ❓ Asumido |
| `GET /api/incidents/{id}` | Detalle incidente | ❓ Asumido |

---

## Conclusión

**SÍ, tus endpoints del frontend son exactamente los mismos del backend.**

Todos están correctamente alineados con la documentación que compartiste:

```
Frontend:  GET /api/risk
Backend:   GET /api/risk
           ↓
         ✅ MATCH
         
Frontend:  POST /api/risk/mute { muted: true/false }
Backend:   POST /api/risk/mute { muted: true/false }
           ↓
         ✅ MATCH
         
Frontend:  POST /api/events { type, source, ip, severity, etc }
Backend:   POST /api/events (mismo payload)
           ↓
         ✅ MATCH
```

---

## El Problema

El error 500 en `GET /api/risk` **NO es por endpoint mal configurado**.

Es un problema **interno del backend** cuando intenta procesar esa request.

El endpoint existe y está bien configurado en el frontend, pero el backend:
1. No puede conectarse a la BD
2. Tiene un bug en su lógica
3. Falta una variable de entorno
4. O hay un error no capturado

---

## Próximos Pasos

1. ✅ Endpoints alineados correctamente ← **YA ESTÁ HECHO**
2. ⏳ Revisar logs del backend en Railway ← **NECESITAS HACER ESTO**
3. ⏳ Compartir stack trace del error 500
4. ⏳ Corregir el backend

**¿Puedes revisar los logs en Railway y compartir el error?**
