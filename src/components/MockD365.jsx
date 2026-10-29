export default function MockD365({ mock }) {
  const type = mock.type
  return (
    <figure className="mock-wrap">
      <div className="mock-window" role="img" aria-label={mock.title}>
        <div className="mock-topbar">
          <span className="mock-waffle">⠿</span>
          <span className="mock-app">Dynamics 365</span>
          <span className="mock-crumb">{mock.title.split('—')[0].trim()}</span>
          <span className="mock-top-right"><span className="mock-search">🔍 Buscar</span><span className="mock-company">USMF ⌄</span><span className="mock-avatar">JP</span></span>
        </div>
        <div className="mock-body">
          <aside className="mock-nav">
            <div className="mock-nav-head">≡ Panel de navegación</div>
            {['★ Favoritos','🕘 Recientes','📒 Libro mayor','🧾 Cuentas por pagar','📥 Cuentas por cobrar','🏦 Tesorería y bancos','🏢 Activos fijos','📊 Presupuestos'].map((m,i)=>(
              <div key={m} className={`mock-nav-item ${type==='modules'&&i>=2?'active-soft':''}`}>{m}</div>
            ))}
          </aside>
          <div className="mock-main">
            <div className="mock-titlebar"><strong>{mock.title}</strong><span className="mock-actions">+ Nuevo&nbsp;&nbsp; 🗑 Eliminar&nbsp;&nbsp; ✓ Validar&nbsp;&nbsp; ⬆ Registrar</span></div>
            {type==='workspace' && <div className="mock-kpis">
              <div className="kpi"><span>Facturas vencidas</span><b>12</b><em className="red">▲ 3 esta semana</em></div>
              <div className="kpi"><span>Saldo bancario</span><b>248.530 €</b><em className="green">Conciliado ✓</em></div>
              <div className="kpi"><span>Por cobrar &gt;30 días</span><b>36.200 €</b><em>4 clientes</em></div>
              <div className="kpi gold"><span>Mi trabajo pendiente</span><b>7 tareas</b><em>2 de cierre</em></div>
              <div className="mock-list wide"><div className="row head"><span>Cola de trabajo</span><span>Estado</span></div><div className="row"><span>Aprobar diario ALQ-104</span><span className="pill amber">Pendiente</span></div><div className="row"><span>Propuesta de pago OCT</span><span className="pill blue">En curso</span></div><div className="row"><span>Cierre periodo 10</span><span className="pill grey">Programado</span></div></div>
            </div>}
            {type==='modules' && <div className="mock-modules">
              {[['📒 Libro mayor','Diarios · Consultas · Cierre'],['🧾 Cuentas por pagar','Facturas · Pagos · Proveedores'],['📥 Cuentas por cobrar','Facturas · Cobros · Clientes'],['🏦 Tesorería y bancos','Conciliación · Remesas SEPA'],['🏢 Activos fijos','Altas · Amortización · Bajas'],['📊 Presupuestos','Control · Revisiones']].map(([t,s])=>(<div key={t} className="mod-card"><b>{t}</b><span>{s}</span></div>))}
              <p className="mock-note">🔒 Los módulos visibles dependen de tus roles de seguridad.</p>
            </div>}
            {type==='journal' && <table className="mock-table"><thead><tr><th>Fecha</th><th>Cuenta</th><th>Dimensiones</th><th>Debe</th><th>Haber</th></tr></thead><tbody>
              <tr><td>01/10/2026</td><td>621 Arrendamientos</td><td>CC-ADM</td><td>1.200,00</td><td>—</td></tr>
              <tr><td>01/10/2026</td><td>572 Bancos</td><td>—</td><td>—</td><td>1.200,00</td></tr>
              <tr className="total"><td colSpan="3">Totales equilibrados ✓</td><td>1.200,00</td><td>1.200,00</td></tr></tbody></table>}
            {type==='invoice' && <div>
              <div className="mock-form"><label>Proveedor <span>PROV-0014 · Papelería Central SL</span></label><label>Condiciones <span>30 días</span></label><label>Vencimiento <span>15/11/2026</span></label></div>
              <table className="mock-table"><thead><tr><th>Concepto</th><th>Base</th><th>IVA</th><th>Total</th></tr></thead><tbody><tr><td>Material de oficina</td><td>500,00</td><td>21% · 105,00</td><td>605,00 €</td></tr></tbody></table>
              <div className="mock-banner-ok">✓ Impuestos calculados automáticamente por grupo de impuestos</div></div>}
            {type==='bank' && <div className="mock-bank">
              <div className="bank-col"><h5>Extracto bancario</h5><div className="row"><span>Transferencia cliente</span><b>+4.840 €</b></div><div className="row"><span>Recibo luz</span><b>−312 €</b></div><div className="row warn"><span>Comisión mantenimiento</span><b>−18 €</b></div></div>
              <div className="bank-mid">⇄<span>2 casados ✓</span><span>1 excepción</span></div>
              <div className="bank-col"><h5>Registros D365</h5><div className="row"><span>Cobro FAC-2210</span><b>+4.840 € ✓</b></div><div className="row"><span>Pago luz OCT</span><b>−312 € ✓</b></div><div className="row warn"><span>Sin registrar</span><b>⚠ −18 €</b></div></div>
            </div>}
            {type==='report' && <table className="mock-table"><thead><tr><th>Cuenta de resultados</th><th>Real</th><th>Presupuesto</th><th>Desviación</th></tr></thead><tbody>
              <tr><td>Ventas</td><td>1.240.000</td><td>1.200.000</td><td className="green">+3,3% ✓</td></tr>
              <tr><td>Compras</td><td>612.000</td><td>600.000</td><td className="red">+2,0%</td></tr>
              <tr><td>Personal</td><td>388.500</td><td>390.000</td><td className="green">−0,4% ✓</td></tr>
              <tr className="total"><td>Resultado</td><td>239.500</td><td>210.000</td><td className="green">+14,0%</td></tr></tbody></table>}
          </div>
        </div>
      </div>
      <figcaption>{mock.caption}</figcaption>
    </figure>
  )
}
