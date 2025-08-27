import React from 'react';

interface Props {
  children: React.ReactNode;
}

const RootLayout = (props: Props) => {
  const { children } = props;
  return (
    <html lang="es">
      <head>
        <title>Presas de Canarias - Información Completa</title>
        <meta name="description" content="Información completa sobre las presas de Canarias. Datos actualizados de capacidad, altura y ubicación de todas las presas de Gran Canaria." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🏝️</text></svg>" />
      </head>
      <body style={{
        margin: 0,
        padding: 0,
        backgroundColor: '#f5f7fa',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif'
      }}>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
