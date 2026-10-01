import { useState } from 'react';

export const Asistentes = () => {
  const [mensaje, setMensaje] = useState('');

  const handleConsulta = (e) => {
    e.preventDefault();
    alert(`Gracias por tu consulta. Nuestro asistente virtual te responderá pronto.`);
    setMensaje('');
  };

  return (
    <section style={{ padding: '20px', background: '#111', color: '#fff', borderRadius: '8px' }}>
      <h2>Asistente Virtual BDC TECH</h2>
      <p>¿Tenés dudas sobre algún producto o envío? Escribinos.</p>

      <form onSubmit={handleConsulta}>
        <textarea
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Escribí tu consulta aquí..."
          required
          rows={3}
          style={{ width: '100%', padding: '10px', background: '#222', color: '#fff', border: '1px solid #444', borderRadius: '4px' }}
        />
        <button type="submit" style={{ padding: '10px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}>
          Enviar Consulta
        </button>
      </form>
    </section>
  );
};

export default Asistentes;