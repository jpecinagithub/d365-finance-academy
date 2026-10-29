import { useEffect, useMemo, useState } from 'react'
import { topics, LEVELS } from './data/course'
import MockD365 from './components/MockD365'

const KEY = 'd365-academy-v1'
const todayStr = () => new Date().toISOString().slice(0,10)
const yesterdayStr = () => { const d=new Date(); d.setDate(d.getDate()-1); return d.toISOString().slice(0,10) }

const initial = { xp:0, contentDone:{}, quiz:{}, awarded:{}, streak:1, lastVisit:todayStr(), startedAt:todayStr() }
function load(){ try{ const s=JSON.parse(localStorage.getItem(KEY)); if(!s) return initial; // streak
  if(s.lastVisit!==todayStr()){ s.streak = s.lastVisit===yesterdayStr() ? (s.streak||1)+1 : 1; s.lastVisit=todayStr(); } return {...initial,...s} }catch{ return initial } }

function levelFor(xp){ let cur=LEVELS[0], next=null; for(let i=0;i<LEVELS.length;i++){ if(xp>=LEVELS[i].min){cur=LEVELS[i]; next=LEVELS[i+1]||null} } return {cur,next} }

export default function App(){
  const [state,setState]=useState(load)
  const [view,setView]=useState({name:'home'})
  useEffect(()=>{ localStorage.setItem(KEY, JSON.stringify(state)) },[state])
  const {cur,next}=levelFor(state.xp)
  const passedCount = Object.values(state.quiz).filter(q=>q.passed).length
  const contentCount = Object.keys(state.contentDone).length
  const progress = Math.round(((contentCount + passedCount) / 12) * 100)
  const badges = [
    {id:'first', icon:'🌱', name:'Primeros pasos', desc:'Completa tu primer tema', got: contentCount>=1},
    {id:'pass', icon:'🎯', name:'Primera aprobación', desc:'Aprueba tu primer test', got: passedCount>=1},
    {id:'perfect', icon:'💎', name:'Perfección', desc:'Consigue un 10/10 en un test', got: Object.values(state.quiz).some(q=>q.score===10)},
    {id:'half', icon:'🏅', name:'Mitad del curso', desc:'Aprueba 3 de los 6 temas', got: passedCount>=3},
    {id:'streak', icon:'🔥', name:'Constancia', desc:'Racha de 3+ días', got: state.streak>=3},
    {id:'grad', icon:'🎓', name:'Graduado D365 Finance', desc:'Aprueba los 6 temas', got: passedCount>=6},
  ]
  function award(key, pts){ setState(s=> s.awarded[key] ? s : {...s, xp:s.xp+pts, awarded:{...s.awarded,[key]:true}}) }
  function reset(){ if(confirm('¿Reiniciar todo tu progreso, XP e insignias?')){ localStorage.removeItem(KEY); setState({...initial, lastVisit:todayStr()}) ; setView({name:'home'}) } }

  return <div className="app">
    <header className="topnav">
      <button className="brand" onClick={()=>setView({name:'home'})}><span className="brand-logo">D</span><span><b>D365 Finance Academy</b><small>Microsoft Dynamics 365 · Finanzas</small></span></button>
      <div className="top-stats">
        <span className="chip fire">🔥 {state.streak} día{state.streak!==1?'s':''}</span>
        <span className="chip gold">⭐ {state.xp} XP</span>
        <span className="chip navy">{cur.name}</span>
      </div>
    </header>

    {view.name==='home' && <>
      <section className="hero">
        <div className="hero-text">
          <span className="eyebrow">CURSO GAMIFICADO · PRIMERA TOMA DE CONTACTO</span>
          <h1>Domina Dynamics 365 Finance, <span>tema a tema.</span></h1>
          <p>Un recorrido sencillo y profesional por el manejo, la arquitectura y los fundamentos del módulo de Gestión Financiera. Teoría clara, prácticas guiadas con pantallas simuladas y un test de 10 preguntas por tema.</p>
          <div className="hero-cta"><a href="#temas" className="btn primary">Empezar el curso →</a><span className="hero-meta">6 temas · 60 preguntas · Sin registro</span></div>
          <div className="level-box">
            <div className="level-head"><span>Nivel actual: <b>{cur.name}</b></span><span>{next? `${next.min-state.xp} XP para ${next.name}` : '¡Nivel máximo!'}</span></div>
            <div className="bar"><div style={{width: next? `${Math.min(100, ((state.xp-cur.min)/(next.min-cur.min))*100)}%` : '100%'}} /></div>
          </div>
        </div>
        <div className="hero-card">
          <div className="ring" style={{'--p':progress}}><span>{progress}%</span></div>
          <h3>Tu progreso global</h3>
          <div className="hero-nums"><div><b>{contentCount}/6</b><small>teorías completadas</small></div><div><b>{passedCount}/6</b><small>tests aprobados</small></div><div><b>{badges.filter(b=>b.got).length}/6</b><small>insignias</small></div></div>
          {passedCount===6 && <div className="grad-banner">🎓 ¡Graduado D365 Finance! Has aprobado los 6 temas.</div>}
        </div>
      </section>

      <section className="badges-sec"><h2>🏆 Tus insignias</h2><div className="badges">{badges.map(b=><div key={b.id} className={`badge ${b.got?'got':''}`}><span>{b.icon}</span><b>{b.name}</b><small>{b.desc}</small><em>{b.got?'Desbloqueada ✓':'Bloqueada'}</em></div>)}</div></section>

      <section id="temas"><div className="sec-head"><h2>Los 6 temas del curso</h2><p>Todos accesibles desde el primer día. Recomendado: en orden. +50 XP por completar teoría y práctica · +100 XP por aprobar · +50 XP extra si sacas un 10/10.</p></div>
        <div className="grid">{topics.map(t=>{ const q=state.quiz[t.id]; const done=state.contentDone[t.id]; return <article key={t.id} className="topic-card">
          <div className="tc-top"><span className="tc-icon">{t.icon}</span><span className="tc-tag">{t.tag}</span></div>
          <h3>{t.id}. {t.title}</h3><p className="tc-sub">{t.subtitle}</p><p className="tc-intro">{t.intro.slice(0,130)}…</p>
          <div className="tc-meta"><span>⏱ {t.duration}</span><span>❓ 10 preguntas</span>{q?.passed && <span className="ok">✓ Aprobado {q.score}/10</span>}{done && !q?.passed && <span className="mid">Teoría ✓</span>}</div>
          <button className="btn primary full" onClick={()=>setView({name:'topic', id:t.id, tab:'teoria'})}>{q?.passed?'Repasar tema': done?'Ir al test':'Empezar tema'} →</button>
        </article>})}</div>
      </section>

      <section className="how"><h2>¿Cómo funciona?</h2><div className="how-grid"><div><b>1 · Aprende</b><p>Lee la teoría en bloques cortos, con la idea clave de cada concepto.</p></div><div><b>2 · Practica</b><p>Sigue el ejemplo paso a paso y observa la pantalla simulada de D365.</p></div><div><b>3 · Supera el test</b><p>10 preguntas con corrección instantánea y explicación en cada fallo. Apruebas con 7/10.</p></div><div><b>4 · Gana XP</b><p>Sube de nivel, desbloquea insignias y mantén tu racha diaria.</p></div></div></section>
    </>}

    {view.name==='topic' && <Topic topic={topics.find(t=>t.id===view.id)} tab={view.tab||'teoria'} setTab={(tab)=>setView({name:'topic', id:view.id, tab})} state={state} setState={setState} award={award} goHome={()=>setView({name:'home'})} />}

    <footer><span>© 2026 D365 Finance Academy · Contenido formativo — no es documentación oficial de Microsoft. Las pantallas son simulaciones educativas.</span><span>Autor: <b>Jon Peciña</b> · <a href="mailto:jpecina@gmail.com">jpecina@gmail.com</a></span><button className="reset" onClick={reset}>Reiniciar progreso</button></footer>
  </div>
}

