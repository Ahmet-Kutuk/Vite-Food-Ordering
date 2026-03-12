import { useEffect, useState } from "react";
import Icon from "./Icon";

export default function Topbar() {
  const [clock, setClock] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      setClock(`${h}:${m}`);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <nav className="topbar d-flex align-items-center justify-content-between px-3 h-52 flex-shrink-0">
      {" "}
      <div className="d-flex align-items-center gap-2">
        {" "}
        <button className="tb-btn d-flex align-items-center gap-2 rounded-2 px-3 py-2">
          {" "}
          <Icon name="orders" size={14} />{" "}
          <span className="small fw-medium">Siparişler</span>{" "}
          <span className="badge rounded-pill bg-success fs-10">3</span>{" "}
        </button>{" "}
        <button className="tb-btn d-flex align-items-center gap-2 rounded-2 px-3 py-2">
          {" "}
          <Icon name="check" size={14} />{" "}
          <span className="badge rounded-pill bg-success fs-10">2</span>{" "}
        </button>{" "}
        <button className="tb-btn d-flex align-items-center gap-2 rounded-2 px-3 py-2">
          {" "}
          <Icon name="close" size={14} />{" "}
          <span className="badge rounded-pill fs-10 btn-back">1</span>{" "}
        </button>{" "}
        <button className="tb-btn active d-flex align-items-center gap-2 rounded-2 px-3 py-2">
          {" "}
          <Icon name="lightning" size={14} />{" "}
          <span className="small fw-semibold">Hızlı Satış — KASA</span>{" "}
        </button>{" "}
      </div>{" "}
      <div className="d-flex align-items-center gap-2">
        {" "}
        <span className="text-white small fw-medium">{clock}</span>{" "}
        <button className="tb-btn d-flex align-items-center rounded-2 px-2 py-2">
          {" "}
          <Icon name="refresh" size={14} />{" "}
        </button>{" "}
        <div className="dropdown">
          {" "}
          <div
            className="user-chip d-flex align-items-center gap-2 rounded-pill px-3 py-1 cursor-pointer"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {" "}
            <div className="user-avatar rounded-circle d-flex align-items-center justify-content-center text-white fw-bold">
              {" "}
              AK{" "}
            </div>{" "}
            <span className="small fw-medium text-alt-muted">
              Ahmet Kütük
            </span>{" "}
            <Icon name="chevronDown" size={12} color="#d1d5db" />{" "}
          </div>{" "}
          <ul className="dropdown-menu dropdown-menu-end shadow border-0 rounded-3 mt-1 py-1 mw-200">
            {" "}
            <li>
              {" "}
              <div className="px-3 py-2 border-bottom mb-1">
                {" "}
                <div className="fw-semibold small">Ahmet Kütük</div>{" "}
                <div className="text-muted fs-11">
                  ahmetkütük@restoran.com
                </div>{" "}
              </div>{" "}
            </li>{" "}
            <li>
              {" "}
              <a
                className="dropdown-item d-flex align-items-center gap-2 py-2"
                href="#"
              >
                {" "}
                <Icon name="user" size={14} /> Profil Bilgileri{" "}
              </a>{" "}
            </li>{" "}
            <li>
              {" "}
              <a
                className="dropdown-item d-flex align-items-center gap-2 py-2"
                href="#"
              >
                {" "}
                <Icon name="package" size={14} /> Mevcut Paketlerim{" "}
              </a>{" "}
            </li>{" "}
            <li>
              {" "}
              <a
                className="dropdown-item d-flex align-items-center gap-2 py-2"
                href="#"
              >
                {" "}
                <Icon name="service" size={14} /> Garson Moduna Geç{" "}
              </a>{" "}
            </li>{" "}
            <li>
              {" "}
              <a
                className="dropdown-item d-flex align-items-center gap-2 py-2"
                href="#"
                onClick={toggleFullscreen}
              >
                {" "}
                <Icon
                  name={isFullscreen ? "fullscreenExit" : "fullscreen"}
                  size={14}
                />{" "}
                {isFullscreen ? "Tam Ekrandan Çık" : "Tam Ekran"}{" "}
              </a>{" "}
            </li>{" "}
            <li>
              {" "}
              <hr className="dropdown-divider my-1" />{" "}
            </li>{" "}
            <li>
              {" "}
              <a
                className="dropdown-item d-flex align-items-center gap-2 py-2 text-danger"
                href="#"
              >
                {" "}
                <Icon name="transfer" size={14} color="currentColor" /> Çıkış
                Yap{" "}
              </a>{" "}
            </li>{" "}
          </ul>{" "}
        </div>{" "}
      </div>{" "}
    </nav>
  );
}
