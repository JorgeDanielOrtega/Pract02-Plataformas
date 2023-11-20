"use client";

import { clearSession, isSession } from "@/hooks/SessionUtils";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <h4> CRUD autos </h4>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse d-flex justify-content-end"
            id="navbarNavDropdown"
          >
            <ul className="navbar-nav">
              {isSession() && (
                <li className="nav-item">
                  <Link
                    href="/"
                    className="navbar-brand"
                    onClick={() => {
                      clearSession();
                      window.location.reload();
                      // router.refresh()
                      // router.push("/");
                    }}
                  >
                    Cerrar sesion
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
