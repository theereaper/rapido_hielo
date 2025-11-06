import { useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useSideBarHandlers = (items) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Memoriza el mapeo de hijos a padres
  const childParentMapping = useMemo(() => {
    const mapping = {};
    items.forEach((parent) => {
      parent.children?.forEach((child) => {
        mapping[child.key] = parent.key;
      });
    });
    return mapping;
  }, [items]);

  // Obtiene las claves abiertas por defecto
  const defaultOpenKeys = useMemo(
    () => (location.pathname ? [childParentMapping[location.pathname]] : []),
    [location.pathname, childParentMapping]
  );

  // Maneja la navegación del menú
  const handleMenuClick = useCallback(
    (e) => {
      navigate(e.key);
    },
    [navigate]
  );

  // Maneja la navegación y cierra el menú si es necesario
  const handleClickAndClose = (e) => {
    handleMenuClick(e);
  };

  return { defaultOpenKeys, handleClickAndClose };
};
