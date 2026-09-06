import { F_MARK_PATH, F_MARK_VIEWBOX } from "./f-mark";

export function FMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox={F_MARK_VIEWBOX}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d={F_MARK_PATH} fill="currentColor" />
    </svg>
  );
}

export default FMark;
