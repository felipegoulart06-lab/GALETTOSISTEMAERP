"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    const firstConfirmation = window.confirm("Deseja sair da conta agora?");

    if (!firstConfirmation) {
      return;
    }

    const secondConfirmation = window.confirm("Tem certeza mesmo que deseja sair da plataforma?");

    if (!secondConfirmation) {
      return;
    }

    router.push("/login");
  };

  return (
    <button type="button" className="logout-button" onClick={handleLogout}>
      Sair da conta
    </button>
  );
}
