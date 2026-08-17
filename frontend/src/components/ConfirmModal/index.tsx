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
    <div className="fixed inset-0 z-[150] bg-slate-900/45 backdrop-blur-sm flex items-center justify-center p-5" role="presentation" onClick={onCancel}>
      <div
        className="w-full max-w-[440px] rounded-[20px] border border-[rgba(82,143,191,0.15)] bg-white shadow-[0_24px_60px_rgba(15,23,42,0.16)] p-[32px_28px] text-center flex flex-col items-center"
        role="dialog"
        aria-modal="true"
        aria-labelledby="remove-item-title"
        onClick={(event) => event.stopPropagation()}
      >
        <span className="w-14 h-14 rounded-full bg-red-100 text-[#ef4444] text-[1.6rem] font-extrabold grid place-items-center mb-[18px]" aria-hidden="true">
          !
        </span>
        <h2 id="remove-item-title">{t("removeItemTitle")}</h2>
        <p>{t("removeItemBody")}</p>
        <div className="mt-6 grid grid-cols-2 gap-3 w-full">
          <button className="border-0 rounded-full p-3 font-bold cursor-pointer bg-[#f1f5f9] text-[#334155]" onClick={onCancel}>
            {t("keepItem")}
          </button>
          <button className="border-0 rounded-full p-3 font-bold cursor-pointer bg-[#ef4444] text-white" onClick={onConfirm}>
            {t("remove")}
          </button>
        </div>
      </div>
    </div>
  );
}
