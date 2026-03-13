import { useState } from "react";
import type { MenuItem, AddProductModalProps } from "../types";
import Icon from "./Icon";
import EmojiPicker from "./EmojiPicker";
import { CATEGORIES } from "../constants/common";

export default function AddProductModal({
  isOpen,
  onClose,
  onAdd,
  onEdit,
  editItem,
}: AddProductModalProps) {
  const [name, setName] = useState(editItem?.name ?? "");
  const [price, setPrice] = useState(editItem?.price?.toString() ?? "");
  const [category, setCategory] = useState(editItem?.category ?? CATEGORIES[0]);
  const [emoji, setEmoji] = useState(editItem?.emoji ?? "🍽️");
  const [error, setError] = useState("");

  const isEditing = !!editItem;

  const resetForm = () => {
    setName("");
    setPrice("");
    setCategory(CATEGORIES[0]);
    setEmoji("🍽️");
    setError("");
  };

  if (!isOpen) return null;

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      setError("Ürün adı boş olamaz");
      return;
    }
    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      setError("Geçerli bir fiyat girin");
      return;
    }

    const item: MenuItem = {
      id: editItem ? editItem.id : Date.now().toString(),
      name: name.trim(),
      price: Number(price),
      category,
      emoji,
    };

    if (isEditing) onEdit(item);
    else onAdd(item);

    resetForm();
    onClose();
  };

  return (
    <div
      className="modal show d-block modal-backdrop-custom"
      onClick={handleClose}
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content rounded-4 border-0 shadow-lg p-2">
          <div className="modal-header border-0 pb-0">
            <div>
              <h5 className="modal-title fw-bold mb-1">
                {isEditing ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}
              </h5>
              <p className="text-muted small mb-0">
                {isEditing
                  ? `"${editItem?.name}" ürününü düzenliyorsunuz`
                  : "Menüye yeni bir ürün ekleyin"}
              </p>
            </div>
            <button className="btn-close" onClick={handleClose} />
          </div>

          <div className="modal-body">
            <EmojiPicker selected={emoji} onChange={setEmoji} />

            <div className="mb-3">
              <label className="form-label fw-semibold small text-uppercase text-muted ls-05">
                Ürün Adı
              </label>
              <input
                type="text"
                className="form-control rounded-3"
                placeholder="örn. Izgara Köfte"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError("");
                }}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold small text-uppercase text-muted ls-05">
                Fiyat (₺)
              </label>
              <div className="input-group">
                <span className="input-group-text">₺</span>
                <input
                  type="number"
                  className="form-control rounded-end-3"
                  placeholder="örn. 150"
                  min="0"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                    setError("");
                  }}
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold small text-uppercase text-muted ls-05">
                Kategori
              </label>
              <div className="d-flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    className={`btn btn-sm rounded-pill cat-select-btn ${category === cat ? "selected" : "btn-outline-secondary"}`}
                    onClick={() => setCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="alert alert-danger py-2 small d-flex align-items-center gap-2">
                <Icon name="warning" size={14} />
                {error}
              </div>
            )}
          </div>

          <div className="modal-footer border-0 pt-0 gap-2">
            <button
              className="btn btn-outline-secondary flex-fill rounded-3"
              onClick={handleClose}
            >
              İptal
            </button>
            <button
              className="btn btn-green text-white fw-bold d-flex align-items-center justify-content-center gap-2 rounded-3 flex-2"
              onClick={handleSubmit}
            >
              <Icon
                name={isEditing ? "check" : "plus"}
                size={15}
                strokeWidth={2.5}
              />
              {isEditing ? "Değişiklikleri Kaydet" : "Ürün Ekle"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
