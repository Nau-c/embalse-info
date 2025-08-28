import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

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

export async function POST(request: NextRequest) {
  try {
    const { message, presasData } = await request.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'Claude Chat no está configurado. La aplicación funciona perfectamente sin esta funcionalidad.' },
        { status: 200 }
      );
    }

    // Crear contexto con información de las presas
    const contextoDatos = `
Información sobre las presas de Gran Canaria:

Total de presas: ${presasData.length}
Capacidad total: ${(presasData.reduce((sum: number, presa: PresaData) => sum + presa.capacidad, 0) / 1000000).toFixed(2)} hm³

Top 5 presas por capacidad:
${presasData
  .sort((a: PresaData, b: PresaData) => b.capacidad - a.capacidad)
  .slice(0, 5)
  .map((presa: PresaData, index: number) => 
    `${index + 1}. ${presa.nombre}: ${(presa.capacidad / 1000000).toFixed(2)} hm³, altura: ${presa.altura}m, cuenca: ${presa.cuenca}`
  ).join('\n')}

Datos completos de todas las presas:
${presasData.map((presa: PresaData) => 
  `• ${presa.nombre} - Cuenca: ${presa.cuenca}, Barranco: ${presa.barranco}, Capacidad: ${(presa.capacidad / 1000000).toFixed(2)} hm³, Altura: ${presa.altura}m, Cota: ${presa.cotaMuro}m`
).join('\n')}

Fuente de datos: Consejo Insular de Aguas de Gran Canaria
`;

    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: `${contextoDatos}

Pregunta del usuario: ${message}

Responde de manera conversacional y útil sobre las presas de Gran Canaria. Si la pregunta está relacionada con las presas, usa los datos proporcionados. Si no está relacionada, menciona que eres un asistente especializado en información sobre presas canarias.`
        }
      ]
    });

    return NextResponse.json({
      response: response.content[0].type === 'text' ? response.content[0].text : 'Error en la respuesta'
    });

  } catch (error) {
    console.error('Error al consultar Claude:', error);
    return NextResponse.json(
      { error: 'Error al procesar la consulta' },
      { status: 500 }
    );
  }
}
