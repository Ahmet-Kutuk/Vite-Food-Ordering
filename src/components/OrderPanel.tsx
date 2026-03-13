import { useState } from "react";
import type { OrderPanelProps } from "../types";
import Icon from "./Icon";
import { SERVICE_MODES } from "../constants/common";

export default function OrderPanel({
  orderItems,
  total,
  onAdd,
  onRemove,
  onClear,
  onPaymentOpen,
}: OrderPanelProps) {
  const [serviceMode, setServiceMode] = useState<
    typeof SERVICE_MODES.DINE_IN | typeof SERVICE_MODES.TAKEAWAY
  >(SERVICE_MODES.DINE_IN);

  const toggleServiceMode = () => {
    setServiceMode((prev) =>
      prev === SERVICE_MODES.DINE_IN
        ? SERVICE_MODES.TAKEAWAY
        : SERVICE_MODES.DINE_IN,
    );
  };

  return (
    <div className="order-panel d-flex flex-column">
      <div className="d-flex align-items-center gap-2 p-2 border-bottom flex-shrink-0">
        <button
          onClick={toggleServiceMode}
          className="btn btn-sm d-flex align-items-center gap-2 text-white fw-semibold px-3 rounded-2 btn-orange text-nowrap"
        >
          <Icon name="service" size={13} />
          {serviceMode === "dine-in" ? "Servis" : "Paket"}
        </button>

        {(
          [
            { title: "Kaydet", icon: "save" },
            { title: "Masaya Taşı", icon: "transfer" },
            { title: "Yazdır", icon: "print" },
          ] as const
        ).map((btn) => (
          <button
            key={btn.title}
            title={btn.title}
            className="btn btn-sm icon-action-btn d-flex align-items-center justify-content-center"
          >
            <Icon name={btn.icon} size={15} />
          </button>
        ))}

        <button
          title="Temizle"
          className="btn btn-sm icon-action-btn danger d-flex align-items-center justify-content-center"
          onClick={onClear}
        >
          <Icon name="trash" size={15} />
        </button>
      </div>

      <div className="order-items p-2">
        {orderItems.length === 0 ? (
          <div className="empty-order d-flex flex-column align-items-center justify-content-center h-100 gap-2 text-center">
            <div className="empty-icon rounded-3 d-flex align-items-center justify-content-center mb-1">
              🛒
            </div>
            <div className="fw-semibold small text-gray-dark">Sipariş boş</div>
            <div className="text-muted fs-11">Soldan ürün seçerek başlayın</div>
          </div>
        ) : (
          orderItems.map((item) => (
            <div
              key={item.menuItem.id}
              className="order-item order-item-card d-flex align-items-center gap-2 p-2 rounded-3 border mb-2"
            >
              <span className="fs-18">{item.menuItem.emoji}</span>
              <div className="flex-grow-1 overflow-hidden">
                <div className="fw-semibold small text-truncate">
                  {item.menuItem.name}
                </div>
                <div className="oi-unit">
                  ₺
                  {item.menuItem.price.toLocaleString("tr-TR", {
                    minimumFractionDigits: 2,
                  })}{" "}
                  × {item.quantity} = ₺
                  {(item.menuItem.price * item.quantity).toLocaleString(
                    "tr-TR",
                    { minimumFractionDigits: 2 },
                  )}
                </div>
              </div>
              <div className="d-flex align-items-center gap-2 flex-shrink-0">
                <button
                  className="btn btn-sm icon-action-btn d-flex align-items-center justify-content-center qty-btn icon-btn fs-14"
                  onClick={() => onRemove(item.menuItem.id)}
                >
                  −
                </button>
                <span className="fw-bold small minw-16 text-center">
                  {item.quantity}
                </span>
                <button
                  className="btn btn-sm icon-action-btn d-flex align-items-center justify-content-center qty-btn icon-btn fs-14"
                  onClick={() => onAdd(item.menuItem)}
                >
                  +
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-3 border-top mt-auto flex-shrink-0">
        <div className="d-flex justify-content-between align-items-center p-3 rounded-3 mb-3 bg-light">
          <span className="small text-muted fw-semibold text-uppercase ls-05">
            Toplam Tutar
          </span>
          <span className="fw-bold fs-5">
            ₺{total.toLocaleString("tr-TR", { minimumFractionDigits: 2 })}
          </span>
        </div>
        <div className="d-flex flex-column gap-2">
          <button
            className="btn w-100 fw-bold text-white pay-btn-primary"
            disabled={orderItems.length === 0}
            onClick={onPaymentOpen}
          >
            Ödeme Al
          </button>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-secondary btn-sm flex-fill secondary-action-btn">
              Borçlu Kaydet
            </button>
            <button className="btn btn-outline-secondary btn-sm flex-fill secondary-action-btn">
              Masaya Taşı
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
