import { useEffect, useState } from 'react';

const ProfilePage = () => {
  const [role, setRole] = useState(null);

  // Cargar los datos del usuario y su rol desde el localStorage o API
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);  // Guarda el rol del usuario
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Perfil de Usuario</h1>

      <div className="bg-white p-4 shadow-md rounded-md">
        <h2 className="text-xl font-semibold mb-4">Bienvenido, {localStorage.getItem("username")}</h2>

        {/* Botones basados en el rol */}
        <div className="space-y-4">
          <button className="btn">Ver detalles de perfil</button>

          {/* Mostrar estos botones si el rol es 'admin' */}
          {role === 'admin' && (
            <>
              <button className="btn">Administrar usuarios</button>
              <button className="btn">Ver métricas generales</button>
            </>
          )}

          {/* Mostrar estos botones si el rol es 'vendedor' */}
          {role === 'vendedor' && (
            <>
              <button className="btn">Ver ventas</button>
              <button className="btn">Comisiones</button>
            </>
          )}

          {/* Mostrar estos botones si el rol es 'cliente' */}
          {role === 'cliente' && (
            <>
              <button className="btn">Mis compras</button>
              <button className="btn">Cambiar contraseña</button>
            </>
          )}

          {/* Botón visible para todos */}
          <button className="btn">Cerrar sesión</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