function Topic({topic, tab, setTab, state, setState, award, goHome}){
  const done = state.contentDone[topic.id]
  function completeContent(){ setState(s=>({...s, contentDone:{...s.contentDone,[topic.id]:true}})); award(`content-${topic.id}`,50); setTab('test') ; window.scrollTo({top:0,behavior:'smooth'}) }
  return <main className="topic-view">
    <button className="back" onClick={goHome}>← Volver al dashboard</button>
    <div className="topic-hero"><span className="tc-icon big">{topic.icon}</span><div><span className="eyebrow">TEMA {topic.id} DE 6 · {topic.tag} · ⏱ {topic.duration}</span><h1>{topic.title}</h1><p>{topic.subtitle} — {topic.intro}</p></div></div>
    <nav className="tabs">
      <button className={tab==='teoria'?'active':''} onClick={()=>setTab('teoria')}>📘 Teoría</button>
      <button className={tab==='practica'?'active':''} onClick={()=>setTab('practica')}>🛠 Práctica {done?'✓':''}</button>
      <button className={tab==='test'?'active':''} onClick={()=>setTab('test')}>🎯 Test final {state.quiz[topic.id]?.passed?'✓ Aprobado':''}</button>
    </nav>

    {tab==='teoria' && <div className="theory">{topic.theory.map((b,i)=><article key={i} className="theory-block"><h2>{b.title}</h2>{b.body.map((p,j)=><p key={j}>{p}</p>)}<div className="concepts">{b.concepts.map(c=><span key={c}>{c}</span>)}</div><div className="key-idea">💡 <b>Idea clave:</b> {b.key}</div></article>)}
      <button className="btn primary large" onClick={()=>setTab('practica')}>Continuar a la práctica →</button></div>}

    {tab==='practica' && <div className="practice">
      <h2>{topic.practice.title}</h2><p className="lead">{topic.practice.intro}</p>
      <MockD365 mock={topic.mock} />
      <ol className="steps">{topic.practice.steps.map((s,i)=><li key={i}><span>{i+1}</span><p>{s}</p></li>)}</ol>
      <div className="tips"><h3>Consejos de experto</h3>{topic.practice.tips.map(t=><p key={t}>✓ {t}</p>)}</div>
      {!done ? <button className="btn gold large" onClick={completeContent}>✓ Marcar teoría + práctica como completadas (+50 XP) e ir al test</button> : <button className="btn primary large" onClick={()=>setTab('test')}>Ir al test final →</button>}
    </div>}

    {tab==='test' && <Quiz topic={topic} state={state} setState={setState} award={award} goHome={goHome} />}
  </main>
}

