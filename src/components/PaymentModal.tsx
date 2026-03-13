import { useState } from "react";
import type { PaymentMethod, PaymentModalProps } from "../types";
import Icon from "./Icon";
import { PAYMENT_METHODS } from "../constants/common";

export default function PaymentModal({
  isOpen,
  total,
  onConfirm,
  onClose,
}: PaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(
    PAYMENT_METHODS.CASH,
  );

  if (!isOpen) return null;

  const methods: { id: PaymentMethod; label: string; emoji: string }[] = [
    { id: PAYMENT_METHODS.CASH, label: "Nakit", emoji: "💵" },
    { id: PAYMENT_METHODS.CARD, label: "Kart", emoji: "💳" },
    { id: PAYMENT_METHODS.QR, label: "QR / Havale", emoji: "📱" },
  ];

  return (
    <div className="modal show d-block modal-backdrop-custom" onClick={onClose}>
      <div
        className="modal-dialog modal-dialog-centered"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content rounded-4 border-0 shadow-lg p-2">
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-bold">Ödeme Al</h5>
            <button className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body">
            <div className="modal-amount text-center p-3 mb-4">
              <div className="modal-amount-label mb-1">Ödenecek Tutar</div>
              <div className="modal-amount-value fw-bold">
                ₺{total.toLocaleString("tr-TR", { minimumFractionDigits: 2 })}
              </div>
            </div>

            <div className="d-flex gap-2 mb-4">
              {methods.map((method) => (
                <button
                  key={method.id}
                  className={`btn flex-fill d-flex flex-column align-items-center gap-2 py-3 rounded-3 pm-btn ${selectedMethod === method.id ? "selected" : "btn-outline-secondary"}`}
                  onClick={() => setSelectedMethod(method.id)}
                >
                  <span className="fs-24">{method.emoji}</span>
                  <span className="small fw-semibold">{method.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="modal-footer border-0 pt-0 gap-2">
            <button
              className="btn btn-outline-secondary flex-fill rounded-3"
              onClick={onClose}
            >
              İptal
            </button>
            <button
              className="btn btn-green text-white fw-bold d-flex align-items-center justify-content-center gap-2 rounded-3 flex-2"
              onClick={onConfirm}
            >
              <Icon name="check" size={15} strokeWidth={2.5} />
              Ödemeyi Onayla
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
