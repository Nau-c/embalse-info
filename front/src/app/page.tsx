"use client";

import { useState, useEffect } from 'react';
import ClaudeChat from '../components/ClaudeChat';

interface PresaData {
  nombre: string;
  isla: string;
  cuenca: string;
  barranco: string;
  cotaMuro: number;
  altura: number;
  capacidad: number;
  volumenMaximo: number;
  fuente: string;
}

const RootPage = () => {
  const [presas, setPresas] = useState<PresaData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadPresasData = async () => {
      try {
        const response = await fetch('/presas_canarias.csv');
        const csvText = await response.text();
        
        const lines = csvText.split('\n');
        const headers = lines[0].split(',');
        
        const data = lines.slice(1).map(line => {
          const values = line.split(',');
          return {
            nombre: values[0] || '',
            isla: values[1] || '',
            cuenca: values[2] || '',
            barranco: values[3] || '',
            cotaMuro: parseFloat(values[4]) || 0,
            altura: parseFloat(values[5]) || 0,
            capacidad: parseFloat(values[6]) || 0,
            volumenMaximo: parseFloat(values[7]) || 0,
            fuente: values[10] || ''
          };
        }).filter(presa => presa.nombre);
        
        setPresas(data);
        setLoading(false);
      } catch (error) {
        console.error('Error cargando datos de presas:', error);
        setLoading(false);
      }
    };

    loadPresasData();
  }, []);

  const filteredPresas = presas.filter(presa =>
    presa.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    presa.cuenca.toLowerCase().includes(searchTerm.toLowerCase()) ||
    presa.barranco.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCapacity = (capacity: number) => {
    if (capacity >= 1000000) {
      return `${(capacity / 1000000).toFixed(2)} hm³`;
    }
    return `${(capacity / 1000).toFixed(0)} mil m³`;
  };

  const topPresas = [...presas]
    .sort((a, b) => b.capacidad - a.capacidad)
    .slice(0, 5);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div>
          <h2>🔄 Cargando datos de presas canarias...</h2>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f5f7fa'
    }}>
      {/* Header */}
      <header style={{ 
        textAlign: 'center', 
        marginBottom: '40px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '40px 20px',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ 
          fontSize: '3rem', 
          margin: '0 0 10px 0',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}>
          🏝️ Presas de Canarias
        </h1>
        <p style={{ 
          fontSize: '1.2rem', 
          margin: 0,
          opacity: 0.9
        }}>
          Información completa sobre las {presas.length} presas de Gran Canaria
        </p>
      </header>

      {/* Stats Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#4a90e2', margin: '0 0 10px 0' }}>Total Presas</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#333' }}>
            {presas.length}
          </p>
        </div>
        
        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#50e3c2', margin: '0 0 10px 0' }}>Capacidad Total</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#333' }}>
            {formatCapacity(presas.reduce((sum, presa) => sum + presa.capacidad, 0))}
          </p>
        </div>
        
        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#f5a623', margin: '0 0 10px 0' }}>Altura Promedio</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#333' }}>
            {Math.round(presas.reduce((sum, presa) => sum + presa.altura, 0) / presas.length)} m
          </p>
        </div>
      </div>

      {/* Top 5 Presas */}
      <div style={{ 
        background: 'white', 
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
        marginBottom: '40px'
      }}>
        <h2 style={{ color: '#333', marginBottom: '20px' }}>🏆 Top 5 Presas por Capacidad</h2>
        <div style={{ display: 'grid', gap: '15px' }}>
          {topPresas.map((presa, index) => (
            <div key={presa.nombre} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '15px',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              borderLeft: `4px solid ${['#FFD700', '#C0C0C0', '#CD7F32', '#4a90e2', '#50e3c2'][index]}`
            }}>
              <div>
                <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                  {index + 1}. {presa.nombre}
                </span>
                <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '5px' }}>
                  {presa.cuenca} - {presa.barranco}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#333' }}>
                  {formatCapacity(presa.capacidad)}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                  {presa.altura}m altura
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search */}
      <div style={{ marginBottom: '30px' }}>
        <input
          type="text"
          placeholder="🔍 Buscar por nombre, cuenca o barranco..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '15px',
            fontSize: '1rem',
            border: '2px solid #e1e5e9',
            borderRadius: '8px',
            outline: 'none',
            transition: 'border-color 0.3s ease'
          }}
          onFocus={(e) => e.target.style.borderColor = '#4a90e2'}
          onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
        />
      </div>

      {/* Presas Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '20px'
      }}>
        {filteredPresas.map((presa) => (
          <div key={presa.nombre} style={{
            background: 'white',
            padding: '25px',
            borderRadius: '12px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
          }}>
            <h3 style={{ 
              color: '#333', 
              margin: '0 0 15px 0',
              fontSize: '1.3rem'
            }}>
              💧 {presa.nombre}
            </h3>
            
            <div style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#666' }}>🌊 Capacidad:</span>
                <span style={{ fontWeight: 'bold', color: '#4a90e2' }}>
                  {formatCapacity(presa.capacidad)}
                </span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#666' }}>📏 Altura:</span>
                <span style={{ fontWeight: 'bold' }}>{presa.altura} m</span>
              </div>
              
              {presa.cuenca && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#666' }}>🗺️ Cuenca:</span>
                  <span>{presa.cuenca}</span>
                </div>
              )}
              
              {presa.barranco && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#666' }}>🏔️ Barranco:</span>
                  <span>{presa.barranco}</span>
                </div>
              )}
              
              {presa.cotaMuro > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#666' }}>📍 Cota Muro:</span>
                  <span>{presa.cotaMuro} m</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer style={{ 
        textAlign: 'center', 
        marginTop: '60px',
        padding: '30px',
        backgroundColor: '#333',
        color: 'white',
        borderRadius: '12px'
      }}>
        <p style={{ margin: '0 0 10px 0' }}>
          📊 Datos extraídos del <a 
            href="https://www.aguasgrancanaria.com/presas/ubicacion_presas.php" 
            target="_blank"
            style={{ color: '#4a90e2', textDecoration: 'none' }}
          >
            Consejo Insular de Aguas de Gran Canaria
          </a>
        </p>
        <p style={{ margin: 0, opacity: 0.7, fontSize: '0.9rem' }}>
          Proyecto desarrollado con ❤️ para la gestión y visualización de presas canarias
        </p>
      </footer>

      {/* Claude Chat Component */}
      <ClaudeChat presasData={presas} />
    </div>
  );
};

export default RootPage;
