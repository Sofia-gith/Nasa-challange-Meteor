import React, { useState } from "react";
import styles from "@styles/Request.module.css";
const URL_DEVELOP = "http://localhost:3000";

const DadosAsteroideApophis = () => {
  const [dadosApi, setDadosApi] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  const buscarDados = async () => {
    setCarregando(true);
    setErro(null);

    try {
      const res = await fetch(`/api/apophis-data`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error(`Erro na requisição: ${res.status}`);

      const data = await res.json();
      setDadosApi(data);
    } catch (error) {
      setErro(error.message || "Erro ao buscar os dados do asteroide.");
    } finally {
      setCarregando(false);
    }
  };

  if (carregando) return <p className="center">Carregando dados...</p>;

  if (erro) return <p className="center">Erro: {erro}</p>;

  if (!dadosApi) {
    return (
      <div className={styles.example} onClick={buscarDados}>
        Request to GET /apophis-data
      </div>
    );
  }

  return (
    <div className="center">
      <h2>Dados do Asteroide Apophis</h2>
      <p>Massa: {dadosApi.mass_kg} kg</p>
      <p>Velocidade: {dadosApi.velocity_km_s} km/s</p>
      <p>Posição X: {dadosApi.position_km.x} km</p>
      <p>Posição Y: {dadosApi.position_km.y} km</p>
      <p>Posição Z: {dadosApi.position_km.z} km</p>
    </div>
  );
};

export default DadosAsteroideApophis;
