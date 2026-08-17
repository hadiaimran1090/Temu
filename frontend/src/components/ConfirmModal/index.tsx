import { useTranslation } from "../../hooks/useTranslation";

export function ConfirmModal({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const { t } = useTranslation();

  return (
    <div className="modal-backdrop" role="presentation" onClick={onCancel}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="remove-item-title"
        onClick={(event) => event.stopPropagation()}
      >
        <span className="modal-icon" aria-hidden="true">
          !
        </span>
        <h2 id="remove-item-title">{t("removeItemTitle")}</h2>
        <p>{t("removeItemBody")}</p>
        <div className="modal-actions">
          <button className="modal-cancel" onClick={onCancel}>
            {t("keepItem")}
          </button>
          <button className="modal-remove" onClick={onConfirm}>
            {t("remove")}
          </button>
        </div>
      </div>
    </div>
  );
}
