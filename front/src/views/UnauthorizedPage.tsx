import { Link } from "react-router-dom";
import { HOME } from "../routes/Paths";

export default function UnauthorizedPage() {
  return (
    <section className="mt-16 bg-white">
      <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6">
        <div className="max-w-screen-sm mx-auto text-center">
          <h1 className="mb-4 font-extrabold tracking-tight text-text-secondary text-7xl lg:text-9xl">
            403
          </h1>
          <p className="mb-4 text-3xl font-bold tracking-tight sora-font  md:text-4xl ">
            No autorizado
          </p>
          <p className="mb-12 text-lg text-text-secondary">
            No tienes permiso para acceder a esta página.
          </p>
          <Link
            to={HOME}
            className="px-5 py-3 text-sm font-medium text-center text-white rounded-lg bg-primary "
          >
            Ir al sitio principal
          </Link>
        </div>
      </div>
    </section>
  );
}
