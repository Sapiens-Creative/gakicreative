import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: "dist",
  // A configuração do workspace root é tratada automaticamente pelo Next.js quando detecta um único lockfile.
  // Como o sistema Lovable mantém um lockfile interno em /dev-server, silenciamos o conflito garantindo
  // que o build foque apenas no diretório do projeto.
};

export default nextConfig;