function Quiz({topic, state, setState, award, goHome}){
  const prev = state.quiz[topic.id]
  const [answers,setAnswers]=useState({})
  const [result,setResult]=useState(null)
  const answered = Object.keys(answers).length
  function submit(){
    let score=0; topic.quiz.forEach((q,i)=>{ if(answers[i]===q.correct) score++ })
    const passed = score>=7
    const r={score, passed, date:todayStr()}
    setResult(r)
    setState(s=>({...s, quiz:{...s.quiz,[topic.id]:{...(s.quiz[topic.id]||{}), score:Math.max(score, s.quiz[topic.id]?.score||0), passed: passed || s.quiz[topic.id]?.passed, attempts:(s.quiz[topic.id]?.attempts||0)+1}}}))
    if(passed) award(`pass-${topic.id}`,100)
    if(score===10) award(`perfect-${topic.id}`,50)
    window.scrollTo({top:0,behavior:'smooth'})
  }
  if(result) {
    const passed=result.passed
    return <div className="quiz-result">
      {passed && <div className="confetti" aria-hidden="true">{Array.from({length:28}).map((_,i)=><i key={i} style={{left:`${(i*37)%100}%`, animationDelay:`${(i%7)*0.15}s`, background:['#0078D4','#F2C94C','#0B1F3A','#2ecc71'][i%4]}} />)}</div>}
      <div className={`result-banner ${passed?'pass':'fail'}`}><span>{passed?'🎉':'💪'}</span><h2>{passed?'¡Tema aprobado!':'Todavía no — ¡a repasar!'}</h2><p>Tu nota: <b>{result.score}/10</b> ({result.score*10}%) · Aciertos: {result.score} · Fallos: {10-result.score} · {passed?'+100 XP'+(result.score===10?' + 50 XP por perfección 💎':''):'Necesitas 7/10 para aprobar'}</p></div>
      <h3>Revisión completa — pregunta a pregunta</h3>
      {topic.quiz.map((q,i)=>{ const ok=answers[i]===q.correct; return <div key={i} className={`review ${ok?'ok':'bad'}`}><p><b>{i+1}. {q.q}</b> <span>{ok?'✓ Correcta':'✗ Incorrecta'}</span></p><p>Tu respuesta: {answers[i]!==undefined? q.options[answers[i]] : '— sin responder —'}</p>{!ok && <p><b>Respuesta correcta:</b> {q.options[q.correct]}</p>}<p className="expl">💬 {q.explanation}</p></div>})}
      <div className="result-actions"><button className="btn primary" onClick={()=>{setResult(null); setAnswers({})}}>↻ Repetir el test</button><button className="btn ghost" onClick={goHome}>Volver al dashboard</button></div>
    </div>
  }
  return <div className="quiz">
    <div className="quiz-head"><h2>Test final — Tema {topic.id}</h2><p>10 preguntas · 4 opciones · Corrección <b>instantánea</b> al enviar, con explicación en cada pregunta. Apruebas con <b>7/10</b>.</p>{prev?.passed && <p className="ok">✓ Ya aprobaste este test con {prev.score}/10 ({prev.attempts} intento{prev.attempts>1?'s':''}). Puedes repetirlo para mejorar.</p>}<div className="bar slim"><div style={{width:`${answered*10}%`}} /></div><small>{answered}/10 respondidas</small></div>
    {topic.quiz.map((q,i)=><fieldset key={i} className="question"><legend>{i+1}. {q.q}</legend>{q.options.map((o,j)=><label key={j} className={`option ${answers[i]===j?'sel':''}`}><input type="radio" name={`q${topic.id}-${i}`} checked={answers[i]===j} onChange={()=>setAnswers(a=>({...a,[i]:j}))} />{o}</label>)}</fieldset>)}
    <button className="btn gold large" disabled={answered<10} onClick={submit}>{answered<10?`Responde las 10 preguntas (${answered}/10)`:'Enviar y ver mi corrección instantánea →'}</button>
  </div>
}
